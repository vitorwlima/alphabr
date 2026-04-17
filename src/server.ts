import { runBacktest, type BacktestConfig } from "./api/backtest";
import { getMetricsColumns, getCurrentPicks } from "./api/metrics";
import { getQuotes, getPriceHistory, getIbovSeries } from "./api/prices";

const PORT = Number(process.env.PORT ?? 8787);

const CORS_HEADERS: HeadersInit = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...CORS_HEADERS,
    },
  });
}

function errJson(message: string, status: number): Response {
  return json({ error: message }, status);
}

function validateBacktestConfig(body: any): BacktestConfig | string {
  if (!body || typeof body !== "object") return "Missing request body";
  const { filter, rank, top, start, end, benchmark } = body;
  if (typeof filter !== "string" || !filter.trim()) return "filter required";
  if (typeof rank !== "string" || !rank.trim()) return "rank required";
  if (typeof top !== "number" || top < 1 || top > 100) return "invalid top";
  if (typeof start !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(start))
    return "invalid start";
  if (typeof end !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(end))
    return "invalid end";
  if (typeof benchmark !== "string" || !benchmark.trim())
    return "benchmark required";

  // Very conservative SQL-injection screen: we only accept filters that look
  // like sequences of `column op value` joined by AND/OR and parentheses.
  // Anything else (semicolons, SQL keywords like UNION/INSERT/DROP) is blocked.
  if (/;|--|\/\*|\*\/|\b(UNION|INSERT|UPDATE|DELETE|DROP|ALTER|CREATE)\b/i.test(filter)) {
    return "filter contains disallowed tokens";
  }
  if (!/^\w+\s+(ASC|DESC)$/i.test(rank)) {
    return "rank must be '<column> ASC|DESC'";
  }

  return { filter, rank, top, start, end, benchmark };
}

async function handle(req: Request): Promise<Response> {
  const url = new URL(req.url);

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }

  try {
    // Health
    if (url.pathname === "/api/health") {
      return json({ ok: true });
    }

    // Metrics columns
    if (url.pathname === "/api/metrics/columns" && req.method === "GET") {
      return json(getMetricsColumns());
    }

    // Backtest
    if (url.pathname === "/api/backtest" && req.method === "POST") {
      const body = await req.json().catch(() => null);
      const v = validateBacktestConfig(body);
      if (typeof v === "string") return errJson(v, 400);
      const result = await runBacktest(v);
      return json(result);
    }

    // Current picks for wallet planner
    if (
      url.pathname === "/api/strategy/current-picks" &&
      req.method === "POST"
    ) {
      const body = (await req.json().catch(() => null)) as any;
      if (!body) return errJson("Missing body", 400);
      const { filter, rank, top } = body;
      // Minimal validation (reuse the same guards).
      const v = validateBacktestConfig({
        filter,
        rank,
        top,
        start: "2000-01-01",
        end: "2099-12-31",
        benchmark: "BOVA11.SA",
      });
      if (typeof v === "string") return errJson(v, 400);
      const result = await getCurrentPicks(v.filter, v.rank, v.top);
      return json(result);
    }

    // Live quotes
    if (url.pathname === "/api/prices/quote" && req.method === "POST") {
      const body = (await req.json().catch(() => null)) as any;
      if (!body || !Array.isArray(body.tickers)) {
        return errJson("tickers array required", 400);
      }
      const tickers = body.tickers.filter(
        (t: unknown): t is string => typeof t === "string" && t.length > 0
      );
      const quotes = await getQuotes(tickers);
      return json(quotes);
    }

    // Price history
    if (url.pathname === "/api/prices/history" && req.method === "GET") {
      const ticker = url.searchParams.get("ticker");
      const start = url.searchParams.get("start");
      const end = url.searchParams.get("end");
      if (!ticker || !start || !end) {
        return errJson("ticker, start, end required", 400);
      }
      const result = await getPriceHistory(ticker, start, end);
      return json(result);
    }

    // Ibov benchmark
    if (url.pathname === "/api/benchmark/ibov" && req.method === "GET") {
      const start = url.searchParams.get("start") ?? "2012-01-01";
      const end =
        url.searchParams.get("end") ?? new Date().toISOString().slice(0, 10);
      const result = await getIbovSeries(start, end);
      return json(result);
    }

    return errJson("Not found", 404);
  } catch (err: any) {
    console.error("[server] handler error:", err);
    return errJson(err?.message ?? "Internal error", 500);
  }
}

const server = Bun.serve({
  port: PORT,
  fetch: handle,
});

console.log(`[alphabr-api] listening on http://localhost:${server.port}`);
