import type { Database } from "bun:sqlite";
import { openDatabase } from "../db/connection";
import { createTables } from "../db/schema";
import { yahooFinance } from "../lib/yahoo";
import { addDays } from "../lib/dates";

export interface BacktestConfig {
  filter: string;
  rank: string;
  top: number;
  start: string;
  end: string;
  benchmark: string;
}

export interface PortfolioEntry {
  ticker: string;
  cnpj: string;
  weight: number;
  entryPrice: number;
  entryDate: string;
  exitPrice: number | null;
  exitDate: string | null;
  returnPct: number | null;
}

export interface QuarterResult {
  quarter: string;
  entryDate: string;
  exitDate: string;
  portfolio: PortfolioEntry[];
  returnPct: number;
  cumulative: number;
  benchmarkReturn: number;
  benchmarkCumulative: number;
  relaxStep: number;
}

export interface BacktestSummary {
  totalReturn: number;
  benchmarkTotalReturn: number;
  cagr: number;
  benchmarkCagr: number;
  maxDrawdown: number;
  sharpe: number;
  winRate: number;
  alphaRate: number;
  quarters: number;
  years: number;
  r100Final: number;
  benchR100Final: number;
}

export interface BacktestResult {
  config: BacktestConfig;
  quarters: QuarterResult[];
  summary: BacktestSummary;
}

export const DEFAULT_CONFIG: BacktestConfig = {
  filter: "ev_ebit > 0 AND ev_ebit < 50 AND roe > 0 AND market_cap > 1e9",
  rank: "ev_ebit ASC",
  top: 10,
  start: "2012-01-01",
  end: "2025-12-31",
  benchmark: "BOVA11.SA",
};

/**
 * Progressively widen numeric thresholds in a SQL-like filter string.
 * Each `col > X` is loosened to `col > X - step*|X|` and each `col < X`
 * to `col < X + step*|X|`. Near-zero bounds use a minimum delta so they
 * still move. step = 0 returns the filter unchanged.
 */
export function relaxFilter(filter: string, step: number): string {
  if (step <= 0) return filter;
  return filter.replace(
    /(\w+)\s*(>=|<=|>|<)\s*(-?\d+(?:\.\d+)?(?:e[+-]?\d+)?)/gi,
    (_m, col: string, op: string, valStr: string) => {
      const val = parseFloat(valStr);
      const delta = step * Math.max(Math.abs(val), 0.01);
      const newVal = op.startsWith(">") ? val - delta : val + delta;
      return `${col} ${op} ${newVal}`;
    }
  );
}

/**
 * Download benchmark prices from Yahoo if not already cached locally.
 */
export async function ensureBenchmarkPrices(
  db: Database,
  ticker: string,
  startDate: string
): Promise<void> {
  const existing = db
    .query("SELECT COUNT(*) as cnt FROM daily_prices WHERE ticker_yahoo = ?")
    .get(ticker) as { cnt: number };

  if (existing.cnt > 100) return;

  const result = await yahooFinance.chart(ticker, {
    period1: startDate,
    period2: new Date().toISOString().slice(0, 10),
    interval: "1d",
  });

  const insert = db.prepare(`
    INSERT OR REPLACE INTO daily_prices
      (ticker_yahoo, date, open, high, low, close, adjusted_close, volume)
    VALUES ($ticker_yahoo, $date, $open, $high, $low, $close, $adjusted_close, $volume)
  `);

  const tx = db.transaction(() => {
    for (const q of result.quotes) {
      if (!q.date) continue;
      insert.run({
        $ticker_yahoo: ticker,
        $date: q.date.toISOString().slice(0, 10),
        $open: q.open ?? null,
        $high: q.high ?? null,
        $low: q.low ?? null,
        $close: q.close ?? null,
        $adjusted_close: q.adjclose ?? q.close ?? null,
        $volume: q.volume ?? null,
      });
    }
  });
  tx();
}

const MAX_RELAX_STEP = 3.0;
const RELAX_INCREMENT = 0.1;

/**
 * Select top-N stocks for a given quarter. If the strict filter yields fewer
 * than `top` rows, relax numeric thresholds progressively until we have enough.
 */
export function selectPicks(
  db: Database,
  quarterEnd: string,
  filter: string,
  rank: string,
  top: number
): { picks: { cnpj: string; ticker_yahoo: string }[]; relaxStep: number } {
  const cols = `cnpj, ticker_yahoo`;
  for (let s = 0; s <= MAX_RELAX_STEP + 1e-9; s += RELAX_INCREMENT) {
    const current = relaxFilter(filter, s);
    const sql = `
      SELECT ${cols}
      FROM company_metrics
      WHERE dt_fim_exerc = ?
        AND ticker_yahoo IS NOT NULL
        AND ${current}
      ORDER BY ${rank}
      LIMIT ?
    `;
    const picks = db.query(sql).all(quarterEnd, top) as {
      cnpj: string;
      ticker_yahoo: string;
    }[];
    if (picks.length >= top || s >= MAX_RELAX_STEP) {
      return { picks, relaxStep: s };
    }
  }
  return { picks: [], relaxStep: MAX_RELAX_STEP };
}

/**
 * Run a full backtest and return a structured result. Never prints.
 * Safe to call from an HTTP handler.
 */
export async function runBacktest(
  input: Partial<BacktestConfig> = {}
): Promise<BacktestResult> {
  const config: BacktestConfig = { ...DEFAULT_CONFIG, ...input };
  const db = openDatabase();
  try {
    createTables(db);

    const rebalDates = db
      .query(
        `SELECT DISTINCT dt_fim_exerc
         FROM company_metrics
         WHERE dt_fim_exerc >= ? AND dt_fim_exerc <= ?
           AND CAST(SUBSTR(dt_fim_exerc, 6, 2) AS INTEGER) IN (3, 6, 9, 12)
         ORDER BY dt_fim_exerc`
      )
      .all(config.start, config.end) as { dt_fim_exerc: string }[];

    await ensureBenchmarkPrices(db, config.benchmark, config.start);

    if (rebalDates.length < 2) {
      return {
        config,
        quarters: [],
        summary: emptySummary(),
      };
    }

    const priceAfter = db.prepare(
      `SELECT date, adjusted_close FROM daily_prices
       WHERE ticker_yahoo = ? AND date >= ? AND adjusted_close > 0
       ORDER BY date ASC LIMIT 1`
    );
    const priceBefore = db.prepare(
      `SELECT date, adjusted_close FROM daily_prices
       WHERE ticker_yahoo = ? AND date <= ? AND adjusted_close > 0
       ORDER BY date DESC LIMIT 1`
    );

    const quarters: QuarterResult[] = [];
    let portfolioCumulative = 1.0;
    let benchmarkCumulative = 1.0;

    const firstEntryDate = addDays(rebalDates[0]!.dt_fim_exerc, 5);
    const benchFirst = priceAfter.get(config.benchmark, firstEntryDate) as {
      date: string;
      adjusted_close: number;
    } | null;
    const benchStartPrice = benchFirst?.adjusted_close ?? 0;

    for (let i = 0; i < rebalDates.length - 1; i++) {
      const quarterEnd = rebalDates[i]!.dt_fim_exerc;
      const nextQuarterEnd = rebalDates[i + 1]!.dt_fim_exerc;

      const { picks: selected, relaxStep } = selectPicks(
        db,
        quarterEnd,
        config.filter,
        config.rank,
        config.top
      );
      if (selected.length === 0) continue;

      const entryDate = addDays(quarterEnd, 5);
      const exitDate = nextQuarterEnd;

      const portfolio: PortfolioEntry[] = [];
      let totalReturn = 0;
      let validStocks = 0;

      for (const stock of selected) {
        const entry = priceAfter.get(stock.ticker_yahoo, entryDate) as {
          date: string;
          adjusted_close: number;
        } | null;
        const exit = priceBefore.get(stock.ticker_yahoo, exitDate) as {
          date: string;
          adjusted_close: number;
        } | null;

        let ret: number | null = null;
        if (entry && exit) {
          ret =
            (exit.adjusted_close - entry.adjusted_close) /
            entry.adjusted_close;
          totalReturn += ret;
          validStocks++;
        }

        portfolio.push({
          ticker: stock.ticker_yahoo,
          cnpj: stock.cnpj,
          weight: 1 / selected.length,
          entryPrice: entry?.adjusted_close ?? 0,
          entryDate: entry?.date ?? entryDate,
          exitPrice: exit?.adjusted_close ?? null,
          exitDate: exit?.date ?? null,
          returnPct: ret,
        });
      }

      if (validStocks === 0) continue;

      const avgReturn = totalReturn / validStocks;
      portfolioCumulative *= 1 + avgReturn;

      const benchExit = priceBefore.get(config.benchmark, exitDate) as {
        date: string;
        adjusted_close: number;
      } | null;

      let benchReturn = 0;
      if (benchExit && benchStartPrice > 0) {
        const newCum = benchExit.adjusted_close / benchStartPrice;
        benchReturn = newCum / benchmarkCumulative - 1;
        benchmarkCumulative = newCum;
      }

      quarters.push({
        quarter: quarterEnd,
        entryDate,
        exitDate,
        portfolio,
        returnPct: avgReturn,
        cumulative: portfolioCumulative,
        benchmarkReturn: benchReturn,
        benchmarkCumulative: benchmarkCumulative,
        relaxStep,
      });
    }

    const summary = computeSummary(quarters);
    return { config, quarters, summary };
  } finally {
    db.close();
  }
}

function computeSummary(quarters: QuarterResult[]): BacktestSummary {
  if (quarters.length === 0) return emptySummary();

  const last = quarters[quarters.length - 1]!;
  const first = quarters[0]!;
  const portfolioCum = last.cumulative;
  const benchCum = last.benchmarkCumulative;

  const years =
    (new Date(last.quarter).getTime() - new Date(first.quarter).getTime()) /
    (365.25 * 24 * 60 * 60 * 1000);
  const cagr = years > 0 ? Math.pow(portfolioCum, 1 / years) - 1 : 0;
  const benchCagr = years > 0 ? Math.pow(benchCum, 1 / years) - 1 : 0;

  let peak = 0;
  let maxDrawdown = 0;
  for (const r of quarters) {
    if (r.cumulative > peak) peak = r.cumulative;
    const dd = peak > 0 ? (peak - r.cumulative) / peak : 0;
    if (dd > maxDrawdown) maxDrawdown = dd;
  }

  const returns = quarters.map((r) => r.returnPct);
  const mean = returns.reduce((a, b) => a + b, 0) / returns.length;
  const variance =
    returns.reduce((a, r) => a + (r - mean) ** 2, 0) / returns.length;
  const stdDev = Math.sqrt(variance);
  const annualizedReturn = (1 + mean) ** 4 - 1;
  const annualizedStd = stdDev * Math.sqrt(4);
  const sharpe = annualizedStd > 0 ? annualizedReturn / annualizedStd : 0;

  const wins = quarters.filter((r) => r.returnPct > 0).length;
  const alpha = quarters.filter((r) => r.returnPct > r.benchmarkReturn).length;

  return {
    totalReturn: portfolioCum - 1,
    benchmarkTotalReturn: benchCum - 1,
    cagr,
    benchmarkCagr: benchCagr,
    maxDrawdown,
    sharpe,
    winRate: wins / quarters.length,
    alphaRate: alpha / quarters.length,
    quarters: quarters.length,
    years,
    r100Final: portfolioCum * 100,
    benchR100Final: benchCum * 100,
  };
}

function emptySummary(): BacktestSummary {
  return {
    totalReturn: 0,
    benchmarkTotalReturn: 0,
    cagr: 0,
    benchmarkCagr: 0,
    maxDrawdown: 0,
    sharpe: 0,
    winRate: 0,
    alphaRate: 0,
    quarters: 0,
    years: 0,
    r100Final: 100,
    benchR100Final: 100,
  };
}
