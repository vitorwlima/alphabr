import {
  runBacktest,
  DEFAULT_CONFIG,
  type BacktestConfig,
} from "./api/backtest";

/**
 * Backtesting engine for quantitative stock screening strategies.
 *
 * The heavy lifting lives in `src/api/backtest.ts` as a pure function so the
 * HTTP server can reuse it. This file is only the CLI wrapper.
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
 */

function parseArgs(): BacktestConfig {
  const args = process.argv.slice(2);
  const cfg: BacktestConfig = { ...DEFAULT_CONFIG };
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i]!.replace("--", "") as keyof BacktestConfig;
    const val = args[i + 1]!;
    if (key === "top") {
      cfg.top = parseInt(val);
    } else if (key in cfg) {
      (cfg as any)[key] = val;
    }
  }
  return cfg;
}

async function main() {
  const config = parseArgs();

  console.log("=== Backtest Configuration ===");
  console.log(`  Filter:    ${config.filter}`);
  console.log(`  Rank:      ${config.rank}`);
  console.log(`  Top:       ${config.top} stocks`);
  console.log(`  Period:    ${config.start} to ${config.end}`);
  console.log(`  Benchmark: ${config.benchmark}`);
  console.log();

  const result = await runBacktest(config);

  if (result.quarters.length === 0) {
    console.log("No results — check your filter criteria.");
    return;
  }

  for (const q of result.quarters) {
    const tickers = q.portfolio
      .map((p) => p.ticker.replace(".SA", ""))
      .join(", ");
    const stockSummary =
      q.relaxStep > 0
        ? `${q.portfolio.length} stocks (relax ${q.relaxStep.toFixed(1)})`
        : `${q.portfolio.length} stocks`;
    console.log(
      `${q.quarter}: ${(q.returnPct * 100).toFixed(1).padStart(6)}% ` +
        `(cum ${((q.cumulative - 1) * 100).toFixed(1)}%) | ` +
        `Bench ${(q.benchmarkReturn * 100).toFixed(1)}% ` +
        `(cum ${((q.benchmarkCumulative - 1) * 100).toFixed(1)}%) | ` +
        `${stockSummary}: ${tickers}`
    );
  }

  const s = result.summary;
  console.log("\n=== Results ===");
  console.log(
    `  Total Return:   ${(s.totalReturn * 100).toFixed(1)}% (benchmark: ${(s.benchmarkTotalReturn * 100).toFixed(1)}%)`
  );
  console.log(
    `  CAGR:           ${(s.cagr * 100).toFixed(1)}% (benchmark: ${(s.benchmarkCagr * 100).toFixed(1)}%)`
  );
  console.log(`  Max Drawdown:   ${(s.maxDrawdown * 100).toFixed(1)}%`);
  console.log(`  Sharpe Ratio:   ${s.sharpe.toFixed(2)}`);
  console.log(
    `  Win Rate:       ${Math.round(s.winRate * s.quarters)}/${s.quarters} quarters (${(s.winRate * 100).toFixed(0)}%)`
  );
  console.log(
    `  R$100 became:   R$${s.r100Final.toFixed(2)} (benchmark: R$${s.benchR100Final.toFixed(2)})`
  );
  console.log(
    `  Beat Benchmark: ${Math.round(s.alphaRate * s.quarters)}/${s.quarters} quarters (${(s.alphaRate * 100).toFixed(0)}%)`
  );
  console.log(`  Quarters:       ${s.quarters}`);
  console.log(`  Years:          ${s.years.toFixed(1)}`);
}

main().catch((err) => {
  console.error("Backtest failed:", err);
  process.exit(1);
});
