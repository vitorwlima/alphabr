/**
 * Summarize sweep results: produce a markdown report of top strategies by
 * total return, CAGR, Sharpe, lowest drawdown, and a composite "robust" score.
 *
 * Usage:
 *   bun experiments/summarize.ts                         # default paths
 *   bun experiments/summarize.ts --in sweep_results.csv --out sweep_top.md
 */
import { readFileSync, writeFileSync } from "node:fs";

interface Row {
  strategy_id: string;
  category: string;
  total_return: number;
  cagr: number;
  max_drawdown: number;
  sharpe: number;
  win_rate: number;
  alpha_rate: number;
  quarters: number;
  filter: string;
  rank: string;
  top: number;
}

function parseCSV(text: string): Row[] {
  const lines = text.split("\n").filter((l) => l.trim());
  const out: Row[] = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = parseLine(lines[i]!);
    if (cols.length < 12) continue;
    out.push({
      strategy_id: cols[0]!,
      category: cols[1]!,
      total_return: +cols[2]!,
      cagr: +cols[3]!,
      max_drawdown: +cols[4]!,
      sharpe: +cols[5]!,
      win_rate: +cols[6]!,
      alpha_rate: +cols[7]!,
      quarters: +cols[8]!,
      filter: cols[9]!,
      rank: cols[10]!,
      top: +cols[11]!,
    });
  }
  return out;
}

function parseLine(line: string): string[] {
  const out: string[] = [];
  let cur = "";
  let inQ = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i]!;
    if (ch === '"') {
      if (inQ && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        inQ = !inQ;
      }
    } else if (ch === "," && !inQ) {
      out.push(cur);
      cur = "";
    } else {
      cur += ch;
    }
  }
  out.push(cur);
  return out;
}

function fmtCmd(r: Row): string {
  return `bun src/backtest.ts --filter "${r.filter}" --rank "${r.rank}" --top ${r.top}`;
}

function table(rows: Row[], title: string): string {
  let md = `\n## ${title}\n\n`;
  md += `| # | Strategy | Return | CAGR | Sharpe | MaxDD | Win% | α% | Top | Command |\n`;
  md += `|---|----------|-------:|-----:|-------:|------:|-----:|----:|----:|---------|\n`;
  rows.forEach((r, i) => {
    md +=
      `| ${i + 1} | ${r.strategy_id} | ${r.total_return.toFixed(0)}% | ${r.cagr.toFixed(1)}% | ${r.sharpe.toFixed(2)} | ${r.max_drawdown.toFixed(1)}% | ${r.win_rate.toFixed(0)}% | ${r.alpha_rate.toFixed(0)}% | ${r.top} | \`${fmtCmd(r)}\` |\n`;
  });
  return md;
}

function main() {
  const args = process.argv.slice(2);
  let inPath = "experiments/sweep_results.csv";
  let outPath = "experiments/sweep_top.md";
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--in") inPath = args[++i]!;
    else if (args[i] === "--out") outPath = args[++i]!;
  }

  const text = readFileSync(inPath, "utf-8");
  const rows = parseCSV(text);
  console.log(`Loaded ${rows.length} strategies from ${inPath}`);

  // Filter: only consider strategies with full quarter coverage (>= 40 quarters)
  // and produced data
  const valid = rows.filter((r) => r.quarters >= 40 && Number.isFinite(r.cagr));
  console.log(`After quarter filter (>=40q): ${valid.length}`);

  // Composite "robust" score: balance return with risk-adjusted return
  // and drawdown protection.
  // score = sharpe * (1 + cagr/100) / (1 + maxdd/100)
  function robust(r: Row): number {
    return (r.sharpe * (1 + r.cagr / 100)) / (1 + r.max_drawdown / 100);
  }

  const topReturn = [...valid].sort((a, b) => b.total_return - a.total_return).slice(0, 30);
  const topCAGR = [...valid].sort((a, b) => b.cagr - a.cagr).slice(0, 25);
  const topSharpe = [...valid].sort((a, b) => b.sharpe - a.sharpe).slice(0, 25);
  const lowDD = [...valid]
    .filter((r) => r.cagr > 15) // only consider profitable strategies
    .sort((a, b) => a.max_drawdown - b.max_drawdown)
    .slice(0, 25);
  const topRobust = [...valid]
    .sort((a, b) => robust(b) - robust(a))
    .slice(0, 25);
  const topAlpha = [...valid]
    .sort((a, b) => b.alpha_rate - a.alpha_rate)
    .slice(0, 25);

  // Per-category top picks
  const categories = [...new Set(valid.map((r) => r.category))].sort();
  let perCat = "";
  for (const cat of categories) {
    const top3 = [...valid]
      .filter((r) => r.category === cat)
      .sort((a, b) => b.total_return - a.total_return)
      .slice(0, 3);
    if (top3.length === 0) continue;
    perCat += `\n### ${cat}\n\n`;
    perCat += `| Strategy | Return | CAGR | Sharpe | MaxDD | Top |\n`;
    perCat += `|----------|-------:|-----:|-------:|------:|----:|\n`;
    for (const r of top3) {
      perCat += `| ${r.strategy_id} | ${r.total_return.toFixed(0)}% | ${r.cagr.toFixed(1)}% | ${r.sharpe.toFixed(2)} | ${r.max_drawdown.toFixed(1)}% | ${r.top} |\n`;
    }
  }

  const overall = {
    count: valid.length,
    avgReturn: valid.reduce((a, r) => a + r.total_return, 0) / valid.length,
    medianReturn: median(valid.map((r) => r.total_return)),
    avgSharpe: valid.reduce((a, r) => a + r.sharpe, 0) / valid.length,
    countBeating20: valid.filter((r) => r.cagr > 20).length,
    countBeating25: valid.filter((r) => r.cagr > 25).length,
    countBeating30: valid.filter((r) => r.cagr > 30).length,
  };

  let md = `# Strategy Sweep Results\n\n`;
  md += `**Total strategies tested:** ${rows.length}\n\n`;
  md += `**Valid (>=40 quarters):** ${valid.length}\n\n`;
  md += `**Average total return:** ${overall.avgReturn.toFixed(0)}%\n`;
  md += `**Median total return:** ${overall.medianReturn.toFixed(0)}%\n`;
  md += `**Average Sharpe:** ${overall.avgSharpe.toFixed(2)}\n`;
  md += `**Strategies with CAGR > 20%:** ${overall.countBeating20}\n`;
  md += `**Strategies with CAGR > 25%:** ${overall.countBeating25}\n`;
  md += `**Strategies with CAGR > 30%:** ${overall.countBeating30}\n`;

  md += table(topReturn, "Top 30 by Total Return");
  md += table(topCAGR, "Top 25 by CAGR");
  md += table(topSharpe, "Top 25 by Sharpe Ratio");
  md += table(lowDD, "Top 25 Lowest Drawdown (CAGR > 15%)");
  md += table(topRobust, "Top 25 by Robust Score (Sharpe × (1+CAGR) / (1+DD))");
  md += table(topAlpha, "Top 25 by Alpha Rate (% quarters beating BOVA11)");
  md += `\n## Per-Category Best\n${perCat}`;

  writeFileSync(outPath, md);
  console.log(`Wrote ${outPath}`);
}

function median(arr: number[]): number {
  const s = [...arr].sort((a, b) => a - b);
  const n = s.length;
  return n % 2 ? s[(n - 1) / 2]! : (s[n / 2 - 1]! + s[n / 2]!) / 2;
}

main();
