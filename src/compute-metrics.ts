import { openDatabase } from "./db/connection";
import { createTables } from "./db/schema";

/**
 * Compute derived financial metrics for each company-quarter.
 *
 * For each consolidated company-quarter (2020+, where we have shares):
 *  1. Compute TTM (trailing twelve months) by summing last 4 quarters of flow metrics
 *  2. Find the closing price near quarter end from daily_prices
 *  3. Compute market cap, EV, valuation ratios, profitability ratios
 *  4. Compute forward 1-quarter return for backtesting
 */

async function main() {
  const db = openDatabase();
  createTables(db);

  // Work with consolidated data only, where we have shares
  const quarters = db
    .query(
      `SELECT DISTINCT cnpj, dt_fim_exerc
       FROM company_quarters
       WHERE scope = 'con' AND shares_outstanding > 0
       ORDER BY cnpj, dt_fim_exerc`
    )
    .all() as { cnpj: string; dt_fim_exerc: string }[];

  console.log(
    `Computing metrics for ${quarters.length} company-quarters...`
  );

  // Get all quarterly data indexed for TTM lookups
  const allQuarters = db
    .query(
      `SELECT cnpj, dt_fim_exerc, source_type,
              ativo_total, ativo_circulante, caixa_equivalentes,
              passivo_total, passivo_circulante, passivo_nao_circulante,
              patrimonio_liquido,
              receita_liquida, resultado_bruto, ebit, lucro_liquido,
              fluxo_caixa_operacional, shares_outstanding
       FROM company_quarters
       WHERE scope = 'con'
       ORDER BY cnpj, dt_fim_exerc`
    )
    .all() as QuarterRow[];

  // Index quarters by cnpj for fast lookup
  const byCnpj = new Map<string, QuarterRow[]>();
  for (const q of allQuarters) {
    let arr = byCnpj.get(q.cnpj);
    if (!arr) {
      arr = [];
      byCnpj.set(q.cnpj, arr);
    }
    arr.push(q);
  }

  // Detect and fix share scale issues.
  // Some CVM filings report shares in thousands, others in units.
  // We detect this by checking if market_cap / patrimonio_liquido (P/VP) is
  // unreasonably small — if so, shares are likely in thousands and need *1000.
  const shareScaleFactors = detectShareScales(db, byCnpj);

  // Find best ticker (most price data) per cnpj
  const tickerMap = new Map<string, string>();
  const tickerRows = db
    .query(
      `SELECT t.cnpj, t.ticker_yahoo, COUNT(dp.date) as cnt
       FROM tickers t
       JOIN daily_prices dp ON t.ticker_yahoo = dp.ticker_yahoo
       GROUP BY t.cnpj, t.ticker_yahoo
       ORDER BY t.cnpj, cnt DESC`
    )
    .all() as { cnpj: string; ticker_yahoo: string; cnt: number }[];

  for (const r of tickerRows) {
    if (!tickerMap.has(r.cnpj)) {
      tickerMap.set(r.cnpj, r.ticker_yahoo);
    }
  }

  // Prepare price lookup: find closing price on or before a date
  const priceStmt = db.prepare(
    `SELECT date, adjusted_close FROM daily_prices
     WHERE ticker_yahoo = ? AND date <= ? AND adjusted_close IS NOT NULL
     ORDER BY date DESC LIMIT 1`
  );

  // Prepare forward price lookup: find closing price on or after a date
  const fwdPriceStmt = db.prepare(
    `SELECT date, adjusted_close FROM daily_prices
     WHERE ticker_yahoo = ? AND date >= ? AND adjusted_close IS NOT NULL
     ORDER BY date ASC LIMIT 1`
  );

  const insertMetric = db.prepare(`
    INSERT OR REPLACE INTO company_metrics (
      cnpj, dt_fim_exerc, scope, ticker_yahoo,
      price_close, price_date, shares_outstanding, market_cap, enterprise_value,
      receita_liquida_ttm, resultado_bruto_ttm, ebit_ttm, lucro_liquido_ttm,
      fluxo_caixa_op_ttm,
      pl_ratio, pvp_ratio, ev_ebit, price_to_sales,
      roe, roa, margem_liquida, margem_bruta, margem_ebit,
      liquidez_corrente, divida_liquida_ebit,
      return_1q, return_date_start, return_date_end
    ) VALUES (
      $cnpj, $dt_fim_exerc, $scope, $ticker_yahoo,
      $price_close, $price_date, $shares_outstanding, $market_cap, $enterprise_value,
      $receita_liquida_ttm, $resultado_bruto_ttm, $ebit_ttm, $lucro_liquido_ttm,
      $fluxo_caixa_op_ttm,
      $pl_ratio, $pvp_ratio, $ev_ebit, $price_to_sales,
      $roe, $roa, $margem_liquida, $margem_bruta, $margem_ebit,
      $liquidez_corrente, $divida_liquida_ebit,
      $return_1q, $return_date_start, $return_date_end
    )
  `);

  db.exec("DELETE FROM company_metrics");

  let count = 0;

  const tx = db.transaction(() => {
    for (const { cnpj, dt_fim_exerc } of quarters) {
      const companyQuarters = byCnpj.get(cnpj);
      if (!companyQuarters) continue;

      const tickerYahoo = tickerMap.get(cnpj);
      if (!tickerYahoo) continue;

      // Find current quarter
      const idx = companyQuarters.findIndex(
        (q) => q.dt_fim_exerc === dt_fim_exerc
      );
      if (idx < 0) continue;

      const cur = companyQuarters[idx];
      if (!cur.shares_outstanding || cur.shares_outstanding <= 0) continue;

      const scaleFactor = shareScaleFactors.get(cnpj) ?? 1;
      const sharesOutstanding = cur.shares_outstanding * scaleFactor;

      // Compute TTM: sum last 4 quarters of flow metrics
      // Need to find the 4 quarters ending at dt_fim_exerc
      // DFP (annual) already has full year — use it directly if available
      // ITR (quarterly) needs summing
      const ttm = computeTTM(companyQuarters, idx);

      // Get price near quarter end
      const priceRow = priceStmt.get(tickerYahoo, dt_fim_exerc) as {
        date: string;
        adjusted_close: number;
      } | null;
      if (!priceRow) continue;

      const price = priceRow.adjusted_close;
      const priceDate = priceRow.date;

      // Market cap & EV
      const marketCap = sharesOutstanding * price;
      const netDebt =
        (cur.passivo_circulante ?? 0) +
        (cur.passivo_nao_circulante ?? 0) -
        (cur.caixa_equivalentes ?? 0);
      const ev = marketCap + netDebt;

      // Valuation ratios (only if denominators are positive/meaningful)
      const plRatio =
        ttm.lucro_liquido && ttm.lucro_liquido > 0
          ? marketCap / ttm.lucro_liquido
          : null;
      const pvpRatio =
        cur.patrimonio_liquido && cur.patrimonio_liquido > 0
          ? marketCap / cur.patrimonio_liquido
          : null;
      const evEbit =
        ttm.ebit && ttm.ebit > 0 ? ev / ttm.ebit : null;
      const priceToSales =
        ttm.receita_liquida && ttm.receita_liquida > 0
          ? marketCap / ttm.receita_liquida
          : null;

      // Profitability ratios
      const roe =
        ttm.lucro_liquido && cur.patrimonio_liquido && cur.patrimonio_liquido > 0
          ? ttm.lucro_liquido / cur.patrimonio_liquido
          : null;
      const roa =
        ttm.lucro_liquido && cur.ativo_total && cur.ativo_total > 0
          ? ttm.lucro_liquido / cur.ativo_total
          : null;
      const margemLiquida =
        ttm.lucro_liquido && ttm.receita_liquida && ttm.receita_liquida > 0
          ? ttm.lucro_liquido / ttm.receita_liquida
          : null;
      const margemBruta =
        ttm.resultado_bruto && ttm.receita_liquida && ttm.receita_liquida > 0
          ? ttm.resultado_bruto / ttm.receita_liquida
          : null;
      const margemEbit =
        ttm.ebit && ttm.receita_liquida && ttm.receita_liquida > 0
          ? ttm.ebit / ttm.receita_liquida
          : null;

      // Balance sheet ratios
      const liquidezCorrente =
        cur.ativo_circulante && cur.passivo_circulante && cur.passivo_circulante > 0
          ? cur.ativo_circulante / cur.passivo_circulante
          : null;
      const dividaLiquidaEbit =
        ttm.ebit && ttm.ebit > 0 ? netDebt / ttm.ebit : null;

      // Forward 1-quarter return
      let return1q: number | null = null;
      let returnStart: string | null = null;
      let returnEnd: string | null = null;

      // Next quarter end is ~3 months ahead
      const nextQEnd = addMonths(dt_fim_exerc, 3);
      const startPrice = fwdPriceStmt.get(tickerYahoo, dt_fim_exerc) as {
        date: string;
        adjusted_close: number;
      } | null;
      const endPrice = priceStmt.get(tickerYahoo, nextQEnd) as {
        date: string;
        adjusted_close: number;
      } | null;

      if (startPrice && endPrice && startPrice.adjusted_close > 0) {
        return1q =
          (endPrice.adjusted_close - startPrice.adjusted_close) /
          startPrice.adjusted_close;
        returnStart = startPrice.date;
        returnEnd = endPrice.date;
      }

      insertMetric.run({
        $cnpj: cnpj,
        $dt_fim_exerc: dt_fim_exerc,
        $scope: "con",
        $ticker_yahoo: tickerYahoo,
        $price_close: price,
        $price_date: priceDate,
        $shares_outstanding: sharesOutstanding,
        $market_cap: marketCap,
        $enterprise_value: ev,
        $receita_liquida_ttm: ttm.receita_liquida,
        $resultado_bruto_ttm: ttm.resultado_bruto,
        $ebit_ttm: ttm.ebit,
        $lucro_liquido_ttm: ttm.lucro_liquido,
        $fluxo_caixa_op_ttm: ttm.fluxo_caixa_operacional,
        $pl_ratio: plRatio,
        $pvp_ratio: pvpRatio,
        $ev_ebit: evEbit,
        $price_to_sales: priceToSales,
        $roe: roe,
        $roa: roa,
        $margem_liquida: margemLiquida,
        $margem_bruta: margemBruta,
        $margem_ebit: margemEbit,
        $liquidez_corrente: liquidezCorrente,
        $divida_liquida_ebit: dividaLiquidaEbit,
        $return_1q: return1q,
        $return_date_start: returnStart,
        $return_date_end: returnEnd,
      });
      count++;
    }
  });

  tx();

  console.log("\nRunning ANALYZE...");
  db.exec("ANALYZE");

  // Summary stats
  const stats = db
    .query(
      `SELECT
         COUNT(*) as total,
         COUNT(pl_ratio) as has_pl,
         COUNT(ev_ebit) as has_ev_ebit,
         COUNT(return_1q) as has_return,
         COUNT(DISTINCT cnpj) as companies,
         MIN(dt_fim_exerc) as min_date,
         MAX(dt_fim_exerc) as max_date
       FROM company_metrics`
    )
    .get() as any;

  console.log(`\nDone! ${count} metric rows computed.`);
  console.log(`  ${stats.companies} companies`);
  console.log(`  ${stats.min_date} to ${stats.max_date}`);
  console.log(`  ${stats.has_pl} with P/L, ${stats.has_ev_ebit} with EV/EBIT`);
  console.log(`  ${stats.has_return} with forward returns`);

  db.close();
}

/**
 * Detect which companies report shares in thousands vs units.
 * Strategy: for each company, compute a trial market_cap using the latest
 * quarter with both shares and patrimonio_liquido, and check if P/VP
 * is unreasonably small (< 0.01), which indicates shares are in thousands.
 */
function detectShareScales(
  db: ReturnType<typeof openDatabase>,
  byCnpj: Map<string, QuarterRow[]>
): Map<string, number> {
  const factors = new Map<string, number>();

  // Get latest price per ticker
  const tickerPrices = db
    .query(
      `SELECT t.cnpj, t.ticker_yahoo, dp.adjusted_close
       FROM tickers t
       JOIN daily_prices dp ON t.ticker_yahoo = dp.ticker_yahoo
       WHERE dp.date = (SELECT MAX(d2.date) FROM daily_prices d2 WHERE d2.ticker_yahoo = t.ticker_yahoo)
       AND dp.adjusted_close > 0`
    )
    .all() as { cnpj: string; ticker_yahoo: string; adjusted_close: number }[];

  const priceMap = new Map<string, number>();
  for (const r of tickerPrices) {
    if (!priceMap.has(r.cnpj)) priceMap.set(r.cnpj, r.adjusted_close);
  }

  for (const [cnpj, quarters] of byCnpj) {
    const price = priceMap.get(cnpj);
    if (!price) continue;

    // Find latest quarter with shares and patrimonio_liquido
    for (let i = quarters.length - 1; i >= 0; i--) {
      const q = quarters[i];
      if (
        q.shares_outstanding &&
        q.shares_outstanding > 0 &&
        q.patrimonio_liquido &&
        q.patrimonio_liquido > 0
      ) {
        const trialMktCap = q.shares_outstanding * price;
        const pvp = trialMktCap / q.patrimonio_liquido;

        // If P/VP < 0.01, shares are almost certainly in thousands
        if (pvp < 0.01) {
          factors.set(cnpj, 1000);
        } else {
          factors.set(cnpj, 1);
        }
        break;
      }
    }
  }

  const scaled = [...factors.values()].filter((f) => f > 1).length;
  console.log(
    `  Share scale: ${scaled} companies scaled by 1000x, ${factors.size - scaled} at face value`
  );

  return factors;
}

interface QuarterRow {
  cnpj: string;
  dt_fim_exerc: string;
  source_type: string;
  ativo_total: number | null;
  ativo_circulante: number | null;
  caixa_equivalentes: number | null;
  passivo_total: number | null;
  passivo_circulante: number | null;
  passivo_nao_circulante: number | null;
  patrimonio_liquido: number | null;
  receita_liquida: number | null;
  resultado_bruto: number | null;
  ebit: number | null;
  lucro_liquido: number | null;
  fluxo_caixa_operacional: number | null;
  shares_outstanding: number | null;
}

interface TTMValues {
  receita_liquida: number | null;
  resultado_bruto: number | null;
  ebit: number | null;
  lucro_liquido: number | null;
  fluxo_caixa_operacional: number | null;
}

/**
 * Compute TTM (trailing twelve months) values.
 *
 * CVM data quirk: DFP (annual) files contain full-year accumulated values.
 * ITR (quarterly) files contain YTD accumulated values (e.g., Q3 has Jan-Sep).
 *
 * Strategy: Find the 4 most recent quarter-end dates for this company,
 * then use the DFP annual value if we're at year-end, otherwise
 * use Q(current_ytd) + annual(last_year) - Q(same_quarter_last_year_ytd).
 */
function computeTTM(quarters: QuarterRow[], currentIdx: number): TTMValues {
  const cur = quarters[currentIdx];
  const curDate = cur.dt_fim_exerc;
  const curMonth = parseInt(curDate.slice(5, 7));

  // If this is a year-end (December), and it's a DFP row, use directly
  if (curMonth === 12 && cur.source_type === "dfp") {
    return {
      receita_liquida: cur.receita_liquida,
      resultado_bruto: cur.resultado_bruto,
      ebit: cur.ebit,
      lucro_liquido: cur.lucro_liquido,
      fluxo_caixa_operacional: cur.fluxo_caixa_operacional,
    };
  }

  // For mid-year quarters: TTM = current_YTD + last_annual - last_year_same_quarter_YTD
  // current_YTD is the ITR value (already accumulated)
  const lastYearEnd = `${parseInt(curDate.slice(0, 4)) - 1}-12-31`;
  const lastYearSameQ = `${parseInt(curDate.slice(0, 4)) - 1}-${curDate.slice(5)}`;

  // Find the annual (DFP) row for last year
  const annualRow = quarters.find(
    (q) => q.dt_fim_exerc === lastYearEnd && q.source_type === "dfp"
  );

  // Find last year's same quarter (ITR)
  const lastYearQRow = quarters.find(
    (q) => q.dt_fim_exerc === lastYearSameQ && q.source_type === "itr"
  );

  if (!annualRow) {
    // No prior annual data — just return current YTD as best estimate
    return {
      receita_liquida: cur.receita_liquida,
      resultado_bruto: cur.resultado_bruto,
      ebit: cur.ebit,
      lucro_liquido: cur.lucro_liquido,
      fluxo_caixa_operacional: cur.fluxo_caixa_operacional,
    };
  }

  // TTM = YTD(current) + Annual(last_year) - YTD(same_quarter_last_year)
  const fields: (keyof TTMValues)[] = [
    "receita_liquida",
    "resultado_bruto",
    "ebit",
    "lucro_liquido",
    "fluxo_caixa_operacional",
  ];

  const result: any = {};
  for (const field of fields) {
    const ytdCur = cur[field];
    const annual = annualRow[field];
    const ytdLastYear = lastYearQRow?.[field];

    if (ytdCur != null && annual != null) {
      result[field] = ytdCur + annual - (ytdLastYear ?? 0);
    } else {
      result[field] = ytdCur;
    }
  }

  return result;
}

function addMonths(dateStr: string, months: number): string {
  const d = new Date(dateStr);
  d.setMonth(d.getMonth() + months);
  return d.toISOString().slice(0, 10);
}

main().catch((err) => {
  console.error("Compute metrics failed:", err);
  process.exit(1);
});
