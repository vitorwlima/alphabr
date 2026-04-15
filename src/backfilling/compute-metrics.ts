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

  db.transaction(() => {
    for (const [cnpj, companyQuarters] of byCnpj) {
      const tickerYahoo = tickerMap.get(cnpj);
      if (!tickerYahoo) continue;

      for (let idx = 0; idx < companyQuarters.length; idx++) {
        const cur = companyQuarters[idx]!;
        const dt_fim_exerc = cur.dt_fim_exerc;
        if (!cur.shares_outstanding || cur.shares_outstanding <= 0) continue;

      const scaleFactor = shareScaleFactors.get(cnpj) ?? 1;
      const sharesOutstanding = cur.shares_outstanding * scaleFactor;
      const ttm = computeTTM(companyQuarters, idx);

      const priceRow = priceStmt.get(tickerYahoo, dt_fim_exerc) as {
        date: string;
        adjusted_close: number;
      } | null;
      if (!priceRow) continue;

      const price = priceRow.adjusted_close;
      const marketCap = sharesOutstanding * price;
      const netDebt =
        (cur.passivo_circulante ?? 0) +
        (cur.passivo_nao_circulante ?? 0) -
        (cur.caixa_equivalentes ?? 0);
      const ev = marketCap + netDebt;

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

      insertMetric.run({
        $cnpj: cnpj,
        $dt_fim_exerc: dt_fim_exerc,
        $scope: "con",
        $ticker_yahoo: tickerYahoo,
        $price_close: price,
        $price_date: priceRow.date,
        $shares_outstanding: sharesOutstanding,
        $market_cap: marketCap,
        $enterprise_value: ev,
        $receita_liquida_ttm: ttm.receita_liquida,
        $resultado_bruto_ttm: ttm.resultado_bruto,
        $ebit_ttm: ttm.ebit,
        $lucro_liquido_ttm: ttm.lucro_liquido,
        $fluxo_caixa_op_ttm: ttm.fluxo_caixa_operacional,
        $pl_ratio: safeDiv(marketCap, ttm.lucro_liquido),
        $pvp_ratio: safeDiv(marketCap, cur.patrimonio_liquido),
        $ev_ebit: safeDiv(ev, ttm.ebit),
        $price_to_sales: safeDiv(marketCap, ttm.receita_liquida),
        $roe: safeDiv(ttm.lucro_liquido, cur.patrimonio_liquido),
        $roa: safeDiv(ttm.lucro_liquido, cur.ativo_total),
        $margem_liquida: safeDiv(ttm.lucro_liquido, ttm.receita_liquida),
        $margem_bruta: safeDiv(ttm.resultado_bruto, ttm.receita_liquida),
        $margem_ebit: safeDiv(ttm.ebit, ttm.receita_liquida),
        $liquidez_corrente: safeDiv(cur.ativo_circulante, cur.passivo_circulante),
        $divida_liquida_ebit: ttm.ebit && ttm.ebit > 0 ? netDebt / ttm.ebit : null,
        $return_1q: return1q,
        $return_date_start: returnStart,
        $return_date_end: returnEnd,
      });
      count++;
      }
    }
  })();

  db.exec("ANALYZE");

  const stats = db
    .query(
      `SELECT COUNT(DISTINCT cnpj) as companies,
              MIN(dt_fim_exerc) as min_date, MAX(dt_fim_exerc) as max_date,
              COUNT(pl_ratio) as has_pl, COUNT(return_1q) as has_return
       FROM company_metrics`
    )
    .get() as any;

  console.log(
    `  ${count} metrics for ${stats.companies} companies (${stats.min_date} to ${stats.max_date}).`
  );
  console.log(`  ${stats.has_pl} with P/L, ${stats.has_return} with forward returns.\n`);
}
