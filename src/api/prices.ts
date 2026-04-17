import { openDatabase } from "../db/connection";
import { yahooFinance } from "../lib/yahoo";

/**
 * Quote cache (60s TTL) for live price lookups.
 * The cache is in-process — a restart clears it, which is fine.
 */
interface CachedQuote {
  price: number | null;
  date: string | null;
  changePct: number | null;
  ts: number;
}

const TTL_MS = 60_000;
const quoteCache = new Map<string, CachedQuote>();

export type QuoteMap = Record<
  string,
  { price: number | null; date: string | null; changePct: number | null }
>;

async function fetchOne(ticker: string): Promise<CachedQuote> {
  try {
    const q = await yahooFinance.quote(ticker);
    // yahoo-finance2 returns varying shapes depending on asset class;
    // we pull price fields defensively.
    const price =
      (q as any).regularMarketPrice ??
      (q as any).regularMarketPreviousClose ??
      null;
    const prevClose = (q as any).regularMarketPreviousClose ?? null;
    const changePct =
      price != null && prevClose != null && prevClose !== 0
        ? (price - prevClose) / prevClose
        : null;
    const tsRaw =
      (q as any).regularMarketTime ?? (q as any).postMarketTime ?? null;
    const date =
      tsRaw instanceof Date
        ? tsRaw.toISOString().slice(0, 10)
        : typeof tsRaw === "number"
          ? new Date(tsRaw * 1000).toISOString().slice(0, 10)
          : null;
    return { price, date, changePct, ts: Date.now() };
  } catch {
    // Fall back to the last close stored in the DB if Yahoo is unreachable.
    const db = openDatabase();
    try {
      const row = db
        .query(
          `SELECT date, adjusted_close FROM daily_prices
           WHERE ticker_yahoo = ? AND adjusted_close > 0
           ORDER BY date DESC LIMIT 1`
        )
        .get(ticker) as { date: string; adjusted_close: number } | null;
      return {
        price: row?.adjusted_close ?? null,
        date: row?.date ?? null,
        changePct: null,
        ts: Date.now(),
      };
    } finally {
      db.close();
    }
  }
}

export async function getQuotes(tickers: string[]): Promise<QuoteMap> {
  const now = Date.now();
  const result: QuoteMap = {};
  const toFetch: string[] = [];

  for (const t of tickers) {
    const cached = quoteCache.get(t);
    if (cached && now - cached.ts < TTL_MS) {
      result[t] = {
        price: cached.price,
        date: cached.date,
        changePct: cached.changePct,
      };
    } else {
      toFetch.push(t);
    }
  }

  await Promise.all(
    toFetch.map(async (t) => {
      const quote = await fetchOne(t);
      quoteCache.set(t, quote);
      result[t] = {
        price: quote.price,
        date: quote.date,
        changePct: quote.changePct,
      };
    })
  );

  return result;
}

export interface PriceHistoryResult {
  ticker: string;
  series: { date: string; close: number }[];
}

/**
 * Returns daily adjusted closes for `ticker` between `start` and `end`.
 * Reads from the local DB first; if the window is not fully covered, tops
 * up from Yahoo and persists the fetched bars.
 */
export async function getPriceHistory(
  ticker: string,
  start: string,
  end: string
): Promise<PriceHistoryResult> {
  const db = openDatabase();
  try {
    const readSeries = () =>
      db
        .query(
          `SELECT date, adjusted_close FROM daily_prices
           WHERE ticker_yahoo = ? AND date >= ? AND date <= ?
             AND adjusted_close > 0
           ORDER BY date ASC`
        )
        .all(ticker, start, end) as { date: string; adjusted_close: number }[];

    let rows = readSeries();

    // If we're missing most of the range, try to backfill from Yahoo.
    const needsBackfill = rows.length < 10;
    if (needsBackfill) {
      try {
        const chart = await yahooFinance.chart(ticker, {
          period1: start,
          period2: end,
          interval: "1d",
        });
        const insert = db.prepare(`
          INSERT OR REPLACE INTO daily_prices
            (ticker_yahoo, date, open, high, low, close, adjusted_close, volume)
          VALUES ($t, $d, $o, $h, $l, $c, $ac, $v)
        `);
        const tx = db.transaction(() => {
          for (const q of chart.quotes) {
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
        rows = readSeries();
      } catch {
        // Swallow — return what we have (possibly empty).
      }
    }

    return {
      ticker,
      series: rows.map((r) => ({ date: r.date, close: r.adjusted_close })),
    };
  } finally {
    db.close();
  }
}

export async function getIbovSeries(
  start: string,
  end: string
): Promise<PriceHistoryResult> {
  return getPriceHistory("BOVA11.SA", start, end);
}
