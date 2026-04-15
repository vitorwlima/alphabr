import type { Database } from "bun:sqlite";
import { yahooFinance } from "../lib/yahoo";
import { addDays } from "../lib/dates";

const START_DATE = "2010-01-01";

export async function syncPrices(db: Database) {
  console.log("[5/6] Syncing prices from Yahoo Finance...");

  const tickers = db
    .query("SELECT ticker, ticker_yahoo FROM tickers ORDER BY ticker")
    .all() as { ticker: string; ticker_yahoo: string }[];

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
    const { ticker, ticker_yahoo } = tickers[i]!;

    const existing = getMaxDate.get(ticker_yahoo) as { max_date: string | null };
    const startDate = existing?.max_date ? addDays(existing.max_date, 1) : START_DATE;

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
      if (i % 100 === 0 || i === tickers.length - 1) {
        console.log(`  [${i + 1}/${tickers.length}] ${ticker}: ${quotes.length} days`);
      }
    } catch {
      errorCount++;
    }

    await new Promise((r) => setTimeout(r, 150));
  }

  db.exec("ANALYZE");

  const totalPrices = db.query("SELECT COUNT(*) as cnt FROM daily_prices").get() as { cnt: number };
  const distinctTickers = db
    .query("SELECT COUNT(DISTINCT ticker_yahoo) as cnt FROM daily_prices")
    .get() as { cnt: number };

  console.log(
    `  ${successCount} synced, ${skipCount} skipped, ${errorCount} errors. ` +
      `${totalPrices.cnt} total rows, ${distinctTickers.cnt} tickers.\n`
  );
}
