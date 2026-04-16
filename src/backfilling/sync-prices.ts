import type { Database } from "bun:sqlite";
import { yahooFinance } from "../lib/yahoo";
import { addDays } from "../lib/dates";

const START_DATE = "2010-01-01";

export async function syncPrices(db: Database) {
  console.log("[5/6] Syncing prices from Yahoo Finance...");

  const today = new Date().toISOString().slice(0, 10);

  // Global max date tells us if we've synced recently
  const globalMax = (
    db.query("SELECT MAX(date) as d FROM daily_prices").get() as { d: string | null }
  )?.d;

  if (globalMax && globalMax >= today) {
    console.log(`  Already up to date (latest: ${globalMax}).\n`);
    return;
  }

  // Batch-load last synced date per ticker
  const maxDates = new Map<string, string>();
  const maxDateRows = db
    .query("SELECT ticker_yahoo, MAX(date) as max_date FROM daily_prices GROUP BY ticker_yahoo")
    .all() as { ticker_yahoo: string; max_date: string }[];
  for (const r of maxDateRows) {
    maxDates.set(r.ticker_yahoo, r.max_date);
  }

  const allTickers = db
    .query("SELECT ticker, ticker_yahoo FROM tickers ORDER BY ticker")
    .all() as { ticker: string; ticker_yahoo: string }[];

  const isFirstRun = maxDates.size === 0;

  // Only sync tickers that:
  // 1. Already have price data (known valid) and need updating, OR
  // 2. Have never been tried (first run only — after that, untried tickers are assumed invalid)
  const needsSync = allTickers.filter(({ ticker_yahoo }) => {
    const maxDate = maxDates.get(ticker_yahoo);
    if (maxDate) return addDays(maxDate, 1) < today;
    return isFirstRun;
  });

  console.log(`  ${needsSync.length} tickers to fetch (${maxDates.size} known valid, ${allTickers.length} total).`);

  if (needsSync.length === 0) {
    console.log(`  All up to date.\n`);
    return;
  }

  const insertPrice = db.prepare(`
    INSERT OR REPLACE INTO daily_prices
      (ticker_yahoo, date, open, high, low, close, adjusted_close, volume)
    VALUES ($ticker_yahoo, $date, $open, $high, $low, $close, $adjusted_close, $volume)
  `);

  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < needsSync.length; i++) {
    const { ticker, ticker_yahoo } = needsSync[i]!;
    const maxDate = maxDates.get(ticker_yahoo);
    const startDate = maxDate ? addDays(maxDate, 1) : START_DATE;

    try {
      const result = await yahooFinance.chart(ticker_yahoo, {
        period1: startDate,
        period2: today,
        interval: "1d",
      });

      const quotes = result.quotes;
      if (!quotes || quotes.length === 0) continue;

      db.transaction(() => {
        for (const q of quotes) {
          if (!q.date) continue;
          insertPrice.run({
            $ticker_yahoo: ticker_yahoo,
            $date: q.date.toISOString().slice(0, 10),
            $open: q.open ?? null,
            $high: q.high ?? null,
            $low: q.low ?? null,
            $close: q.close ?? null,
            $adjusted_close: q.adjclose ?? q.close ?? null,
            $volume: q.volume ?? null,
          });
        }
      })();

      successCount++;
      if (successCount % 100 === 0) {
        console.log(`  ${successCount} synced so far... (${ticker}: ${quotes.length} days)`);
      }
    } catch {
      errorCount++;
    }

    await new Promise((r) => setTimeout(r, 150));
  }

  db.exec("ANALYZE");

  const totalPrices = db.query("SELECT COUNT(*) as cnt FROM daily_prices").get() as { cnt: number };
  console.log(
    `  Done: ${successCount} synced, ${errorCount} errors. ${totalPrices.cnt} total price rows.\n`
  );
}
