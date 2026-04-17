# Alpha BR

Source of truth for open-market data on Brazilian companies, plus a
backtesting engine for quantitative screening strategies. Runs as a CLI or
as a small HTTP API consumed by [`alphabr-web`](../alphabr-web).

## Tech stack

- **Bun** runtime + SQLite (`bun:sqlite`)
- **yahoo-finance2** for prices and live quotes
- Raw CVM fundamentals data (DFP / ITR) as the source of truth

## Data pipeline

1. Download the raw CVM zip archives (DFP + ITR, 2010+).
2. Extract and parse into `company_quarters` keyed by CNPJ + quarter.
3. Download daily price history for every mapped ticker from Yahoo.
4. Compute a `company_metrics` view combining fundamentals + prices: P/L,
   P/VP, EV/EBIT, ROE, ROA, margins, market cap, liquidity, etc.

See `src/backfilling/` for the pipeline code and `src/db/schema.ts` for
the schema.

## Scripts

```bash
bun run backfill       # one-shot: CVM → DB + prices + metrics
bun run backtest       # CLI backtest, see flags below
bun run dev:server     # HTTP server (used by alphabr-web)
```

### CLI backtest

```bash
bun run backtest \
  --filter "ev_ebit > 0 AND ev_ebit < 15 AND roe > 0.15" \
  --rank   "ev_ebit ASC" \
  --top    10 \
  --start  2012-01-01 \
  --end    2024-12-31 \
  --benchmark BOVA11.SA
```

The heavy lifting lives in `src/api/backtest.ts` as a pure function
(`runBacktest(config): Promise<BacktestResult>`). The CLI in
`src/backtest.ts` is a thin wrapper that pretty-prints the result. The
HTTP server reuses the same function, so CLI and API are guaranteed
consistent.

## HTTP API

`bun run dev:server` launches `Bun.serve` on port 8787 (override with
`PORT`). Intended to run behind `alphabr-web`'s Vite proxy — CORS is open
for convenience.

| Method | Path                            | Purpose |
|--------|---------------------------------|---------|
| GET    | `/api/health`                   | liveness ping |
| GET    | `/api/metrics/columns`          | filterable `company_metrics` columns + p5/p95 ranges |
| POST   | `/api/backtest`                 | run a backtest, return `{config, quarters, summary}` |
| POST   | `/api/strategy/current-picks`   | top-N picks against the latest quarter, with live prices |
| POST   | `/api/prices/quote`             | live quotes (60s in-memory cache) |
| GET    | `/api/prices/history`           | daily adjusted-close series (auto-backfilled from Yahoo if missing) |
| GET    | `/api/benchmark/ibov`           | convenience wrapper around `/prices/history` for BOVA11 |

The filter/rank inputs pass through a conservative SQL-injection screen
that blocks semicolons, comments, and DDL keywords — see `validateBacktestConfig`
in `src/server.ts`.

## Key modules

```
src/
├── backfilling/         CVM → DB ingestion + Yahoo price download
├── db/
│   ├── schema.ts        tables: company_quarters, daily_prices, company_metrics, tickers
│   └── connection.ts    opens the SQLite file with WAL + sensible pragmas
├── api/
│   ├── backtest.ts      pure runBacktest() + filter relaxation + summary stats
│   ├── metrics.ts       /api/metrics/columns + /api/strategy/current-picks
│   └── prices.ts        quote cache + history with Yahoo fallback
├── backtest.ts          CLI wrapper (calls runBacktest, prints to stdout)
├── server.ts            HTTP server (Bun.serve, no framework)
└── lib/                 dates, yahoo-finance2 config
```

## Strategy filter relaxation

Strict filters sometimes yield fewer than `--top` stocks on older quarters
(fewer listed companies, worse data coverage). The backtest will
progressively widen every numeric threshold by up to 300% until it has
enough picks, and tag each quarter with the `relaxStep` it needed. The
web UI surfaces this so the user can see when the strategy was
effectively compromised.

## Backtest metrics

The engine uses equal-weight (1/N) portfolios with quarterly rebalancing
at fiscal quarter ends (Mar/Jun/Sep/Dec) + 5 trading days for data
availability lag. Returns use `adjusted_close` so dividends are implicit.

Summary stats returned by `runBacktest`:
- Total return, benchmark total return, CAGR, benchmark CAGR
- Max drawdown
- Sharpe ratio (annualized from quarterly returns)
- Win rate (quarters positive), alpha rate (quarters beating benchmark)
- `R$100` growth trajectory

## Development

```bash
bun install
bun run dev:server   # http://localhost:8787
# In the alphabr-web repo:
cd ../alphabr-web && bun run dev   # http://localhost:5173 (proxies /api to :8787)
```

The SQLite file at `src/data/alphabr.db` is the source of truth. Back it
up before major changes to the backfill pipeline — rebuilding from CVM
zips takes a while.
