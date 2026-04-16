/**
 * In-process strategy sweep.
 *
 * Runs thousands of backtest strategies in a single bun process (no per-test
 * spawn) sharing one SQLite connection. Writes one CSV row per strategy.
 *
 * Usage:
 *   bun experiments/sweep.ts                # full sweep
 *   bun experiments/sweep.ts --limit 500    # cap number of strategies
 *   bun experiments/sweep.ts --out my.csv   # custom output path
 *
 * The backtest core mirrors src/backtest.ts (same filter relaxation, same
 * entry/exit logic, same metrics) but runs silently.
 */
import { openDatabase } from "../src/db/connection";
import { createTables } from "../src/db/schema";
import { yahooFinance } from "../src/lib/yahoo";
import { addDays } from "../src/lib/dates";
import { writeFileSync, appendFileSync, existsSync } from "node:fs";

interface Strategy {
  id: string;
  category: string;
  filter: string;
  rank: string;
  top: number;
}

interface BacktestStats {
  total_return: number;
  cagr: number;
  max_drawdown: number;
  sharpe: number;
  win_rate: number;
  alpha_rate: number;
  quarters: number;
}

const START = "2012-01-01";
const END = "2025-12-31";
const BENCHMARK = "BOVA11.SA";

function relaxFilter(filter: string, step: number): string {
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

async function ensureBenchmarkPrices(
  db: ReturnType<typeof openDatabase>,
  ticker: string,
  startDate: string
) {
  const existing = db
    .query("SELECT COUNT(*) as cnt FROM daily_prices WHERE ticker_yahoo = ?")
    .get(ticker) as { cnt: number };
  if (existing.cnt > 100) return;
  console.log(`Downloading benchmark prices for ${ticker}...`);
  const result = await yahooFinance.chart(ticker, {
    period1: startDate,
    period2: new Date().toISOString().slice(0, 10),
    interval: "1d",
  });
  const insert = db.prepare(`
    INSERT OR REPLACE INTO daily_prices
      (ticker_yahoo, date, open, high, low, close, adjusted_close, volume)
    VALUES ($t, $d, $o, $h, $l, $c, $ac, $v)
  `);
  const tx = db.transaction(() => {
    for (const q of result.quotes) {
      if (!q.date) continue;
      insert.run({
        $t: ticker,
        $d: q.date.toISOString().slice(0, 10),
        $o: q.open ?? null,
        $h: q.high ?? null,
        $l: q.low ?? null,
        $c: q.close ?? null,
        $ac: q.adjclose ?? q.close ?? null,
        $v: q.volume ?? null,
      });
    }
  });
  tx();
}

function runBacktest(
  db: ReturnType<typeof openDatabase>,
  rebalDates: { dt_fim_exerc: string }[],
  priceAfter: ReturnType<ReturnType<typeof openDatabase>["prepare"]>,
  priceBefore: ReturnType<ReturnType<typeof openDatabase>["prepare"]>,
  benchStartPrice: number,
  strat: Strategy
): BacktestStats | null {
  const cols = `cnpj, ticker_yahoo`;
  let portfolioCum = 1.0;
  let benchCum = 1.0;
  const returns: number[] = [];
  const benchReturns: number[] = [];
  let alpha = 0;
  let wins = 0;

  for (let i = 0; i < rebalDates.length - 1; i++) {
    const quarterEnd = rebalDates[i]!.dt_fim_exerc;
    const nextQuarterEnd = rebalDates[i + 1]!.dt_fim_exerc;

    let selected: { cnpj: string; ticker_yahoo: string }[] = [];
    const STEP = 0.1;
    const MAX_STEP = 3.0;
    for (let s = 0; s <= MAX_STEP + 1e-9; s += STEP) {
      const currentFilter = relaxFilter(strat.filter, s);
      const sql = `
        SELECT ${cols}
        FROM company_metrics
        WHERE dt_fim_exerc = ?
          AND ${currentFilter}
        ORDER BY ${strat.rank}
        LIMIT ?
      `;
      try {
        selected = db.query(sql).all(quarterEnd, strat.top) as any[];
      } catch {
        return null;
      }
      if (selected.length >= strat.top) break;
    }
    if (selected.length === 0) continue;

    const entryDate = addDays(quarterEnd, 5);
    const exitDate = nextQuarterEnd;
    let totalRet = 0;
    let validStocks = 0;

    for (const stock of selected) {
      const ep = priceAfter.get(stock.ticker_yahoo, entryDate) as
        | { adjusted_close: number }
        | null;
      const xp = priceBefore.get(stock.ticker_yahoo, exitDate) as
        | { adjusted_close: number }
        | null;
      if (!ep || !xp) continue;
      const ret = (xp.adjusted_close - ep.adjusted_close) / ep.adjusted_close;
      totalRet += ret;
      validStocks++;
    }
    if (validStocks === 0) continue;

    const avgRet = totalRet / validStocks;
    portfolioCum *= 1 + avgRet;

    const benchExit = priceBefore.get(BENCHMARK, exitDate) as
      | { adjusted_close: number }
      | null;
    let benchRet = 0;
    if (benchExit && benchStartPrice > 0) {
      const newCum = benchExit.adjusted_close / benchStartPrice;
      benchRet = newCum / benchCum - 1;
      benchCum = newCum;
    }

    returns.push(avgRet);
    benchReturns.push(benchRet);
    if (avgRet > 0) wins++;
    if (avgRet > benchRet) alpha++;
  }

  if (returns.length < 4) return null;

  const totalReturn = portfolioCum - 1;

  // Use last/first date span for CAGR (matches backtest.ts behaviour)
  const years =
    (new Date(rebalDates[returns.length]!.dt_fim_exerc).getTime() -
      new Date(rebalDates[0]!.dt_fim_exerc).getTime()) /
    (365.25 * 24 * 60 * 60 * 1000);
  const cagr = years > 0 ? Math.pow(portfolioCum, 1 / years) - 1 : 0;

  // Max drawdown
  let peak = 0;
  let maxDD = 0;
  let cum = 1.0;
  for (const r of returns) {
    cum *= 1 + r;
    if (cum > peak) peak = cum;
    const dd = (peak - cum) / peak;
    if (dd > maxDD) maxDD = dd;
  }

  // Sharpe
  const mean = returns.reduce((a, b) => a + b, 0) / returns.length;
  const variance =
    returns.reduce((a, r) => a + (r - mean) ** 2, 0) / returns.length;
  const stdDev = Math.sqrt(variance);
  const annRet = (1 + mean) ** 4 - 1;
  const annStd = stdDev * Math.sqrt(4);
  const sharpe = annStd > 0 ? annRet / annStd : 0;

  return {
    total_return: totalReturn * 100,
    cagr: cagr * 100,
    max_drawdown: maxDD * 100,
    sharpe,
    win_rate: (wins / returns.length) * 100,
    alpha_rate: (alpha / returns.length) * 100,
    quarters: returns.length,
  };
}

// ============================================================
// Strategy generator
// ============================================================

const TOPS_STD = [5, 10, 15, 20, 30];
const TOPS_WIDE = [3, 5, 8, 10, 12, 15, 20, 25, 30, 40, 50];
const LIQ_TIERS = [
  ["liq1m", "avg_daily_liquidity > 1e6"],
  ["liq2m", "avg_daily_liquidity > 2e6"],
  ["liq5m", "avg_daily_liquidity > 5e6"],
  ["liq10m", "avg_daily_liquidity > 1e7"],
] as const;

function strategy(
  id: string,
  category: string,
  filter: string,
  rank: string,
  top: number
): Strategy {
  return { id, category, filter, rank, top };
}

function generateStrategies(): Strategy[] {
  const out: Strategy[] = [];
  const seen = new Set<string>();
  const push = (s: Strategy) => {
    const key = `${s.filter}||${s.rank}||${s.top}`;
    if (seen.has(key)) return;
    seen.add(key);
    out.push(s);
  };

  const LIQ = "AND avg_daily_liquidity > 1e6";

  // -------------------------------------------------------------
  // 1. Single-factor value sweeps (fine-grained PL/EV/PVP/PS thresholds)
  // -------------------------------------------------------------
  const plBounds = [1.5, 2, 2.5, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20];
  const evBounds = [1.5, 2, 2.5, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20];
  const pvpBounds = [0.3, 0.5, 0.75, 1, 1.25, 1.5, 2, 3];
  const psBounds = [0.3, 0.5, 0.75, 1, 1.5, 2, 3];

  for (const b of plBounds) {
    for (const t of TOPS_STD) {
      push(
        strategy(
          `pl_lt${b}_t${t}`,
          "1.value_pl",
          `pl_ratio > 0 AND pl_ratio < ${b} ${LIQ}`,
          "pl_ratio ASC",
          t
        )
      );
    }
  }
  for (const b of evBounds) {
    for (const t of TOPS_STD) {
      push(
        strategy(
          `ev_lt${b}_t${t}`,
          "1.value_ev",
          `ev_ebit > 0 AND ev_ebit < ${b} ${LIQ}`,
          "ev_ebit ASC",
          t
        )
      );
    }
  }
  for (const b of pvpBounds) {
    for (const t of TOPS_STD) {
      push(
        strategy(
          `pvp_lt${b}_t${t}`,
          "1.value_pvp",
          `pvp_ratio > 0 AND pvp_ratio < ${b} ${LIQ}`,
          "pvp_ratio ASC",
          t
        )
      );
    }
  }
  for (const b of psBounds) {
    for (const t of TOPS_STD) {
      push(
        strategy(
          `ps_lt${b}_t${t}`,
          "1.value_ps",
          `price_to_sales > 0 AND price_to_sales < ${b} ${LIQ}`,
          "price_to_sales ASC",
          t
        )
      );
    }
  }

  // -------------------------------------------------------------
  // 2. Single-factor quality (rank by quality metric desc)
  // -------------------------------------------------------------
  const roeMins = [0.05, 0.1, 0.15, 0.2, 0.25, 0.3];
  const roaMins = [0.03, 0.05, 0.08, 0.1, 0.15, 0.2];
  const mlMins = [0.03, 0.05, 0.08, 0.1, 0.15, 0.2, 0.25];
  const mbMins = [0.1, 0.2, 0.3, 0.4, 0.5];
  const meMins = [0.05, 0.1, 0.15, 0.2, 0.25];

  for (const m of roeMins) {
    for (const t of TOPS_STD) {
      push(
        strategy(
          `roe_gt${m}_t${t}`,
          "2.qual_roe",
          `roe > ${m} ${LIQ}`,
          "roe DESC",
          t
        )
      );
    }
  }
  for (const m of roaMins) {
    for (const t of TOPS_STD) {
      push(
        strategy(
          `roa_gt${m}_t${t}`,
          "2.qual_roa",
          `roa > ${m} ${LIQ}`,
          "roa DESC",
          t
        )
      );
    }
  }
  for (const m of mlMins) {
    for (const t of TOPS_STD) {
      push(
        strategy(
          `ml_gt${m}_t${t}`,
          "2.qual_ml",
          `margem_liquida > ${m} ${LIQ}`,
          "margem_liquida DESC",
          t
        )
      );
    }
  }
  for (const m of mbMins) {
    for (const t of TOPS_STD) {
      push(
        strategy(
          `mb_gt${m}_t${t}`,
          "2.qual_mb",
          `margem_bruta > ${m} ${LIQ}`,
          "margem_bruta DESC",
          t
        )
      );
    }
  }
  for (const m of meMins) {
    for (const t of TOPS_STD) {
      push(
        strategy(
          `me_gt${m}_t${t}`,
          "2.qual_me",
          `margem_ebit > ${m} ${LIQ}`,
          "margem_ebit DESC",
          t
        )
      );
    }
  }

  // -------------------------------------------------------------
  // 3. Two-factor: value × value
  // -------------------------------------------------------------
  const plPairs = [2, 3, 5, 8, 10, 15];
  const evPairs = [2, 3, 5, 8, 10, 15];
  const pvpPairs = [0.5, 1, 1.5, 2];
  const psPairs = [0.5, 1, 2];

  for (const pl of plPairs) {
    for (const ev of evPairs) {
      for (const t of TOPS_STD) {
        for (const rank of ["pl_ratio ASC", "ev_ebit ASC"]) {
          push(
            strategy(
              `pl${pl}_ev${ev}_${rank.split(" ")[0]}_t${t}`,
              "3.val_val",
              `pl_ratio > 0 AND pl_ratio < ${pl} AND ev_ebit > 0 AND ev_ebit < ${ev} ${LIQ}`,
              rank,
              t
            )
          );
        }
      }
    }
  }
  for (const pl of plPairs) {
    for (const pvp of pvpPairs) {
      for (const t of TOPS_STD) {
        for (const rank of ["pl_ratio ASC", "pvp_ratio ASC"]) {
          push(
            strategy(
              `pl${pl}_pvp${pvp}_${rank.split(" ")[0]}_t${t}`,
              "3.val_val",
              `pl_ratio > 0 AND pl_ratio < ${pl} AND pvp_ratio > 0 AND pvp_ratio < ${pvp} ${LIQ}`,
              rank,
              t
            )
          );
        }
      }
    }
  }
  for (const ev of evPairs) {
    for (const pvp of pvpPairs) {
      for (const t of TOPS_STD) {
        for (const rank of ["ev_ebit ASC", "pvp_ratio ASC"]) {
          push(
            strategy(
              `ev${ev}_pvp${pvp}_${rank.split(" ")[0]}_t${t}`,
              "3.val_val",
              `ev_ebit > 0 AND ev_ebit < ${ev} AND pvp_ratio > 0 AND pvp_ratio < ${pvp} ${LIQ}`,
              rank,
              t
            )
          );
        }
      }
    }
  }
  for (const ev of evPairs) {
    for (const ps of psPairs) {
      for (const t of [10, 20]) {
        push(
          strategy(
            `ev${ev}_ps${ps}_t${t}`,
            "3.val_val",
            `ev_ebit > 0 AND ev_ebit < ${ev} AND price_to_sales > 0 AND price_to_sales < ${ps} ${LIQ}`,
            "ev_ebit ASC",
            t
          )
        );
      }
    }
  }

  // -------------------------------------------------------------
  // 4. Two-factor: value × quality (Greenblatt-style)
  // -------------------------------------------------------------
  const valFiltersForQ = [
    ["pl3", "pl_ratio > 0 AND pl_ratio < 3", "pl_ratio ASC"],
    ["pl5", "pl_ratio > 0 AND pl_ratio < 5", "pl_ratio ASC"],
    ["pl8", "pl_ratio > 0 AND pl_ratio < 8", "pl_ratio ASC"],
    ["pl10", "pl_ratio > 0 AND pl_ratio < 10", "pl_ratio ASC"],
    ["pl15", "pl_ratio > 0 AND pl_ratio < 15", "pl_ratio ASC"],
    ["ev3", "ev_ebit > 0 AND ev_ebit < 3", "ev_ebit ASC"],
    ["ev5", "ev_ebit > 0 AND ev_ebit < 5", "ev_ebit ASC"],
    ["ev8", "ev_ebit > 0 AND ev_ebit < 8", "ev_ebit ASC"],
    ["ev10", "ev_ebit > 0 AND ev_ebit < 10", "ev_ebit ASC"],
    ["ev15", "ev_ebit > 0 AND ev_ebit < 15", "ev_ebit ASC"],
    ["pvp1", "pvp_ratio > 0 AND pvp_ratio < 1", "pvp_ratio ASC"],
    ["pvp15", "pvp_ratio > 0 AND pvp_ratio < 1.5", "pvp_ratio ASC"],
    ["ps1", "price_to_sales > 0 AND price_to_sales < 1", "price_to_sales ASC"],
  ] as const;

  const qFilters = [
    ["roe10", "roe > 0.1"],
    ["roe15", "roe > 0.15"],
    ["roe20", "roe > 0.2"],
    ["roe25", "roe > 0.25"],
    ["roa8", "roa > 0.08"],
    ["roa12", "roa > 0.12"],
    ["ml10", "margem_liquida > 0.1"],
    ["ml15", "margem_liquida > 0.15"],
    ["ml20", "margem_liquida > 0.2"],
    ["mb30", "margem_bruta > 0.3"],
    ["mb40", "margem_bruta > 0.4"],
    ["me15", "margem_ebit > 0.15"],
    ["me20", "margem_ebit > 0.2"],
  ] as const;

  for (const [vid, vfilter, vrank] of valFiltersForQ) {
    for (const [qid, qfilter] of qFilters) {
      for (const t of TOPS_STD) {
        push(
          strategy(
            `${vid}_${qid}_t${t}`,
            "4.val_qual",
            `${vfilter} AND ${qfilter} ${LIQ}`,
            vrank,
            t
          )
        );
        // also rank by quality metric
        const qrank = qfilter.includes("roe")
          ? "roe DESC"
          : qfilter.includes("roa")
            ? "roa DESC"
            : qfilter.includes("margem_liquida")
              ? "margem_liquida DESC"
              : qfilter.includes("margem_bruta")
                ? "margem_bruta DESC"
                : "margem_ebit DESC";
        push(
          strategy(
            `${vid}_${qid}_rq_t${t}`,
            "4.val_qual",
            `${vfilter} AND ${qfilter} ${LIQ}`,
            qrank,
            t
          )
        );
      }
    }
  }

  // -------------------------------------------------------------
  // 5. Three-factor: value × quality × balance sheet
  // -------------------------------------------------------------
  const balFilters = [
    ["liq1", "liquidez_corrente > 1"],
    ["liq15", "liquidez_corrente > 1.5"],
    ["liq2", "liquidez_corrente > 2"],
    ["dle3", "divida_liquida_ebit < 3"],
    ["dle2", "divida_liquida_ebit < 2"],
    ["dle1", "divida_liquida_ebit < 1"],
    ["nodebt", "divida_liquida_ebit < 0"],
    ["cf", "fluxo_caixa_op_ttm > 0"],
  ] as const;

  const valForMF = [
    ["pl5", "pl_ratio > 0 AND pl_ratio < 5", "pl_ratio ASC"],
    ["pl8", "pl_ratio > 0 AND pl_ratio < 8", "pl_ratio ASC"],
    ["pl10", "pl_ratio > 0 AND pl_ratio < 10", "pl_ratio ASC"],
    ["ev5", "ev_ebit > 0 AND ev_ebit < 5", "ev_ebit ASC"],
    ["ev8", "ev_ebit > 0 AND ev_ebit < 8", "ev_ebit ASC"],
    ["ev10", "ev_ebit > 0 AND ev_ebit < 10", "ev_ebit ASC"],
  ] as const;

  const qForMF = [
    ["roe10", "roe > 0.1"],
    ["roe15", "roe > 0.15"],
    ["roe20", "roe > 0.2"],
    ["ml10", "margem_liquida > 0.1"],
    ["ml15", "margem_liquida > 0.15"],
    ["mb30", "margem_bruta > 0.3"],
  ] as const;

  for (const [vid, vfilter, vrank] of valForMF) {
    for (const [qid, qfilter] of qForMF) {
      for (const [bid, bfilter] of balFilters) {
        for (const t of [10, 20]) {
          push(
            strategy(
              `mf_${vid}_${qid}_${bid}_t${t}`,
              "5.three_factor",
              `${vfilter} AND ${qfilter} AND ${bfilter} ${LIQ}`,
              vrank,
              t
            )
          );
        }
      }
    }
  }

  // -------------------------------------------------------------
  // 6. Multi-factor (4+ filters) — kitchen sink variations
  // -------------------------------------------------------------
  const ksConfigs = [
    {
      name: "ks_pl5_ev5_roe15_ml10_liq1",
      f: "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND roe > 0.15 AND margem_liquida > 0.1 AND liquidez_corrente > 1",
      r: "ev_ebit ASC",
    },
    {
      name: "ks_pl5_ev5_roe20_ml15_dle2",
      f: "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND roe > 0.2 AND margem_liquida > 0.15 AND divida_liquida_ebit < 2",
      r: "ev_ebit ASC",
    },
    {
      name: "ks_pl8_ev8_roe15_mb30_cf",
      f: "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND roe > 0.15 AND margem_bruta > 0.3 AND fluxo_caixa_op_ttm > 0",
      r: "ev_ebit ASC",
    },
    {
      name: "ks_pl10_ev10_roe10_ml5_liq1_dle3",
      f: "pl_ratio > 0 AND pl_ratio < 10 AND ev_ebit > 0 AND ev_ebit < 10 AND roe > 0.1 AND margem_liquida > 0.05 AND liquidez_corrente > 1 AND divida_liquida_ebit < 3",
      r: "ev_ebit ASC",
    },
    {
      name: "ks_deep_pl3_ev3_roe10_ml5",
      f: "pl_ratio > 0 AND pl_ratio < 3 AND ev_ebit > 0 AND ev_ebit < 3 AND roe > 0.1 AND margem_liquida > 0.05",
      r: "ev_ebit ASC",
    },
    {
      name: "ks_pl5_ev5_pvp1_roe15_ml10",
      f: "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND pvp_ratio > 0 AND pvp_ratio < 1 AND roe > 0.15 AND margem_liquida > 0.1",
      r: "ev_ebit ASC",
    },
    {
      name: "ks_pl8_ev8_roe15_ml10_mb30_dle2",
      f: "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND roe > 0.15 AND margem_liquida > 0.1 AND margem_bruta > 0.3 AND divida_liquida_ebit < 2",
      r: "ev_ebit ASC",
    },
    {
      name: "ks_ev5_pvp1_roe15_me15_cf",
      f: "ev_ebit > 0 AND ev_ebit < 5 AND pvp_ratio > 0 AND pvp_ratio < 1 AND roe > 0.15 AND margem_ebit > 0.15 AND fluxo_caixa_op_ttm > 0",
      r: "ev_ebit ASC",
    },
  ];

  for (const ks of ksConfigs) {
    for (const t of [5, 8, 10, 15, 20, 30]) {
      for (const rank of [
        ks.r,
        "pl_ratio ASC",
        "pvp_ratio ASC",
        "roe DESC",
        "margem_liquida DESC",
      ]) {
        push(
          strategy(
            `${ks.name}_${rank.split(" ")[0]}_t${t}`,
            "6.kitchen_sink",
            `${ks.f} ${LIQ}`,
            rank,
            t
          )
        );
      }
    }
  }

  // -------------------------------------------------------------
  // 7. Liquidity tiers: best base strategies tested at higher liquidity
  // -------------------------------------------------------------
  const baseForLiq = [
    ["bestEV3", "ev_ebit > 0 AND ev_ebit < 3", "ev_ebit ASC"],
    ["bestEV5", "ev_ebit > 0 AND ev_ebit < 5", "ev_ebit ASC"],
    ["bestPL3", "pl_ratio > 0 AND pl_ratio < 3", "pl_ratio ASC"],
    ["bestPL5", "pl_ratio > 0 AND pl_ratio < 5", "pl_ratio ASC"],
    ["bestPL5EV5", "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5", "ev_ebit ASC"],
    ["bestPL3EV3ML5", "pl_ratio > 0 AND pl_ratio < 3 AND ev_ebit > 0 AND ev_ebit < 3 AND margem_liquida > 0.05", "ev_ebit ASC"],
    ["bestEV5ROE20", "ev_ebit > 0 AND ev_ebit < 5 AND roe > 0.2", "ev_ebit ASC"],
    ["bestPL5EV5ROE15ML10", "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND roe > 0.15 AND margem_liquida > 0.1", "ev_ebit ASC"],
  ] as const;

  for (const [bid, bfilter, brank] of baseForLiq) {
    for (const [lid, lfilter] of LIQ_TIERS) {
      for (const t of [5, 10, 15, 20, 30]) {
        push(
          strategy(
            `liq_${bid}_${lid}_t${t}`,
            "7.liquidity_tiers",
            `${bfilter} AND ${lfilter}`,
            brank,
            t
          )
        );
      }
    }
  }

  // -------------------------------------------------------------
  // 8. Market cap segments
  // -------------------------------------------------------------
  const capTiers = [
    ["small", "market_cap < 1e9"],
    ["mid", "market_cap >= 1e9 AND market_cap < 1e10"],
    ["midlarge", "market_cap >= 1e9 AND market_cap < 5e10"],
    ["large", "market_cap >= 1e10"],
    ["xlarge", "market_cap >= 5e10"],
    ["notlarge", "market_cap < 1e10"],
    ["notsmall", "market_cap >= 5e8"],
  ] as const;

  const baseForCap = [
    ["pl5", "pl_ratio > 0 AND pl_ratio < 5", "pl_ratio ASC"],
    ["pl8", "pl_ratio > 0 AND pl_ratio < 8", "pl_ratio ASC"],
    ["ev5", "ev_ebit > 0 AND ev_ebit < 5", "ev_ebit ASC"],
    ["ev8", "ev_ebit > 0 AND ev_ebit < 8", "ev_ebit ASC"],
    ["ev10", "ev_ebit > 0 AND ev_ebit < 10", "ev_ebit ASC"],
    ["ev10roe10", "ev_ebit > 0 AND ev_ebit < 10 AND roe > 0.1", "ev_ebit ASC"],
    ["pl10roe15", "pl_ratio > 0 AND pl_ratio < 10 AND roe > 0.15", "pl_ratio ASC"],
  ] as const;

  for (const [cid, cfilter] of capTiers) {
    for (const [bid, bfilter, brank] of baseForCap) {
      for (const t of [5, 10, 15, 20]) {
        push(
          strategy(
            `cap_${cid}_${bid}_t${t}`,
            "8.market_cap",
            `${bfilter} AND ${cfilter} ${LIQ}`,
            brank,
            t
          )
        );
      }
    }
  }

  // -------------------------------------------------------------
  // 9. Top-N sweeps: how does portfolio size affect results on the best?
  // -------------------------------------------------------------
  const baseForTopSweep = [
    ["sw_ev2", "ev_ebit > 0 AND ev_ebit < 2", "ev_ebit ASC"],
    ["sw_ev3", "ev_ebit > 0 AND ev_ebit < 3", "ev_ebit ASC"],
    ["sw_ev5", "ev_ebit > 0 AND ev_ebit < 5", "ev_ebit ASC"],
    ["sw_pl2", "pl_ratio > 0 AND pl_ratio < 2", "pl_ratio ASC"],
    ["sw_pl3", "pl_ratio > 0 AND pl_ratio < 3", "pl_ratio ASC"],
    ["sw_pl5", "pl_ratio > 0 AND pl_ratio < 5", "pl_ratio ASC"],
    ["sw_pl5_ev5", "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5", "ev_ebit ASC"],
    ["sw_pl3_ev3_ml5", "pl_ratio > 0 AND pl_ratio < 3 AND ev_ebit > 0 AND ev_ebit < 3 AND margem_liquida > 0.05", "pl_ratio ASC"],
    ["sw_ev3_pvp1", "ev_ebit > 0 AND ev_ebit < 3 AND pvp_ratio > 0 AND pvp_ratio < 1", "ev_ebit ASC"],
    ["sw_ev5_roe20", "ev_ebit > 0 AND ev_ebit < 5 AND roe > 0.2", "ev_ebit ASC"],
  ] as const;

  for (const [bid, bfilter, brank] of baseForTopSweep) {
    for (const t of TOPS_WIDE) {
      push(
        strategy(
          `${bid}_t${t}`,
          "9.top_sweep",
          `${bfilter} ${LIQ}`,
          brank,
          t
        )
      );
    }
  }

  // -------------------------------------------------------------
  // 10. Deep value variations (very strict)
  // -------------------------------------------------------------
  const deepValueConfigs = [
    "pl_ratio > 0 AND pl_ratio < 1.5",
    "pl_ratio > 0 AND pl_ratio < 2",
    "pl_ratio > 0 AND pl_ratio < 2.5",
    "ev_ebit > 0 AND ev_ebit < 1.5",
    "ev_ebit > 0 AND ev_ebit < 2",
    "ev_ebit > 0 AND ev_ebit < 2.5",
    "pvp_ratio > 0 AND pvp_ratio < 0.4",
    "pvp_ratio > 0 AND pvp_ratio < 0.6",
    "pvp_ratio > 0 AND pvp_ratio < 0.8",
    "price_to_sales > 0 AND price_to_sales < 0.3",
    "price_to_sales > 0 AND price_to_sales < 0.5",
  ];
  for (const f of deepValueConfigs) {
    const rank = f.includes("pl_ratio")
      ? "pl_ratio ASC"
      : f.includes("ev_ebit")
        ? "ev_ebit ASC"
        : f.includes("pvp_ratio")
          ? "pvp_ratio ASC"
          : "price_to_sales ASC";
    for (const t of TOPS_WIDE) {
      push(
        strategy(
          `deep_${f.split(" ")[0]}_${f.match(/< (\S+)/)![1]}_t${t}`,
          "10.deep_value",
          `${f} ${LIQ}`,
          rank,
          t
        )
      );
    }
  }
  // Deep value + quality
  for (const v of [
    "pl_ratio > 0 AND pl_ratio < 2",
    "pl_ratio > 0 AND pl_ratio < 3",
    "ev_ebit > 0 AND ev_ebit < 2",
    "ev_ebit > 0 AND ev_ebit < 3",
  ]) {
    for (const q of [
      "roe > 0.05",
      "roe > 0.1",
      "roe > 0.15",
      "margem_liquida > 0.05",
      "margem_liquida > 0.1",
      "margem_ebit > 0.1",
      "margem_bruta > 0.2",
    ]) {
      const rank = v.includes("pl_ratio") ? "pl_ratio ASC" : "ev_ebit ASC";
      for (const t of [5, 10, 15, 20]) {
        push(
          strategy(
            `deepq_${v.match(/< (\S+)/)![1]}_${q.replace(/[^a-z0-9]/gi, "")}_t${t}`,
            "10.deep_value_qual",
            `${v} AND ${q} ${LIQ}`,
            rank,
            t
          )
        );
      }
    }
  }

  // -------------------------------------------------------------
  // 11. Quality-only screens (no value filter)
  // -------------------------------------------------------------
  const qualOnlyConfigs = [
    {
      name: "qo_roe25_ml15",
      f: "roe > 0.25 AND margem_liquida > 0.15",
    },
    {
      name: "qo_roe20_ml10_mb30",
      f: "roe > 0.2 AND margem_liquida > 0.1 AND margem_bruta > 0.3",
    },
    {
      name: "qo_roe15_roa10_ml10",
      f: "roe > 0.15 AND roa > 0.1 AND margem_liquida > 0.1",
    },
    {
      name: "qo_roe25_me20",
      f: "roe > 0.25 AND margem_ebit > 0.2",
    },
    {
      name: "qo_roe30_ml20",
      f: "roe > 0.3 AND margem_liquida > 0.2",
    },
  ];
  for (const c of qualOnlyConfigs) {
    for (const r of ["roe DESC", "margem_liquida DESC", "margem_ebit DESC"]) {
      for (const t of [5, 10, 15, 20]) {
        push(
          strategy(
            `${c.name}_${r.split(" ")[0]}_t${t}`,
            "11.quality_only",
            `${c.f} ${LIQ}`,
            r,
            t
          )
        );
      }
    }
  }

  // -------------------------------------------------------------
  // 12. Cross-rank sweeps: filter on X, rank on Y
  // -------------------------------------------------------------
  const crossFilters = [
    ["pl5", "pl_ratio > 0 AND pl_ratio < 5"],
    ["pl8", "pl_ratio > 0 AND pl_ratio < 8"],
    ["pl10", "pl_ratio > 0 AND pl_ratio < 10"],
    ["ev5", "ev_ebit > 0 AND ev_ebit < 5"],
    ["ev8", "ev_ebit > 0 AND ev_ebit < 8"],
    ["ev10", "ev_ebit > 0 AND ev_ebit < 10"],
    ["pvp1", "pvp_ratio > 0 AND pvp_ratio < 1"],
    ["pvp15", "pvp_ratio > 0 AND pvp_ratio < 1.5"],
  ] as const;

  const crossRanks = [
    "pl_ratio ASC",
    "ev_ebit ASC",
    "pvp_ratio ASC",
    "price_to_sales ASC",
    "roe DESC",
    "roa DESC",
    "margem_liquida DESC",
    "margem_ebit DESC",
    "margem_bruta DESC",
  ];

  for (const [fid, ffilter] of crossFilters) {
    for (const r of crossRanks) {
      // Make the rank metric is non-null/positive so we don't sort garbage
      const rcol = r.split(" ")[0];
      const guard =
        r.endsWith("ASC") && rcol !== "margem_bruta"
          ? `${rcol} > 0`
          : `${rcol} IS NOT NULL`;
      for (const t of [10, 20]) {
        push(
          strategy(
            `cross_${fid}_rk_${rcol}_t${t}`,
            "12.cross_rank",
            `${ffilter} AND ${guard} ${LIQ}`,
            r,
            t
          )
        );
      }
    }
  }

  // -------------------------------------------------------------
  // 13. Yield/income oriented (low PL + high margin proxies for dividend)
  // -------------------------------------------------------------
  for (const pl of [3, 5, 8, 10]) {
    for (const ml of [0.1, 0.15, 0.2]) {
      for (const dle of [1, 2, 3]) {
        for (const t of [10, 20]) {
          push(
            strategy(
              `yield_pl${pl}_ml${ml}_dle${dle}_t${t}`,
              "13.yield",
              `pl_ratio > 0 AND pl_ratio < ${pl} AND margem_liquida > ${ml} AND divida_liquida_ebit < ${dle} ${LIQ}`,
              "pl_ratio ASC",
              t
            )
          );
        }
      }
    }
  }

  // -------------------------------------------------------------
  // 14. GARP (Growth at Reasonable Price) — wider value, strict quality
  // -------------------------------------------------------------
  for (const pl of [10, 12, 15, 20]) {
    for (const roe of [0.2, 0.25, 0.3]) {
      for (const m of [0.1, 0.15, 0.2]) {
        for (const t of [10, 20]) {
          push(
            strategy(
              `garp_pl${pl}_roe${roe}_ml${m}_t${t}`,
              "14.garp",
              `pl_ratio > 0 AND pl_ratio < ${pl} AND roe > ${roe} AND margem_liquida > ${m} ${LIQ}`,
              "pl_ratio ASC",
              t
            )
          );
        }
      }
    }
  }

  // -------------------------------------------------------------
  // 15. Randomized exploration (seeded for reproducibility)
  // -------------------------------------------------------------
  const rng = mulberry32(42);

  const randPlBounds = [2, 3, 4, 5, 6, 8, 10, 12, 15, 20];
  const randEvBounds = [2, 3, 4, 5, 6, 8, 10, 12, 15, 20];
  const randPvpBounds = [0.5, 0.75, 1, 1.5, 2];
  const randPsBounds = [0.5, 0.75, 1, 1.5, 2];
  const randRoeMins = [0, 0.05, 0.1, 0.15, 0.2, 0.25];
  const randMlMins = [0, 0.05, 0.1, 0.15, 0.2];
  const randMbMins = [0, 0.2, 0.3, 0.4];
  const randMeMins = [0, 0.1, 0.15, 0.2];
  const randDleMaxes = [0, 1, 2, 3, 5, 10, 20];
  const randLcMins = [0, 1, 1.5, 2];
  const randCapMins = [0, 5e8, 1e9, 5e9, 1e10];
  const randCapMaxes = [1e10, 5e10, 1e11, 1e12];

  const randRanks = [
    "pl_ratio ASC",
    "ev_ebit ASC",
    "pvp_ratio ASC",
    "price_to_sales ASC",
    "roe DESC",
    "margem_liquida DESC",
    "margem_ebit DESC",
  ];
  const randTops = [5, 8, 10, 12, 15, 20, 25, 30];

  function pick<T>(arr: readonly T[]): T {
    return arr[Math.floor(rng() * arr.length)]!;
  }

  for (let i = 0; i < 1500; i++) {
    const parts: string[] = [];
    // Randomly include each filter family
    if (rng() < 0.7) {
      const b = pick(randPlBounds);
      parts.push(`pl_ratio > 0 AND pl_ratio < ${b}`);
    }
    if (rng() < 0.6) {
      const b = pick(randEvBounds);
      parts.push(`ev_ebit > 0 AND ev_ebit < ${b}`);
    }
    if (rng() < 0.3) {
      const b = pick(randPvpBounds);
      parts.push(`pvp_ratio > 0 AND pvp_ratio < ${b}`);
    }
    if (rng() < 0.2) {
      const b = pick(randPsBounds);
      parts.push(`price_to_sales > 0 AND price_to_sales < ${b}`);
    }
    if (rng() < 0.5) {
      const m = pick(randRoeMins);
      if (m > 0) parts.push(`roe > ${m}`);
    }
    if (rng() < 0.4) {
      const m = pick(randMlMins);
      if (m > 0) parts.push(`margem_liquida > ${m}`);
    }
    if (rng() < 0.25) {
      const m = pick(randMbMins);
      if (m > 0) parts.push(`margem_bruta > ${m}`);
    }
    if (rng() < 0.25) {
      const m = pick(randMeMins);
      if (m > 0) parts.push(`margem_ebit > ${m}`);
    }
    if (rng() < 0.2) {
      const m = pick(randDleMaxes);
      parts.push(`divida_liquida_ebit < ${m}`);
    }
    if (rng() < 0.15) {
      const m = pick(randLcMins);
      if (m > 0) parts.push(`liquidez_corrente > ${m}`);
    }
    if (rng() < 0.2) {
      const m = pick(randCapMins);
      if (m > 0) parts.push(`market_cap >= ${m}`);
    }
    if (rng() < 0.15) {
      const m = pick(randCapMaxes);
      parts.push(`market_cap < ${m}`);
    }

    if (parts.length === 0) {
      // ensure at least one constraint
      const b = pick(randEvBounds);
      parts.push(`ev_ebit > 0 AND ev_ebit < ${b}`);
    }

    // Liquidity tier
    const liq = pick(LIQ_TIERS);
    parts.push(liq[1]);

    const filter = parts.join(" AND ");
    const rank = pick(randRanks);
    const top = pick(randTops);

    push(
      strategy(`rand_${i}`, "15.random", filter, rank, top)
    );
  }

  // -------------------------------------------------------------
  // 16. Ultra-concentrated portfolios (top 1-4 stocks)
  // -------------------------------------------------------------
  for (const [bid, bfilter, brank] of baseForTopSweep) {
    for (const t of [1, 2, 3, 4]) {
      push(
        strategy(
          `concentrated_${bid}_t${t}`,
          "16.concentrated",
          `${bfilter} ${LIQ}`,
          brank,
          t
        )
      );
    }
  }

  return out;
}

// Mulberry32 PRNG
function mulberry32(seed: number) {
  let s = seed >>> 0;
  return function () {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ============================================================
// Main
// ============================================================
async function main() {
  // Parse args
  const args = process.argv.slice(2);
  let limit = Infinity;
  let outPath = "experiments/sweep_results.csv";
  let resume = false;
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--limit") limit = parseInt(args[++i]!);
    else if (args[i] === "--out") outPath = args[++i]!;
    else if (args[i] === "--resume") resume = true;
  }

  const db = openDatabase();
  createTables(db);

  // Get standard quarter-end rebalancing dates (3, 6, 9, 12 only)
  const rebalDates = db
    .query(
      `SELECT DISTINCT dt_fim_exerc
       FROM company_metrics
       WHERE dt_fim_exerc >= ? AND dt_fim_exerc <= ?
         AND CAST(SUBSTR(dt_fim_exerc, 6, 2) AS INTEGER) IN (3, 6, 9, 12)
       ORDER BY dt_fim_exerc`
    )
    .all(START, END) as { dt_fim_exerc: string }[];

  await ensureBenchmarkPrices(db, BENCHMARK, START);

  console.log(`Rebalance dates: ${rebalDates.length}`);

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

  const firstEntryDate = addDays(rebalDates[0]!.dt_fim_exerc, 5);
  const benchStart =
    (priceAfter.get(BENCHMARK, firstEntryDate) as
      | { adjusted_close: number }
      | null
    )?.adjusted_close ?? 0;

  console.log("Generating strategies...");
  const strategies = generateStrategies();
  console.log(`Total strategies: ${strategies.length}`);

  // Resume: skip strategies whose ID already exists in the CSV
  const done = new Set<string>();
  if (resume && existsSync(outPath)) {
    const text = require("node:fs").readFileSync(outPath, "utf-8") as string;
    for (const line of text.split("\n").slice(1)) {
      const id = line.split(",")[0]?.replace(/"/g, "");
      if (id) done.add(id);
    }
    console.log(`Resuming: ${done.size} strategies already complete.`);
  } else {
    writeFileSync(
      outPath,
      "strategy_id,category,total_return,cagr,max_drawdown,sharpe,win_rate,alpha_rate,quarters,filter,rank,top\n"
    );
  }

  let runCount = 0;
  let okCount = 0;
  const t0 = Date.now();
  const totalToRun = Math.min(strategies.length, limit);

  for (const s of strategies) {
    if (runCount >= limit) break;
    if (done.has(s.id)) continue;
    runCount++;

    const stats = runBacktest(
      db,
      rebalDates,
      priceAfter,
      priceBefore,
      benchStart,
      s
    );
    if (stats) {
      okCount++;
      const escFilter = s.filter.replace(/"/g, '""');
      const escRank = s.rank.replace(/"/g, '""');
      appendFileSync(
        outPath,
        `"${s.id}","${s.category}",${stats.total_return.toFixed(2)},${stats.cagr.toFixed(2)},${stats.max_drawdown.toFixed(2)},${stats.sharpe.toFixed(3)},${stats.win_rate.toFixed(1)},${stats.alpha_rate.toFixed(1)},${stats.quarters},"${escFilter}","${escRank}",${s.top}\n`
      );
    }

    if (runCount % 100 === 0) {
      const elapsed = (Date.now() - t0) / 1000;
      const rate = runCount / elapsed;
      const eta = (totalToRun - runCount) / rate;
      console.log(
        `${runCount}/${totalToRun} | ok ${okCount} | ${rate.toFixed(1)}/s | ETA ${eta.toFixed(0)}s`
      );
    }
  }

  console.log(
    `\nDone. Ran ${runCount} strategies, ${okCount} produced results.`
  );
  console.log(`Total time: ${((Date.now() - t0) / 1000).toFixed(1)}s`);
  console.log(`Results: ${outPath}`);

  db.close();
}

main().catch((err) => {
  console.error("Sweep failed:", err);
  process.exit(1);
});
