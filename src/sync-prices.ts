import YahooFinance from "yahoo-finance2";
import { openDatabase } from "./db/connection";
import { createTables } from "./db/schema";

const noop = () => {};
const yahooFinance = new YahooFinance({ logger: { info: noop, warn: noop, error: noop, debug: noop, dir: noop } });

const START_DATE = "2010-01-01";

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

async function main() {
  const db = openDatabase();
  createTables(db);

  // Get all tickers
  const tickers = db
    .query("SELECT ticker, ticker_yahoo FROM tickers ORDER BY ticker")
    .all() as { ticker: string; ticker_yahoo: string }[];

  console.log(`Found ${tickers.length} tickers to sync prices for`);

  const insertPrice = db.prepare(`
    INSERT OR REPLACE INTO daily_prices
      (ticker_yahoo, date, open, high, low, close, adjusted_close, volume)
    VALUES ($ticker_yahoo, $date, $open, $high, $low, $close, $adjusted_close, $volume)
  `);

  const getMaxDate = db.prepare(
    "SELECT MAX(date) as max_date FROM daily_prices WHERE ticker_yahoo = ?"
  );

  const today = new Date().toISOString().slice(0, 10);
  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (let i = 0; i < tickers.length; i++) {
    const { ticker, ticker_yahoo } = tickers[i];

    // Determine start date
    const existing = getMaxDate.get(ticker_yahoo) as {
      max_date: string | null;
    };
    const startDate = existing?.max_date
      ? addDays(existing.max_date, 1)
      : START_DATE;

    if (startDate >= today) {
      skipCount++;
      continue;
    }

    try {
      const result = await yahooFinance.chart(ticker_yahoo, {
        period1: startDate,
        period2: today,
        interval: "1d",
      });

      const quotes = result.quotes;
      if (!quotes || quotes.length === 0) {
        skipCount++;
        continue;
      }

      const tx = db.transaction(() => {
        for (const q of quotes) {
          if (!q.date) continue;
          const date = q.date.toISOString().slice(0, 10);
          insertPrice.run({
            $ticker_yahoo: ticker_yahoo,
            $date: date,
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

      successCount++;
      console.log(
        `[${i + 1}/${tickers.length}] ${ticker}: ${quotes.length} days (${startDate} to ${today})`
      );
    } catch (err: any) {
      // Ticker doesn't exist on Yahoo Finance — this is expected for
      // many suffix combinations (e.g., company only has ON shares but we tried PN)
      errorCount++;
      if (i % 50 === 0 || errorCount <= 5) {
        console.log(
          `[${i + 1}/${tickers.length}] ${ticker}: skipped (${err.message?.slice(0, 60)})`
        );
      }
    }

    // Rate limiting
    await sleep(150);
  }

  console.log("\nRunning ANALYZE...");
  db.exec("ANALYZE");

  const totalPrices = db
    .query("SELECT COUNT(*) as cnt FROM daily_prices")
    .get() as { cnt: number };

  const distinctTickers = db
    .query("SELECT COUNT(DISTINCT ticker_yahoo) as cnt FROM daily_prices")
    .get() as { cnt: number };

  console.log(`\nDone!`);
  console.log(`  ${successCount} tickers with data`);
  console.log(`  ${skipCount} skipped (up to date or no data)`);
  console.log(`  ${errorCount} errors (invalid tickers)`);
  console.log(
    `  ${totalPrices.cnt} total price rows for ${distinctTickers.cnt} tickers`
  );

  db.close();
}

main().catch((err) => {
  console.error("Sync prices failed:", err);
  process.exit(1);
});
