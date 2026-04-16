import type { Database } from "bun:sqlite";
import { addMonths } from "../lib/dates";

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

const TTM_FIELDS = [
  "receita_liquida",
  "resultado_bruto",
  "ebit",
  "lucro_liquido",
  "fluxo_caixa_operacional",
] as const;

type TTMValues = Record<(typeof TTM_FIELDS)[number], number | null>;

function computeTTM(quarters: QuarterRow[], currentIdx: number): TTMValues {
  const cur = quarters[currentIdx]!;
  const curMonth = parseInt(cur.dt_fim_exerc.slice(5, 7));

  if (curMonth === 12 && cur.source_type === "dfp") {
    return Object.fromEntries(TTM_FIELDS.map((f) => [f, cur[f]])) as TTMValues;
  }

  const lastYearEnd = `${parseInt(cur.dt_fim_exerc.slice(0, 4)) - 1}-12-31`;
  const lastYearSameQ = `${parseInt(cur.dt_fim_exerc.slice(0, 4)) - 1}-${cur.dt_fim_exerc.slice(5)}`;

  const annualRow = quarters.find(
    (q) => q.dt_fim_exerc === lastYearEnd && q.source_type === "dfp"
  );
  const lastYearQRow = quarters.find(
    (q) => q.dt_fim_exerc === lastYearSameQ && q.source_type === "itr"
  );

  if (!annualRow) {
    return Object.fromEntries(TTM_FIELDS.map((f) => [f, cur[f]])) as TTMValues;
  }

  const result: any = {};
  for (const field of TTM_FIELDS) {
    const ytdCur = cur[field];
    const annual = annualRow[field];
    const ytdLastYear = lastYearQRow?.[field];
    result[field] =
      ytdCur != null && annual != null
        ? ytdCur + annual - (ytdLastYear ?? 0)
        : ytdCur;
  }
  return result;
}

function safeDiv(numerator: number | null, denominator: number | null): number | null {
  return numerator != null && denominator != null && denominator > 0
    ? numerator / denominator
    : null;
}

function detectShareScales(
  db: Database,
  byCnpj: Map<string, QuarterRow[]>
): Map<string, number> {
  const factors = new Map<string, number>();

  const tickerPrices = db
    .query(
      `SELECT t.cnpj, dp.adjusted_close
       FROM tickers t
       JOIN daily_prices dp ON t.ticker_yahoo = dp.ticker_yahoo
       WHERE dp.date = (SELECT MAX(d2.date) FROM daily_prices d2 WHERE d2.ticker_yahoo = t.ticker_yahoo)
         AND dp.adjusted_close > 0`
    )
    .all() as { cnpj: string; adjusted_close: number }[];

  const priceMap = new Map<string, number>();
  for (const r of tickerPrices) {
    if (!priceMap.has(r.cnpj)) priceMap.set(r.cnpj, r.adjusted_close);
  }

  for (const [cnpj, quarters] of byCnpj) {
    const price = priceMap.get(cnpj);
    if (!price) continue;

    for (let i = quarters.length - 1; i >= 0; i--) {
      const q = quarters[i]!;
      if (q.shares_outstanding && q.shares_outstanding > 0 && q.patrimonio_liquido && q.patrimonio_liquido > 0) {
        const pvp = (q.shares_outstanding * price) / q.patrimonio_liquido;
        factors.set(cnpj, pvp < 0.01 ? 1000 : 1);
        break;
      }
    }
  }

  const scaled = [...factors.values()].filter((f) => f > 1).length;
  console.log(`  Share scale: ${scaled} companies at 1000x, ${factors.size - scaled} at face value`);
  return factors;
}

interface MetricInput {
  cnpj: string;
  dt_fim_exerc: string;
  tickerYahoo: string;
  cur: QuarterRow;
  ttm: TTMValues;
  sharesOutstanding: number;
  price: number;
  priceDate: string;
  avgDailyLiquidity?: number | null;
  return1q?: number | null;
  returnStart?: string | null;
  returnEnd?: string | null;
}

function buildMetricRow(m: MetricInput) {
  const marketCap = m.sharesOutstanding * m.price;
  const netDebt =
    (m.cur.passivo_circulante ?? 0) +
    (m.cur.passivo_nao_circulante ?? 0) -
    (m.cur.caixa_equivalentes ?? 0);
  const ev = marketCap + netDebt;

  return {
    $cnpj: m.cnpj,
    $dt_fim_exerc: m.dt_fim_exerc,
    $scope: "con",
    $ticker_yahoo: m.tickerYahoo,
    $price_close: m.price,
    $price_date: m.priceDate,
    $shares_outstanding: m.sharesOutstanding,
    $market_cap: marketCap,
    $enterprise_value: ev,
    $receita_liquida_ttm: m.ttm.receita_liquida,
    $resultado_bruto_ttm: m.ttm.resultado_bruto,
    $ebit_ttm: m.ttm.ebit,
    $lucro_liquido_ttm: m.ttm.lucro_liquido,
    $fluxo_caixa_op_ttm: m.ttm.fluxo_caixa_operacional,
    $pl_ratio: safeDiv(marketCap, m.ttm.lucro_liquido),
    $pvp_ratio: safeDiv(marketCap, m.cur.patrimonio_liquido),
    $ev_ebit: safeDiv(ev, m.ttm.ebit),
    $price_to_sales: safeDiv(marketCap, m.ttm.receita_liquida),
    $roe: safeDiv(m.ttm.lucro_liquido, m.cur.patrimonio_liquido),
    $roa: safeDiv(m.ttm.lucro_liquido, m.cur.ativo_total),
    $margem_liquida: safeDiv(m.ttm.lucro_liquido, m.ttm.receita_liquida),
    $margem_bruta: safeDiv(m.ttm.resultado_bruto, m.ttm.receita_liquida),
    $margem_ebit: safeDiv(m.ttm.ebit, m.ttm.receita_liquida),
    $liquidez_corrente: safeDiv(m.cur.ativo_circulante, m.cur.passivo_circulante),
    $divida_liquida_ebit: m.ttm.ebit && m.ttm.ebit > 0 ? netDebt / m.ttm.ebit : null,
    $avg_daily_liquidity: m.avgDailyLiquidity ?? null,
    $return_1q: m.return1q ?? null,
    $return_date_start: m.returnStart ?? null,
    $return_date_end: m.returnEnd ?? null,
  };
}

export async function computeMetrics(db: Database) {
  console.log("[6/6] Computing financial metrics...");

  const allQuarters = db
    .query(
      `SELECT cnpj, dt_fim_exerc, source_type,
              ativo_total, ativo_circulante, caixa_equivalentes,
              passivo_total, passivo_circulante, passivo_nao_circulante,
              patrimonio_liquido, receita_liquida, resultado_bruto, ebit,
              lucro_liquido, fluxo_caixa_operacional, shares_outstanding
       FROM company_quarters WHERE scope = 'con'
       ORDER BY cnpj, dt_fim_exerc`
    )
    .all() as QuarterRow[];

  const byCnpj = new Map<string, QuarterRow[]>();
  for (const q of allQuarters) {
    let arr = byCnpj.get(q.cnpj);
    if (!arr) {
      arr = [];
      byCnpj.set(q.cnpj, arr);
    }
    arr.push(q);
  }

  const shareScaleFactors = detectShareScales(db, byCnpj);

  // Best ticker (most price data) per cnpj
  const tickerMap = new Map<string, string>();
  const tickerRows = db
    .query(
      `SELECT t.cnpj, t.ticker_yahoo, COUNT(dp.date) as cnt
       FROM tickers t JOIN daily_prices dp ON t.ticker_yahoo = dp.ticker_yahoo
       GROUP BY t.cnpj, t.ticker_yahoo ORDER BY t.cnpj, cnt DESC`
    )
    .all() as { cnpj: string; ticker_yahoo: string; cnt: number }[];

  for (const r of tickerRows) {
    if (!tickerMap.has(r.cnpj)) tickerMap.set(r.cnpj, r.ticker_yahoo);
  }

  const priceStmt = db.prepare(
    `SELECT date, adjusted_close FROM daily_prices
     WHERE ticker_yahoo = ? AND date <= ? AND adjusted_close IS NOT NULL
     ORDER BY date DESC LIMIT 1`
  );
  const fwdPriceStmt = db.prepare(
    `SELECT date, adjusted_close FROM daily_prices
     WHERE ticker_yahoo = ? AND date >= ? AND adjusted_close IS NOT NULL
     ORDER BY date ASC LIMIT 1`
  );
  // Latest price per ticker (for "current" snapshot)
  const latestPriceStmt = db.prepare(
    `SELECT date, adjusted_close FROM daily_prices
     WHERE ticker_yahoo = ? AND adjusted_close IS NOT NULL
     ORDER BY date DESC LIMIT 1`
  );

  // Avg daily liquidity (volume * close) over the 3 months before a date
  const avgLiquidityStmt = db.prepare(
    `SELECT AVG(volume * close) as avg_liq
     FROM daily_prices
     WHERE ticker_yahoo = ? AND date > ? AND date <= ?
       AND volume IS NOT NULL AND close IS NOT NULL AND volume > 0`
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
      avg_daily_liquidity,
      return_1q, return_date_start, return_date_end
    ) VALUES (
      $cnpj, $dt_fim_exerc, $scope, $ticker_yahoo,
      $price_close, $price_date, $shares_outstanding, $market_cap, $enterprise_value,
      $receita_liquida_ttm, $resultado_bruto_ttm, $ebit_ttm, $lucro_liquido_ttm,
      $fluxo_caixa_op_ttm,
      $pl_ratio, $pvp_ratio, $ev_ebit, $price_to_sales,
      $roe, $roa, $margem_liquida, $margem_bruta, $margem_ebit,
      $liquidez_corrente, $divida_liquida_ebit,
      $avg_daily_liquidity,
      $return_1q, $return_date_start, $return_date_end
    )
  `);

  db.exec("DELETE FROM company_metrics");
  let count = 0;
  let currentCount = 0;

  db.transaction(() => {
    for (const [cnpj, companyQuarters] of byCnpj) {
      const tickerYahoo = tickerMap.get(cnpj);
      if (!tickerYahoo) continue;

      const scaleFactor = shareScaleFactors.get(cnpj) ?? 1;
      const lastIdx = companyQuarters.length - 1;

      for (let idx = 0; idx < companyQuarters.length; idx++) {
        const cur = companyQuarters[idx]!;
        const dt_fim_exerc = cur.dt_fim_exerc;
        if (!cur.shares_outstanding || cur.shares_outstanding <= 0) continue;

        const sharesOutstanding = cur.shares_outstanding * scaleFactor;
        const ttm = computeTTM(companyQuarters, idx);

        // Historical metric: price at quarter-end
        const priceRow = priceStmt.get(tickerYahoo, dt_fim_exerc) as {
          date: string;
          adjusted_close: number;
        } | null;
        if (!priceRow) continue;

        // Forward 1-quarter return
        let return1q: number | null = null;
        let returnStart: string | null = null;
        let returnEnd: string | null = null;

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

        // Avg daily liquidity: 3 months before quarter-end
        const liqFrom = addMonths(dt_fim_exerc, -3);
        const liqRow = avgLiquidityStmt.get(tickerYahoo, liqFrom, dt_fim_exerc) as { avg_liq: number | null } | null;
        const avgDailyLiquidity = liqRow?.avg_liq ?? null;

        insertMetric.run(buildMetricRow({
          cnpj, dt_fim_exerc, tickerYahoo, cur, ttm, sharesOutstanding,
          price: priceRow.adjusted_close, priceDate: priceRow.date,
          avgDailyLiquidity, return1q, returnStart, returnEnd,
        }));
        count++;

        // "current" snapshot: latest quarter's financials + today's price
        if (idx === lastIdx) {
          const latestPrice = latestPriceStmt.get(tickerYahoo) as {
            date: string;
            adjusted_close: number;
          } | null;
          if (latestPrice && latestPrice.date > priceRow.date) {
            // Current snapshot: use latest 3 months of liquidity
            const curLiqFrom = addMonths(latestPrice.date, -3);
            const curLiqRow = avgLiquidityStmt.get(tickerYahoo, curLiqFrom, latestPrice.date) as { avg_liq: number | null } | null;

            insertMetric.run(buildMetricRow({
              cnpj, dt_fim_exerc: "current", tickerYahoo, cur, ttm, sharesOutstanding,
              price: latestPrice.adjusted_close, priceDate: latestPrice.date,
              avgDailyLiquidity: curLiqRow?.avg_liq ?? null,
            }));
            currentCount++;
          }
        }
      }
    }
  })();

  db.exec("ANALYZE");

  const stats = db
    .query(
      `SELECT COUNT(DISTINCT cnpj) as companies,
              MIN(dt_fim_exerc) as min_date, MAX(dt_fim_exerc) as max_date,
              COUNT(pl_ratio) as has_pl, COUNT(return_1q) as has_return
       FROM company_metrics WHERE dt_fim_exerc != 'current'`
    )
    .get() as any;

  console.log(
    `  ${count} historical metrics for ${stats.companies} companies (${stats.min_date} to ${stats.max_date}).`
  );
  console.log(`  ${stats.has_pl} with P/L, ${stats.has_return} with forward returns.`);
  console.log(`  ${currentCount} current screening snapshots.\n`);
}
