import YahooFinance from "yahoo-finance2";
import { openDatabase } from "./db/connection";
import { createTables } from "./db/schema";

const noop = () => {};
const yahooFinance = new YahooFinance({
  logger: { info: noop, warn: noop, error: noop, debug: noop, dir: noop },
});

/**
 * Backtesting engine for quantitative stock screening strategies.
 *
 * Usage:
 *   bun src/backtest.ts [options]
 *
 * Options:
 *   --filter "pl_ratio > 0 AND pl_ratio < 10 AND ev_ebit > 0 AND ev_ebit < 8"
 *   --rank "ev_ebit ASC"           (metric to rank by, ASC = lower is better)
 *   --top 10                       (number of stocks to hold)
 *   --start 2020-01-01             (backtest start date)
 *   --end 2025-12-31               (backtest end date)
 *   --benchmark BOVA11.SA          (benchmark ticker)
 *
 * Example (Magic Formula - low EV/EBIT + high ROE):
 *   bun src/backtest.ts \
 *     --filter "ev_ebit > 0 AND ev_ebit < 50 AND roe > 0 AND market_cap > 1e9" \
 *     --rank "ev_ebit ASC" \
 *     --top 10
 */

interface PortfolioEntry {
  ticker_yahoo: string;
  cnpj: string;
  weight: number;
  entry_price: number;
  entry_date: string;
}

interface QuarterResult {
  dt_fim_exerc: string;
  portfolio: PortfolioEntry[];
  return_pct: number;
  cumulative: number;
  benchmark_return: number;
  benchmark_cumulative: number;
}

async function ensureBenchmarkPrices(
  db: ReturnType<typeof openDatabase>,
  ticker: string,
  startDate: string
) {
  const existing = db
    .query(
      "SELECT COUNT(*) as cnt FROM daily_prices WHERE ticker_yahoo = ?"
    )
    .get(ticker) as { cnt: number };

  if (existing.cnt > 100) return; // already have enough data

  console.log(`Downloading benchmark prices for ${ticker}...`);
  try {
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
    console.log(`  Downloaded ${result.quotes.length} days for ${ticker}`);
  } catch (err: any) {
    console.warn(`  Warning: could not download ${ticker}: ${err.message}`);
  }
}

function parseArgs() {
  const args = process.argv.slice(2);

  const defaults = {
    filter: "ev_ebit > 0 AND ev_ebit < 50 AND roe > 0 AND market_cap > 1e9",
    rank: "ev_ebit ASC",
    top: 10,
    start: "2012-01-01",
    end: "2025-12-31",
    benchmark: "BOVA11.SA",
  };

  for (let i = 0; i < args.length; i += 2) {
    const key = args[i].replace("--", "") as keyof typeof defaults;
    const val = args[i + 1];
    if (key === "top") {
      defaults.top = parseInt(val);
    } else if (key in defaults) {
      (defaults as any)[key] = val;
    }
  }

  return defaults;
}

async function main() {
  const config = parseArgs();
  const db = openDatabase();
  createTables(db);

  console.log("=== Backtest Configuration ===");
  console.log(`  Filter:    ${config.filter}`);
  console.log(`  Rank:      ${config.rank}`);
  console.log(`  Top:       ${config.top} stocks`);
  console.log(`  Period:    ${config.start} to ${config.end}`);
  console.log(`  Benchmark: ${config.benchmark}`);
  console.log();

  // Get standard quarter-end rebalancing dates (Mar, Jun, Sep, Dec only)
  const rebalDates = db
    .query(
      `SELECT DISTINCT dt_fim_exerc
       FROM company_metrics
       WHERE dt_fim_exerc >= ? AND dt_fim_exerc <= ?
         AND CAST(SUBSTR(dt_fim_exerc, 6, 2) AS INTEGER) IN (3, 6, 9, 12)
       ORDER BY dt_fim_exerc`
    )
    .all(config.start, config.end) as { dt_fim_exerc: string }[];

  // Ensure benchmark price data exists
  await ensureBenchmarkPrices(db, config.benchmark, config.start);

  console.log(`Found ${rebalDates.length} rebalancing dates\n`);

  if (rebalDates.length < 2) {
    console.log("Need at least 2 rebalancing dates for a backtest.");
    db.close();
    return;
  }

  // Price lookup helpers
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

  const results: QuarterResult[] = [];
  let portfolioCumulative = 1.0;
  let benchmarkCumulative = 1.0;

  for (let i = 0; i < rebalDates.length - 1; i++) {
    const quarterEnd = rebalDates[i].dt_fim_exerc;
    const nextQuarterEnd = rebalDates[i + 1].dt_fim_exerc;

    // Screen and rank stocks for this quarter
    const sql = `
      SELECT cnpj, ticker_yahoo, pl_ratio, pvp_ratio, ev_ebit, roe, roa,
             margem_liquida, margem_bruta, margem_ebit, market_cap,
             liquidez_corrente, divida_liquida_ebit, price_to_sales
      FROM company_metrics
      WHERE dt_fim_exerc = ?
        AND ${config.filter}
      ORDER BY ${config.rank}
      LIMIT ?
    `;

    let selected: { cnpj: string; ticker_yahoo: string }[];
    try {
      selected = db.query(sql).all(quarterEnd, config.top) as any[];
    } catch (err: any) {
      console.error(`SQL error at ${quarterEnd}: ${err.message}`);
      continue;
    }

    if (selected.length === 0) continue;

    // Build equal-weight portfolio
    // Entry: first trading day after quarter end (data release lag ~1-2 months,
    // but we approximate with quarter end + a few days)
    const entryDate = addDays(quarterEnd, 5); // slight delay for data availability
    const exitDate = nextQuarterEnd;

    const portfolio: PortfolioEntry[] = [];
    let totalReturn = 0;
    let validStocks = 0;

    for (const stock of selected) {
      const entryPrice = priceAfter.get(stock.ticker_yahoo, entryDate) as {
        date: string;
        adjusted_close: number;
      } | null;
      const exitPrice = priceBefore.get(stock.ticker_yahoo, exitDate) as {
        date: string;
        adjusted_close: number;
      } | null;

      if (!entryPrice || !exitPrice) continue;

      const ret =
        (exitPrice.adjusted_close - entryPrice.adjusted_close) /
        entryPrice.adjusted_close;

      portfolio.push({
        ticker_yahoo: stock.ticker_yahoo,
        cnpj: stock.cnpj,
        weight: 1 / selected.length,
        entry_price: entryPrice.adjusted_close,
        entry_date: entryPrice.date,
      });

      totalReturn += ret;
      validStocks++;
    }

    if (validStocks === 0) continue;

    const avgReturn = totalReturn / validStocks;
    portfolioCumulative *= 1 + avgReturn;

    // Benchmark return for the same period
    const benchEntry = priceAfter.get(config.benchmark, entryDate) as {
      date: string;
      adjusted_close: number;
    } | null;
    const benchExit = priceBefore.get(config.benchmark, exitDate) as {
      date: string;
      adjusted_close: number;
    } | null;

    let benchReturn = 0;
    if (benchEntry && benchExit && benchEntry.adjusted_close > 0) {
      benchReturn =
        (benchExit.adjusted_close - benchEntry.adjusted_close) /
        benchEntry.adjusted_close;
    }
    benchmarkCumulative *= 1 + benchReturn;

    results.push({
      dt_fim_exerc: quarterEnd,
      portfolio,
      return_pct: avgReturn,
      cumulative: portfolioCumulative,
      benchmark_return: benchReturn,
      benchmark_cumulative: benchmarkCumulative,
    });

    const tickers = portfolio.map((p) => p.ticker_yahoo.replace(".SA", "")).join(", ");
    console.log(
      `${quarterEnd}: ${(avgReturn * 100).toFixed(1).padStart(6)}% ` +
        `(cum ${((portfolioCumulative - 1) * 100).toFixed(1)}%) | ` +
        `Bench ${(benchReturn * 100).toFixed(1)}% ` +
        `(cum ${((benchmarkCumulative - 1) * 100).toFixed(1)}%) | ` +
        `${validStocks} stocks: ${tickers}`
    );
  }

  if (results.length === 0) {
    console.log("No results — check your filter criteria.");
    db.close();
    return;
  }

  // Summary statistics
  console.log("\n=== Results ===");

  const totalReturn = portfolioCumulative - 1;
  const benchTotal = benchmarkCumulative - 1;
  const years =
    (new Date(results[results.length - 1].dt_fim_exerc).getTime() -
      new Date(results[0].dt_fim_exerc).getTime()) /
    (365.25 * 24 * 60 * 60 * 1000);

  const cagr = Math.pow(portfolioCumulative, 1 / years) - 1;
  const benchCagr = Math.pow(benchmarkCumulative, 1 / years) - 1;

  // Max drawdown
  let peak = 0;
  let maxDrawdown = 0;
  for (const r of results) {
    if (r.cumulative > peak) peak = r.cumulative;
    const dd = (peak - r.cumulative) / peak;
    if (dd > maxDrawdown) maxDrawdown = dd;
  }

  // Sharpe ratio (annualized, using quarterly returns)
  const returns = results.map((r) => r.return_pct);
  const meanReturn = returns.reduce((a, b) => a + b, 0) / returns.length;
  const variance =
    returns.reduce((a, r) => a + (r - meanReturn) ** 2, 0) / returns.length;
  const stdDev = Math.sqrt(variance);
  const annualizedReturn = (1 + meanReturn) ** 4 - 1;
  const annualizedStdDev = stdDev * Math.sqrt(4);
  const sharpe = annualizedStdDev > 0 ? annualizedReturn / annualizedStdDev : 0;

  // Win rate
  const wins = results.filter((r) => r.return_pct > 0).length;
  const alpha = results.filter(
    (r) => r.return_pct > r.benchmark_return
  ).length;

  console.log(
    `  Total Return:   ${(totalReturn * 100).toFixed(1)}% (benchmark: ${(benchTotal * 100).toFixed(1)}%)`
  );
  console.log(
    `  CAGR:           ${(cagr * 100).toFixed(1)}% (benchmark: ${(benchCagr * 100).toFixed(1)}%)`
  );
  console.log(`  Max Drawdown:   ${(maxDrawdown * 100).toFixed(1)}%`);
  console.log(`  Sharpe Ratio:   ${sharpe.toFixed(2)}`);
  console.log(
    `  Win Rate:       ${wins}/${results.length} quarters (${((wins / results.length) * 100).toFixed(0)}%)`
  );
  console.log(
    `  Beat Benchmark: ${alpha}/${results.length} quarters (${((alpha / results.length) * 100).toFixed(0)}%)`
  );
  console.log(`  Quarters:       ${results.length}`);
  console.log(`  Years:          ${years.toFixed(1)}`);

  db.close();
}

function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

main().catch((err) => {
  console.error("Backtest failed:", err);
  process.exit(1);
});
