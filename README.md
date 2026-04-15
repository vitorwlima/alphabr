# Alpha BR

This project is a tool to have the source of truth about the open-market data of brazilian companies.

## Tech stack

We use Bun and the most modern tooling around it.

## Ideal workflow

1. Download the raw data from the CVM
2. Extract the zip data
3. Parse the data into a structured format by company and time
4. Store the data in a database (can be a local SQLite for now)

## What is still missing for full backtesting

1. Stock price data (critical blocker)
You can't backtest without prices. Right now you have fundamentals but no way to compute:
  - P/L (price / earnings)
  - EV/EBIT (needs market cap = price × shares)
  - Portfolio returns (did the stock go up after buying?)

You'd need historical daily/monthly prices by ticker. Sources: Yahoo Finance, B3 historical data, or a Brazilian market API.

2. Ticker-to-CNPJ mapping
CVM uses CNPJ/CD_CVM. Prices come by ticker (VALE3, PETR4). You need a mapping table to join them.

3. Derived metrics
Compute ratios from what we already have + prices:
  - ROE, ROA, margins, current ratio (fundamentals-only — can do today)
  - P/L, P/VP, EV/EBIT, dividend yield (need prices)

4. Backtest engine
The actual simulation logic:
  - Define strategy: "buy top 10 by ROE where P/L < 15 and liquidity > X"
  - Quarterly rebalancing: on each quarter, re-rank and re-pick
  - Track portfolio value over time
  - Compare against Ibovespa benchmark

My suggested order:
1. Get price data + ticker mapping into the DB
2. Add a computed metrics layer (SQL views or a new script)
3. Build the backtest engine
