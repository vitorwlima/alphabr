import { openDatabase } from "../db/connection";

/**
 * Columns from `company_metrics` that make sense as filter/rank inputs.
 * Kept as an allowlist so the frontend filter builder doesn't accidentally
 * expose internals like CNPJ/ticker/dates.
 */
const FILTERABLE_COLUMNS = [
  "pl_ratio",
  "pvp_ratio",
  "ev_ebit",
  "price_to_sales",
  "roe",
  "roa",
  "margem_liquida",
  "margem_bruta",
  "margem_ebit",
  "liquidez_corrente",
  "divida_liquida_ebit",
  "market_cap",
  "enterprise_value",
  "avg_daily_liquidity",
  "shares_outstanding",
] as const;

export interface ColumnInfo {
  name: string;
  min: number | null;
  max: number | null;
  p5: number | null;
  p95: number | null;
  count: number;
}

export interface MetricsColumnsResult {
  columns: ColumnInfo[];
  rankableColumns: string[];
  latestQuarter: string | null;
}

function percentile(sorted: number[], p: number): number | null {
  if (sorted.length === 0) return null;
  const idx = Math.floor((sorted.length - 1) * p);
  return sorted[idx] ?? null;
}

export function getMetricsColumns(): MetricsColumnsResult {
  const db = openDatabase();
  try {
    const latestRow = db
      .query(
        `SELECT MAX(dt_fim_exerc) as q FROM company_metrics
         WHERE CAST(SUBSTR(dt_fim_exerc, 6, 2) AS INTEGER) IN (3, 6, 9, 12)`
      )
      .get() as { q: string | null };

    const latestQuarter = latestRow?.q ?? null;

    const columns: ColumnInfo[] = FILTERABLE_COLUMNS.map((col) => {
      const rows = db
        .query(
          `SELECT ${col} as v FROM company_metrics
           WHERE ${col} IS NOT NULL
             AND dt_fim_exerc >= date('now', '-5 years')`
        )
        .all() as { v: number }[];
      const values = rows
        .map((r) => r.v)
        .filter((v) => Number.isFinite(v))
        .sort((a, b) => a - b);

      return {
        name: col,
        min: values[0] ?? null,
        max: values[values.length - 1] ?? null,
        p5: percentile(values, 0.05),
        p95: percentile(values, 0.95),
        count: values.length,
      };
    });

    return {
      columns,
      rankableColumns: [...FILTERABLE_COLUMNS],
      latestQuarter,
    };
  } finally {
    db.close();
  }
}

export interface CurrentPick {
  ticker: string;
  cnpj: string;
  price: number | null;
  priceDate: string | null;
}

export interface CurrentPicksResult {
  asOfQuarter: string;
  relaxStep: number;
  picks: CurrentPick[];
}

/**
 * Runs the strategy against the latest available quarter and returns
 * top-N picks with the last known close price per ticker.
 */
export async function getCurrentPicks(
  filter: string,
  rank: string,
  top: number
): Promise<CurrentPicksResult> {
  const { selectPicks } = await import("./backtest");
  const db = openDatabase();
  try {
    const latestRow = db
      .query(
        `SELECT MAX(dt_fim_exerc) as q FROM company_metrics
         WHERE CAST(SUBSTR(dt_fim_exerc, 6, 2) AS INTEGER) IN (3, 6, 9, 12)`
      )
      .get() as { q: string | null };

    const quarter = latestRow?.q;
    if (!quarter) {
      return { asOfQuarter: "", relaxStep: 0, picks: [] };
    }

    const { picks, relaxStep } = selectPicks(db, quarter, filter, rank, top);

    const getPrice = db.prepare(
      `SELECT date, adjusted_close FROM daily_prices
       WHERE ticker_yahoo = ? AND adjusted_close > 0
       ORDER BY date DESC LIMIT 1`
    );

    const enriched: CurrentPick[] = picks.map((p) => {
      const row = getPrice.get(p.ticker_yahoo) as {
        date: string;
        adjusted_close: number;
      } | null;
      return {
        ticker: p.ticker_yahoo,
        cnpj: p.cnpj,
        price: row?.adjusted_close ?? null,
        priceDate: row?.date ?? null,
      };
    });

    return {
      asOfQuarter: quarter,
      relaxStep,
      picks: enriched,
    };
  } finally {
    db.close();
  }
}
