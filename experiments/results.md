# Backtest Experiment Results

All strategies filtered with `avg_daily_liquidity > 1e6` (R$1M+/day).


---
## 1. Pure Value (single metric)

### pl_3
- **Return:** 1079.8% | **CAGR:** 20.1% | **Sharpe:** 0.89 | **MaxDD:** 34.9% | **Win:** 64% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 3 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### pl_3_t20
- **Return:** 2347.0% | **CAGR:** 26.7% | **Sharpe:** 1.14 | **MaxDD:** 27.8% | **Win:** 71% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 3 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```

### pl_5
- **Return:** 975.1% | **CAGR:** 19.2% | **Sharpe:** 0.85 | **MaxDD:** 37.6% | **Win:** 64% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### pl_5_t20
- **Return:** 1598.4% | **CAGR:** 23.3% | **Sharpe:** 0.97 | **MaxDD:** 37.9% | **Win:** 69% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```

### pl_8
- **Return:** 975.1% | **CAGR:** 19.2% | **Sharpe:** 0.85 | **MaxDD:** 37.6% | **Win:** 64% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### pl_8_t20
- **Return:** 1520.2% | **CAGR:** 22.9% | **Sharpe:** 0.95 | **MaxDD:** 40.8% | **Win:** 69% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```

### pl_10
- **Return:** 975.1% | **CAGR:** 19.2% | **Sharpe:** 0.85 | **MaxDD:** 37.6% | **Win:** 64% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### pl_10_t20
- **Return:** 1615.7% | **CAGR:** 23.4% | **Sharpe:** 0.96 | **MaxDD:** 40.8% | **Win:** 69% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```

### pl_15
- **Return:** 975.1% | **CAGR:** 19.2% | **Sharpe:** 0.85 | **MaxDD:** 37.6% | **Win:** 64% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 15 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### pl_15_t20
- **Return:** 1621.0% | **CAGR:** 23.5% | **Sharpe:** 0.96 | **MaxDD:** 40.8% | **Win:** 69% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 15 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```

### ev_3
- **Return:** 3387.0% | **CAGR:** 30.1% | **Sharpe:** 1.38 | **MaxDD:** 25.6% | **Win:** 75% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 3 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### ev_3_t20
- **Return:** 3206.0% | **CAGR:** 29.6% | **Sharpe:** 1.43 | **MaxDD:** 27.0% | **Win:** 78% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 3 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### ev_5
- **Return:** 1775.1% | **CAGR:** 24.2% | **Sharpe:** 1.19 | **MaxDD:** 29.5% | **Win:** 76% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 5 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### ev_5_t20
- **Return:** 2423.1% | **CAGR:** 27.0% | **Sharpe:** 1.28 | **MaxDD:** 27.0% | **Win:** 78% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 5 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### ev_8
- **Return:** 1671.3% | **CAGR:** 23.7% | **Sharpe:** 1.12 | **MaxDD:** 35.9% | **Win:** 75% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 8 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### ev_8_t20
- **Return:** 1568.2% | **CAGR:** 23.2% | **Sharpe:** 1.06 | **MaxDD:** 34.9% | **Win:** 75% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 8 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### ev_10
- **Return:** 1671.3% | **CAGR:** 23.7% | **Sharpe:** 1.12 | **MaxDD:** 35.9% | **Win:** 75% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 10 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### ev_10_t20
- **Return:** 1536.8% | **CAGR:** 23.0% | **Sharpe:** 1.05 | **MaxDD:** 36.9% | **Win:** 75% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 10 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### ev_15
- **Return:** 1671.3% | **CAGR:** 23.7% | **Sharpe:** 1.12 | **MaxDD:** 35.9% | **Win:** 75% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 15 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### ev_15_t20
- **Return:** 1445.6% | **CAGR:** 22.5% | **Sharpe:** 1.02 | **MaxDD:** 36.9% | **Win:** 73% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 15 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### pvp_05
- **Return:** 1977.5% | **CAGR:** 25.2% | **Sharpe:** 0.87 | **MaxDD:** 40.9% | **Win:** 62% | **Top:** 10
```
bun backtest --filter "pvp_ratio > 0 AND pvp_ratio < 0.5 AND avg_daily_liquidity > 1e6" --rank "pvp_ratio ASC" --top 10
```

### pvp_05_t20
- **Return:** 1256.9% | **CAGR:** 21.3% | **Sharpe:** 0.81 | **MaxDD:** 37.3% | **Win:** 62% | **Top:** 20
```
bun backtest --filter "pvp_ratio > 0 AND pvp_ratio < 0.5 AND avg_daily_liquidity > 1e6" --rank "pvp_ratio ASC" --top 20
```

### pvp_1
- **Return:** 1977.5% | **CAGR:** 25.2% | **Sharpe:** 0.87 | **MaxDD:** 40.9% | **Win:** 62% | **Top:** 10
```
bun backtest --filter "pvp_ratio > 0 AND pvp_ratio < 1 AND avg_daily_liquidity > 1e6" --rank "pvp_ratio ASC" --top 10
```

### pvp_1_t20
- **Return:** 1319.0% | **CAGR:** 21.7% | **Sharpe:** 0.81 | **MaxDD:** 40.3% | **Win:** 60% | **Top:** 20
```
bun backtest --filter "pvp_ratio > 0 AND pvp_ratio < 1 AND avg_daily_liquidity > 1e6" --rank "pvp_ratio ASC" --top 20
```

### pvp_15
- **Return:** 1977.5% | **CAGR:** 25.2% | **Sharpe:** 0.87 | **MaxDD:** 40.9% | **Win:** 62% | **Top:** 10
```
bun backtest --filter "pvp_ratio > 0 AND pvp_ratio < 1.5 AND avg_daily_liquidity > 1e6" --rank "pvp_ratio ASC" --top 10
```

### pvp_15_t20
- **Return:** 1319.0% | **CAGR:** 21.7% | **Sharpe:** 0.81 | **MaxDD:** 40.3% | **Win:** 60% | **Top:** 20
```
bun backtest --filter "pvp_ratio > 0 AND pvp_ratio < 1.5 AND avg_daily_liquidity > 1e6" --rank "pvp_ratio ASC" --top 20
```

### pvp_2
- **Return:** 1977.5% | **CAGR:** 25.2% | **Sharpe:** 0.87 | **MaxDD:** 40.9% | **Win:** 62% | **Top:** 10
```
bun backtest --filter "pvp_ratio > 0 AND pvp_ratio < 2 AND avg_daily_liquidity > 1e6" --rank "pvp_ratio ASC" --top 10
```

### pvp_2_t20
- **Return:** 1319.0% | **CAGR:** 21.7% | **Sharpe:** 0.81 | **MaxDD:** 40.3% | **Win:** 60% | **Top:** 20
```
bun backtest --filter "pvp_ratio > 0 AND pvp_ratio < 2 AND avg_daily_liquidity > 1e6" --rank "pvp_ratio ASC" --top 20
```

### ps_05
- **Return:** 977.9% | **CAGR:** 19.3% | **Sharpe:** 0.71 | **MaxDD:** 43.0% | **Win:** 56% | **Top:** 10
```
bun backtest --filter "price_to_sales > 0 AND price_to_sales < 0.5 AND avg_daily_liquidity > 1e6" --rank "price_to_sales ASC" --top 10
```

### ps_05_t20
- **Return:** 1086.1% | **CAGR:** 20.1% | **Sharpe:** 0.75 | **MaxDD:** 44.2% | **Win:** 58% | **Top:** 20
```
bun backtest --filter "price_to_sales > 0 AND price_to_sales < 0.5 AND avg_daily_liquidity > 1e6" --rank "price_to_sales ASC" --top 20
```

### ps_1
- **Return:** 977.9% | **CAGR:** 19.3% | **Sharpe:** 0.71 | **MaxDD:** 43.0% | **Win:** 56% | **Top:** 10
```
bun backtest --filter "price_to_sales > 0 AND price_to_sales < 1 AND avg_daily_liquidity > 1e6" --rank "price_to_sales ASC" --top 10
```

### ps_1_t20
- **Return:** 1065.7% | **CAGR:** 20.0% | **Sharpe:** 0.74 | **MaxDD:** 44.2% | **Win:** 58% | **Top:** 20
```
bun backtest --filter "price_to_sales > 0 AND price_to_sales < 1 AND avg_daily_liquidity > 1e6" --rank "price_to_sales ASC" --top 20
```

### ps_2
- **Return:** 977.9% | **CAGR:** 19.3% | **Sharpe:** 0.71 | **MaxDD:** 43.0% | **Win:** 56% | **Top:** 10
```
bun backtest --filter "price_to_sales > 0 AND price_to_sales < 2 AND avg_daily_liquidity > 1e6" --rank "price_to_sales ASC" --top 10
```

### ps_2_t20
- **Return:** 1065.7% | **CAGR:** 20.0% | **Sharpe:** 0.74 | **MaxDD:** 44.2% | **Win:** 58% | **Top:** 20
```
bun backtest --filter "price_to_sales > 0 AND price_to_sales < 2 AND avg_daily_liquidity > 1e6" --rank "price_to_sales ASC" --top 20
```


---
## 2. Combined Value (two value metrics)

### pl5_ev5
- **Return:** 2724.8% | **CAGR:** 28.1% | **Sharpe:** 1.29 | **MaxDD:** 29.5% | **Win:** 76% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### pl5_ev5_t20
- **Return:** 2563.3% | **CAGR:** 27.5% | **Sharpe:** 1.29 | **MaxDD:** 27.0% | **Win:** 78% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### pl5_ev5_rankpl
- **Return:** 2271.5% | **CAGR:** 26.4% | **Sharpe:** 1.23 | **MaxDD:** 29.5% | **Win:** 76% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### pl5_ev5_rankpl_t20
- **Return:** 2453.2% | **CAGR:** 27.1% | **Sharpe:** 1.32 | **MaxDD:** 24.6% | **Win:** 75% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```

### pl8_ev8
- **Return:** 2131.8% | **CAGR:** 25.9% | **Sharpe:** 1.21 | **MaxDD:** 35.9% | **Win:** 75% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### pl8_ev8_t20
- **Return:** 1496.1% | **CAGR:** 22.8% | **Sharpe:** 1.06 | **MaxDD:** 33.8% | **Win:** 73% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### pl10_ev10
- **Return:** 2009.2% | **CAGR:** 25.3% | **Sharpe:** 1.19 | **MaxDD:** 35.9% | **Win:** 75% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND ev_ebit > 0 AND ev_ebit < 10 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### pl10_ev10_t20
- **Return:** 1387.9% | **CAGR:** 22.1% | **Sharpe:** 1.01 | **MaxDD:** 36.0% | **Win:** 73% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND ev_ebit > 0 AND ev_ebit < 10 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### pl3_ev3
- **Return:** 2995.9% | **CAGR:** 29.0% | **Sharpe:** 1.33 | **MaxDD:** 25.6% | **Win:** 73% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 3 AND ev_ebit > 0 AND ev_ebit < 3 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### pl3_ev3_t20
- **Return:** 2978.0% | **CAGR:** 28.9% | **Sharpe:** 1.38 | **MaxDD:** 27.0% | **Win:** 78% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 3 AND ev_ebit > 0 AND ev_ebit < 3 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### pl5_pvp1
- **Return:** 1398.4% | **CAGR:** 22.2% | **Sharpe:** 0.96 | **MaxDD:** 37.6% | **Win:** 62% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND pvp_ratio > 0 AND pvp_ratio < 1 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### pl5_pvp1_t20
- **Return:** 1657.5% | **CAGR:** 23.7% | **Sharpe:** 0.98 | **MaxDD:** 38.6% | **Win:** 67% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND pvp_ratio > 0 AND pvp_ratio < 1 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```

### pl8_pvp15
- **Return:** 1279.0% | **CAGR:** 21.5% | **Sharpe:** 0.95 | **MaxDD:** 37.6% | **Win:** 64% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND pvp_ratio > 0 AND pvp_ratio < 1.5 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### pl8_pvp15_t20
- **Return:** 1847.1% | **CAGR:** 24.6% | **Sharpe:** 1.00 | **MaxDD:** 42.2% | **Win:** 65% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND pvp_ratio > 0 AND pvp_ratio < 1.5 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```

### ev5_pvp1
- **Return:** 2028.6% | **CAGR:** 25.4% | **Sharpe:** 1.22 | **MaxDD:** 29.5% | **Win:** 78% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 5 AND pvp_ratio > 0 AND pvp_ratio < 1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### ev5_pvp1_t20
- **Return:** 2610.3% | **CAGR:** 27.7% | **Sharpe:** 1.32 | **MaxDD:** 24.7% | **Win:** 78% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 5 AND pvp_ratio > 0 AND pvp_ratio < 1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### ev8_pvp15
- **Return:** 2153.9% | **CAGR:** 26.0% | **Sharpe:** 1.17 | **MaxDD:** 36.8% | **Win:** 76% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 8 AND pvp_ratio > 0 AND pvp_ratio < 1.5 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### ev8_pvp15_t20
- **Return:** 1653.3% | **CAGR:** 23.6% | **Sharpe:** 1.09 | **MaxDD:** 33.2% | **Win:** 73% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 8 AND pvp_ratio > 0 AND pvp_ratio < 1.5 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### pl5_ps1
- **Return:** 1353.1% | **CAGR:** 21.9% | **Sharpe:** 0.95 | **MaxDD:** 37.6% | **Win:** 67% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND price_to_sales > 0 AND price_to_sales < 1 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### pl5_ps1_t20
- **Return:** 1537.4% | **CAGR:** 23.0% | **Sharpe:** 0.96 | **MaxDD:** 39.6% | **Win:** 67% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND price_to_sales > 0 AND price_to_sales < 1 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```

### ev5_ps1
- **Return:** 2679.6% | **CAGR:** 27.9% | **Sharpe:** 1.22 | **MaxDD:** 32.8% | **Win:** 78% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 5 AND price_to_sales > 0 AND price_to_sales < 1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### ev5_ps1_t20
- **Return:** 2302.7% | **CAGR:** 26.6% | **Sharpe:** 1.26 | **MaxDD:** 27.5% | **Win:** 76% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 5 AND price_to_sales > 0 AND price_to_sales < 1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```


---
## 3. Value + Quality (margins)

### pl5_ev5_ml5
- **Return:** 2349.0% | **CAGR:** 26.7% | **Sharpe:** 1.22 | **MaxDD:** 29.5% | **Win:** 75% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND margem_liquida > 0.05 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### pl5_ev5_ml5_t20
- **Return:** 2475.1% | **CAGR:** 27.2% | **Sharpe:** 1.26 | **MaxDD:** 27.0% | **Win:** 76% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND margem_liquida > 0.05 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### pl5_ev5_ml10
- **Return:** 1836.6% | **CAGR:** 24.5% | **Sharpe:** 1.12 | **MaxDD:** 35.9% | **Win:** 73% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND margem_liquida > 0.1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### pl5_ev5_ml10_t20
- **Return:** 2477.1% | **CAGR:** 27.2% | **Sharpe:** 1.29 | **MaxDD:** 27.0% | **Win:** 75% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND margem_liquida > 0.1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### pl5_ev5_ml10_rankpl
- **Return:** 1415.9% | **CAGR:** 22.3% | **Sharpe:** 1.05 | **MaxDD:** 36.8% | **Win:** 71% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND margem_liquida > 0.1 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### pl5_ev5_ml10_rankpl_t20
- **Return:** 2792.8% | **CAGR:** 28.3% | **Sharpe:** 1.33 | **MaxDD:** 24.6% | **Win:** 73% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND margem_liquida > 0.1 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```

### pl5_ev5_ml15
- **Return:** 1971.0% | **CAGR:** 25.2% | **Sharpe:** 1.15 | **MaxDD:** 35.9% | **Win:** 76% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND margem_liquida > 0.15 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### pl5_ev5_ml15_t20
- **Return:** 2258.3% | **CAGR:** 26.4% | **Sharpe:** 1.28 | **MaxDD:** 27.0% | **Win:** 75% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND margem_liquida > 0.15 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### pl5_ev5_ml20
- **Return:** 2087.2% | **CAGR:** 25.7% | **Sharpe:** 1.08 | **MaxDD:** 35.9% | **Win:** 73% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND margem_liquida > 0.2 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### pl5_ev5_ml20_t20
- **Return:** 2195.1% | **CAGR:** 26.1% | **Sharpe:** 1.24 | **MaxDD:** 27.0% | **Win:** 78% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND margem_liquida > 0.2 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### pl5_ev8_ml10_rankpl
- **Return:** 1923.5% | **CAGR:** 25.0% | **Sharpe:** 1.16 | **MaxDD:** 37.5% | **Win:** 76% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 8 AND margem_liquida > 0.1 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### pl5_ev8_ml10_rankpl_t20
- **Return:** 2076.8% | **CAGR:** 25.6% | **Sharpe:** 1.21 | **MaxDD:** 25.6% | **Win:** 67% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 8 AND margem_liquida > 0.1 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```

### pl8_ev8_ml10
- **Return:** 2355.9% | **CAGR:** 26.8% | **Sharpe:** 1.20 | **MaxDD:** 35.9% | **Win:** 78% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND margem_liquida > 0.1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### pl8_ev8_ml10_t20
- **Return:** 1064.6% | **CAGR:** 19.9% | **Sharpe:** 0.94 | **MaxDD:** 36.0% | **Win:** 71% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND margem_liquida > 0.1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### pl10_ev10_ml10
- **Return:** 2152.5% | **CAGR:** 25.9% | **Sharpe:** 1.16 | **MaxDD:** 35.9% | **Win:** 76% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND ev_ebit > 0 AND ev_ebit < 10 AND margem_liquida > 0.1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### pl10_ev10_ml10_t20
- **Return:** 1046.8% | **CAGR:** 19.8% | **Sharpe:** 0.94 | **MaxDD:** 36.5% | **Win:** 67% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND ev_ebit > 0 AND ev_ebit < 10 AND margem_liquida > 0.1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### pl8_ev8_mb30
- **Return:** 2177.3% | **CAGR:** 26.1% | **Sharpe:** 1.21 | **MaxDD:** 38.4% | **Win:** 75% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND margem_bruta > 0.3 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### pl8_ev8_mb30_t20
- **Return:** 1169.9% | **CAGR:** 20.7% | **Sharpe:** 0.98 | **MaxDD:** 32.7% | **Win:** 71% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND margem_bruta > 0.3 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### pl8_ev8_mb40
- **Return:** 2028.9% | **CAGR:** 25.4% | **Sharpe:** 1.14 | **MaxDD:** 31.9% | **Win:** 73% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND margem_bruta > 0.4 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### pl8_ev8_mb40_t20
- **Return:** 1204.1% | **CAGR:** 21.0% | **Sharpe:** 0.99 | **MaxDD:** 32.7% | **Win:** 71% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND margem_bruta > 0.4 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### ev8_mb30
- **Return:** 2016.3% | **CAGR:** 25.4% | **Sharpe:** 1.18 | **MaxDD:** 38.4% | **Win:** 75% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 8 AND margem_bruta > 0.3 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### ev8_mb30_t20
- **Return:** 1406.2% | **CAGR:** 22.2% | **Sharpe:** 1.02 | **MaxDD:** 33.5% | **Win:** 75% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 8 AND margem_bruta > 0.3 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### pl8_ev8_me15
- **Return:** 2690.8% | **CAGR:** 28.0% | **Sharpe:** 1.24 | **MaxDD:** 35.9% | **Win:** 78% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND margem_ebit > 0.15 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### pl8_ev8_me15_t20
- **Return:** 1336.4% | **CAGR:** 21.8% | **Sharpe:** 1.00 | **MaxDD:** 36.0% | **Win:** 71% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND margem_ebit > 0.15 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### pl10_ev10_me20
- **Return:** 1659.4% | **CAGR:** 23.7% | **Sharpe:** 1.05 | **MaxDD:** 39.6% | **Win:** 75% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND ev_ebit > 0 AND ev_ebit < 10 AND margem_ebit > 0.2 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### pl10_ev10_me20_t20
- **Return:** 896.8% | **CAGR:** 18.6% | **Sharpe:** 0.89 | **MaxDD:** 36.0% | **Win:** 69% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND ev_ebit > 0 AND ev_ebit < 10 AND margem_ebit > 0.2 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### ev5_me15
- **Return:** 2320.6% | **CAGR:** 26.6% | **Sharpe:** 1.17 | **MaxDD:** 35.9% | **Win:** 75% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 5 AND margem_ebit > 0.15 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### ev5_me15_t20
- **Return:** 2435.9% | **CAGR:** 27.1% | **Sharpe:** 1.24 | **MaxDD:** 27.0% | **Win:** 76% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 5 AND margem_ebit > 0.15 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### ev8_me20
- **Return:** 1454.2% | **CAGR:** 22.5% | **Sharpe:** 1.02 | **MaxDD:** 39.6% | **Win:** 73% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 8 AND margem_ebit > 0.2 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### ev8_me20_t20
- **Return:** 998.7% | **CAGR:** 19.4% | **Sharpe:** 0.92 | **MaxDD:** 36.9% | **Win:** 73% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 8 AND margem_ebit > 0.2 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### ps1_ml10
- **Return:** 1713.3% | **CAGR:** 23.9% | **Sharpe:** 0.97 | **MaxDD:** 40.0% | **Win:** 67% | **Top:** 10
```
bun backtest --filter "price_to_sales > 0 AND price_to_sales < 1 AND margem_liquida > 0.1 AND avg_daily_liquidity > 1e6" --rank "price_to_sales ASC" --top 10
```

### ps1_ml10_t20
- **Return:** 1374.7% | **CAGR:** 22.1% | **Sharpe:** 0.95 | **MaxDD:** 40.3% | **Win:** 64% | **Top:** 20
```
bun backtest --filter "price_to_sales > 0 AND price_to_sales < 1 AND margem_liquida > 0.1 AND avg_daily_liquidity > 1e6" --rank "price_to_sales ASC" --top 20
```

### ps1_ml15
- **Return:** 1807.0% | **CAGR:** 24.4% | **Sharpe:** 1.02 | **MaxDD:** 43.0% | **Win:** 71% | **Top:** 10
```
bun backtest --filter "price_to_sales > 0 AND price_to_sales < 1 AND margem_liquida > 0.15 AND avg_daily_liquidity > 1e6" --rank "price_to_sales ASC" --top 10
```

### ps1_ml15_t20
- **Return:** 1349.0% | **CAGR:** 21.9% | **Sharpe:** 0.97 | **MaxDD:** 40.3% | **Win:** 67% | **Top:** 20
```
bun backtest --filter "price_to_sales > 0 AND price_to_sales < 1 AND margem_liquida > 0.15 AND avg_daily_liquidity > 1e6" --rank "price_to_sales ASC" --top 20
```

### ps05_ml10
- **Return:** 1983.7% | **CAGR:** 25.2% | **Sharpe:** 1.02 | **MaxDD:** 38.5% | **Win:** 65% | **Top:** 10
```
bun backtest --filter "price_to_sales > 0 AND price_to_sales < 0.5 AND margem_liquida > 0.1 AND avg_daily_liquidity > 1e6" --rank "price_to_sales ASC" --top 10
```

### ps05_ml10_t20
- **Return:** 1056.2% | **CAGR:** 19.9% | **Sharpe:** 0.84 | **MaxDD:** 40.9% | **Win:** 67% | **Top:** 20
```
bun backtest --filter "price_to_sales > 0 AND price_to_sales < 0.5 AND margem_liquida > 0.1 AND avg_daily_liquidity > 1e6" --rank "price_to_sales ASC" --top 20
```

### ps2_ml10
- **Return:** 1897.4% | **CAGR:** 24.8% | **Sharpe:** 1.01 | **MaxDD:** 40.0% | **Win:** 69% | **Top:** 10
```
bun backtest --filter "price_to_sales > 0 AND price_to_sales < 2 AND margem_liquida > 0.1 AND avg_daily_liquidity > 1e6" --rank "price_to_sales ASC" --top 10
```

### ps2_ml10_t20
- **Return:** 1580.8% | **CAGR:** 23.2% | **Sharpe:** 1.00 | **MaxDD:** 40.5% | **Win:** 69% | **Top:** 20
```
bun backtest --filter "price_to_sales > 0 AND price_to_sales < 2 AND margem_liquida > 0.1 AND avg_daily_liquidity > 1e6" --rank "price_to_sales ASC" --top 20
```

### ps1_mb30
- **Return:** 893.1% | **CAGR:** 18.5% | **Sharpe:** 0.69 | **MaxDD:** 52.4% | **Win:** 64% | **Top:** 10
```
bun backtest --filter "price_to_sales > 0 AND price_to_sales < 1 AND margem_bruta > 0.3 AND avg_daily_liquidity > 1e6" --rank "price_to_sales ASC" --top 10
```

### ps1_mb30_t20
- **Return:** 885.2% | **CAGR:** 18.5% | **Sharpe:** 0.72 | **MaxDD:** 47.9% | **Win:** 62% | **Top:** 20
```
bun backtest --filter "price_to_sales > 0 AND price_to_sales < 1 AND margem_bruta > 0.3 AND avg_daily_liquidity > 1e6" --rank "price_to_sales ASC" --top 20
```

### ps1_me15
- **Return:** 2034.5% | **CAGR:** 25.4% | **Sharpe:** 0.93 | **MaxDD:** 37.1% | **Win:** 69% | **Top:** 10
```
bun backtest --filter "price_to_sales > 0 AND price_to_sales < 1 AND margem_ebit > 0.15 AND avg_daily_liquidity > 1e6" --rank "price_to_sales ASC" --top 10
```

### ps1_me15_t20
- **Return:** 1563.0% | **CAGR:** 23.2% | **Sharpe:** 0.93 | **MaxDD:** 41.3% | **Win:** 67% | **Top:** 20
```
bun backtest --filter "price_to_sales > 0 AND price_to_sales < 1 AND margem_ebit > 0.15 AND avg_daily_liquidity > 1e6" --rank "price_to_sales ASC" --top 20
```


---
## 4. Value + ROE/ROA (Greenblatt style)

### ev10_roe10
- **Return:** 2357.8% | **CAGR:** 26.8% | **Sharpe:** 1.16 | **MaxDD:** 36.9% | **Win:** 73% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 10 AND roe > 0.1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### ev10_roe10_t20
- **Return:** 1538.0% | **CAGR:** 23.0% | **Sharpe:** 1.04 | **MaxDD:** 35.1% | **Win:** 73% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 10 AND roe > 0.1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### ev15_roe10
- **Return:** 2259.9% | **CAGR:** 26.4% | **Sharpe:** 1.15 | **MaxDD:** 36.9% | **Win:** 73% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 15 AND roe > 0.1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### ev15_roe10_t20
- **Return:** 1288.4% | **CAGR:** 21.5% | **Sharpe:** 1.00 | **MaxDD:** 34.8% | **Win:** 73% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 15 AND roe > 0.1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### ev8_roe15
- **Return:** 2051.5% | **CAGR:** 25.5% | **Sharpe:** 1.13 | **MaxDD:** 41.9% | **Win:** 71% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 8 AND roe > 0.15 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### ev8_roe15_t20
- **Return:** 1347.1% | **CAGR:** 21.9% | **Sharpe:** 1.01 | **MaxDD:** 32.8% | **Win:** 73% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 8 AND roe > 0.15 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### ev5_roe20
- **Return:** 2846.4% | **CAGR:** 28.5% | **Sharpe:** 1.32 | **MaxDD:** 29.5% | **Win:** 78% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 5 AND roe > 0.2 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### ev5_roe20_t20
- **Return:** 2620.2% | **CAGR:** 27.7% | **Sharpe:** 1.30 | **MaxDD:** 27.0% | **Win:** 78% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 5 AND roe > 0.2 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### ev10_roe15_rankroe
- **Return:** 1336.1% | **CAGR:** 21.8% | **Sharpe:** 0.97 | **MaxDD:** 41.9% | **Win:** 75% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 10 AND roe > 0.15 AND avg_daily_liquidity > 1e6" --rank "roe DESC" --top 10
```

### ev10_roe15_rankroe_t20
- **Return:** 1227.8% | **CAGR:** 21.1% | **Sharpe:** 1.01 | **MaxDD:** 33.5% | **Win:** 69% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 10 AND roe > 0.15 AND avg_daily_liquidity > 1e6" --rank "roe DESC" --top 20
```

### pl10_roe10
- **Return:** 1800.5% | **CAGR:** 24.4% | **Sharpe:** 0.99 | **MaxDD:** 38.9% | **Win:** 62% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND roe > 0.1 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### pl10_roe10_t20
- **Return:** 1625.7% | **CAGR:** 23.5% | **Sharpe:** 1.03 | **MaxDD:** 38.7% | **Win:** 71% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND roe > 0.1 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```

### pl10_roe15
- **Return:** 1811.5% | **CAGR:** 24.4% | **Sharpe:** 1.03 | **MaxDD:** 45.4% | **Win:** 78% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND roe > 0.15 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### pl10_roe15_t20
- **Return:** 1361.1% | **CAGR:** 22.0% | **Sharpe:** 1.02 | **MaxDD:** 38.7% | **Win:** 71% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND roe > 0.15 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```

### pl5_roe15
- **Return:** 1634.4% | **CAGR:** 23.5% | **Sharpe:** 1.03 | **MaxDD:** 43.7% | **Win:** 76% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND roe > 0.15 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### pl5_roe15_t20
- **Return:** 1720.9% | **CAGR:** 24.0% | **Sharpe:** 1.04 | **MaxDD:** 37.1% | **Win:** 73% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND roe > 0.15 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```

### pl15_roe20
- **Return:** 1482.0% | **CAGR:** 22.7% | **Sharpe:** 1.00 | **MaxDD:** 43.3% | **Win:** 75% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 15 AND roe > 0.2 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### pl15_roe20_t20
- **Return:** 969.5% | **CAGR:** 19.2% | **Sharpe:** 0.93 | **MaxDD:** 38.3% | **Win:** 71% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 15 AND roe > 0.2 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```

### pl15_roe25
- **Return:** 1307.6% | **CAGR:** 21.6% | **Sharpe:** 1.00 | **MaxDD:** 43.3% | **Win:** 73% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 15 AND roe > 0.25 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### pl15_roe25_t20
- **Return:** 1007.6% | **CAGR:** 19.5% | **Sharpe:** 0.93 | **MaxDD:** 37.0% | **Win:** 73% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 15 AND roe > 0.25 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```

### ev10_roa10
- **Return:** 1737.0% | **CAGR:** 24.1% | **Sharpe:** 1.12 | **MaxDD:** 38.0% | **Win:** 78% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 10 AND roa > 0.1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### ev10_roa10_t20
- **Return:** 980.2% | **CAGR:** 19.3% | **Sharpe:** 0.94 | **MaxDD:** 32.8% | **Win:** 73% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 10 AND roa > 0.1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### pl10_roa10
- **Return:** 997.8% | **CAGR:** 19.4% | **Sharpe:** 0.92 | **MaxDD:** 38.6% | **Win:** 73% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND roa > 0.1 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### pl10_roa10_t20
- **Return:** 769.6% | **CAGR:** 17.4% | **Sharpe:** 0.87 | **MaxDD:** 36.8% | **Win:** 71% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND roa > 0.1 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```

### ev8_roa15
- **Return:** 1433.9% | **CAGR:** 22.4% | **Sharpe:** 1.03 | **MaxDD:** 38.9% | **Win:** 76% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 8 AND roa > 0.15 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### ev8_roa15_t20
- **Return:** 1469.8% | **CAGR:** 22.6% | **Sharpe:** 1.07 | **MaxDD:** 32.8% | **Win:** 73% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 8 AND roa > 0.15 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### pvp15_roe10
- **Return:** 1880.5% | **CAGR:** 24.8% | **Sharpe:** 1.02 | **MaxDD:** 34.4% | **Win:** 71% | **Top:** 10
```
bun backtest --filter "pvp_ratio > 0 AND pvp_ratio < 1.5 AND roe > 0.1 AND avg_daily_liquidity > 1e6" --rank "pvp_ratio ASC" --top 10
```

### pvp15_roe10_t20
- **Return:** 1464.9% | **CAGR:** 22.6% | **Sharpe:** 0.94 | **MaxDD:** 39.2% | **Win:** 69% | **Top:** 20
```
bun backtest --filter "pvp_ratio > 0 AND pvp_ratio < 1.5 AND roe > 0.1 AND avg_daily_liquidity > 1e6" --rank "pvp_ratio ASC" --top 20
```

### pvp1_roe15
- **Return:** 1167.4% | **CAGR:** 20.7% | **Sharpe:** 0.91 | **MaxDD:** 41.0% | **Win:** 73% | **Top:** 10
```
bun backtest --filter "pvp_ratio > 0 AND pvp_ratio < 1 AND roe > 0.15 AND avg_daily_liquidity > 1e6" --rank "pvp_ratio ASC" --top 10
```

### pvp1_roe15_t20
- **Return:** 1615.1% | **CAGR:** 23.4% | **Sharpe:** 1.00 | **MaxDD:** 35.9% | **Win:** 67% | **Top:** 20
```
bun backtest --filter "pvp_ratio > 0 AND pvp_ratio < 1 AND roe > 0.15 AND avg_daily_liquidity > 1e6" --rank "pvp_ratio ASC" --top 20
```

### pvp2_roe20
- **Return:** 1323.6% | **CAGR:** 21.7% | **Sharpe:** 0.95 | **MaxDD:** 45.2% | **Win:** 75% | **Top:** 10
```
bun backtest --filter "pvp_ratio > 0 AND pvp_ratio < 2 AND roe > 0.2 AND avg_daily_liquidity > 1e6" --rank "pvp_ratio ASC" --top 10
```

### pvp2_roe20_t20
- **Return:** 1233.4% | **CAGR:** 21.2% | **Sharpe:** 1.00 | **MaxDD:** 34.2% | **Win:** 69% | **Top:** 20
```
bun backtest --filter "pvp_ratio > 0 AND pvp_ratio < 2 AND roe > 0.2 AND avg_daily_liquidity > 1e6" --rank "pvp_ratio ASC" --top 20
```


---
## 5. Value + Balance Sheet (debt, liquidity ratio)

### pl10_lowdebt2
- **Return:** 1441.9% | **CAGR:** 22.5% | **Sharpe:** 1.04 | **MaxDD:** 27.7% | **Win:** 71% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND divida_liquida_ebit > 0 AND divida_liquida_ebit < 2 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### pl10_lowdebt2_t20
- **Return:** 1285.5% | **CAGR:** 21.5% | **Sharpe:** 1.06 | **MaxDD:** 25.7% | **Win:** 69% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND divida_liquida_ebit > 0 AND divida_liquida_ebit < 2 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```

### ev8_lowdebt2
- **Return:** 923.8% | **CAGR:** 18.8% | **Sharpe:** 0.94 | **MaxDD:** 30.6% | **Win:** 67% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 8 AND divida_liquida_ebit > 0 AND divida_liquida_ebit < 2 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### ev8_lowdebt2_t20
- **Return:** 1183.6% | **CAGR:** 20.8% | **Sharpe:** 1.02 | **MaxDD:** 27.2% | **Win:** 71% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 8 AND divida_liquida_ebit > 0 AND divida_liquida_ebit < 2 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### ev8_lowdebt1
- **Return:** 909.6% | **CAGR:** 18.7% | **Sharpe:** 0.93 | **MaxDD:** 37.2% | **Win:** 69% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 8 AND divida_liquida_ebit > 0 AND divida_liquida_ebit < 1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### ev8_lowdebt1_t20
- **Return:** 1165.7% | **CAGR:** 20.7% | **Sharpe:** 1.03 | **MaxDD:** 30.0% | **Win:** 69% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 8 AND divida_liquida_ebit > 0 AND divida_liquida_ebit < 1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### pl10_nodebt
- **Return:** 1645.6% | **CAGR:** 23.6% | **Sharpe:** 0.88 | **MaxDD:** 31.3% | **Win:** 66% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND divida_liquida_ebit < 0 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### pl10_nodebt_t20
- **Return:** 1645.6% | **CAGR:** 23.6% | **Sharpe:** 0.88 | **MaxDD:** 31.3% | **Win:** 66% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND divida_liquida_ebit < 0 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```

### ev10_nodebt
- **Return:** 524.4% | **CAGR:** 14.5% | **Sharpe:** 0.72 | **MaxDD:** 52.1% | **Win:** 70% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 10 AND divida_liquida_ebit < 0 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### ev10_nodebt_t20
- **Return:** 524.4% | **CAGR:** 14.5% | **Sharpe:** 0.72 | **MaxDD:** 52.1% | **Win:** 70% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 10 AND divida_liquida_ebit < 0 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### pl8_nodebt_roe10
- **Return:** 1243.1% | **CAGR:** 21.2% | **Sharpe:** 0.83 | **MaxDD:** 31.3% | **Win:** 64% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND divida_liquida_ebit < 0 AND roe > 0.1 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### pl8_nodebt_roe10_t20
- **Return:** 1243.1% | **CAGR:** 21.2% | **Sharpe:** 0.83 | **MaxDD:** 31.3% | **Win:** 64% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND divida_liquida_ebit < 0 AND roe > 0.1 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```

### pl10_liq15
- **Return:** 1391.4% | **CAGR:** 22.2% | **Sharpe:** 0.95 | **MaxDD:** 36.9% | **Win:** 67% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND liquidez_corrente > 1.5 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### pl10_liq15_t20
- **Return:** 1303.1% | **CAGR:** 21.6% | **Sharpe:** 0.92 | **MaxDD:** 38.7% | **Win:** 64% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND liquidez_corrente > 1.5 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```

### pl10_liq2
- **Return:** 1151.4% | **CAGR:** 20.6% | **Sharpe:** 0.86 | **MaxDD:** 38.0% | **Win:** 60% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND liquidez_corrente > 2 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### pl10_liq2_t20
- **Return:** 1104.6% | **CAGR:** 20.2% | **Sharpe:** 0.86 | **MaxDD:** 35.8% | **Win:** 67% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND liquidez_corrente > 2 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```

### ev8_liq15
- **Return:** 1203.7% | **CAGR:** 20.9% | **Sharpe:** 0.97 | **MaxDD:** 35.9% | **Win:** 73% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 8 AND liquidez_corrente > 1.5 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### ev8_liq15_t20
- **Return:** 1277.4% | **CAGR:** 21.4% | **Sharpe:** 1.01 | **MaxDD:** 34.9% | **Win:** 73% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 8 AND liquidez_corrente > 1.5 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### ev8_liq2
- **Return:** 1390.7% | **CAGR:** 22.2% | **Sharpe:** 0.99 | **MaxDD:** 41.1% | **Win:** 75% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 8 AND liquidez_corrente > 2 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### ev8_liq2_t20
- **Return:** 1090.5% | **CAGR:** 20.1% | **Sharpe:** 0.96 | **MaxDD:** 34.9% | **Win:** 75% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 8 AND liquidez_corrente > 2 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### pl8_ev8_cf
- **Return:** 2235.5% | **CAGR:** 26.3% | **Sharpe:** 1.23 | **MaxDD:** 35.9% | **Win:** 75% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND fluxo_caixa_op_ttm > 0 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### pl8_ev8_cf_t20
- **Return:** 1242.5% | **CAGR:** 21.2% | **Sharpe:** 1.01 | **MaxDD:** 33.8% | **Win:** 67% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND fluxo_caixa_op_ttm > 0 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### ev10_cf
- **Return:** 2029.1% | **CAGR:** 25.4% | **Sharpe:** 1.20 | **MaxDD:** 35.9% | **Win:** 75% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 10 AND fluxo_caixa_op_ttm > 0 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### ev10_cf_t20
- **Return:** 1340.6% | **CAGR:** 21.8% | **Sharpe:** 1.03 | **MaxDD:** 36.9% | **Win:** 71% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 10 AND fluxo_caixa_op_ttm > 0 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```


---
## 6. Multi-factor (3+ filters)

### mf_val_qual1
- **Return:** 1984.5% | **CAGR:** 25.2% | **Sharpe:** 1.12 | **MaxDD:** 41.9% | **Win:** 75% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND roe > 0.15 AND margem_liquida > 0.1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### mf_val_qual1_t20
- **Return:** 1134.3% | **CAGR:** 20.5% | **Sharpe:** 0.97 | **MaxDD:** 33.8% | **Win:** 71% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND roe > 0.15 AND margem_liquida > 0.1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### mf_val_qual2
- **Return:** 1985.2% | **CAGR:** 25.2% | **Sharpe:** 1.12 | **MaxDD:** 36.9% | **Win:** 73% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND ev_ebit > 0 AND ev_ebit < 10 AND roe > 0.1 AND margem_liquida > 0.05 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### mf_val_qual2_t20
- **Return:** 1359.0% | **CAGR:** 22.0% | **Sharpe:** 1.03 | **MaxDD:** 32.7% | **Win:** 71% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND ev_ebit > 0 AND ev_ebit < 10 AND roe > 0.1 AND margem_liquida > 0.05 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### mf_val_qual_liq
- **Return:** 2228.5% | **CAGR:** 26.3% | **Sharpe:** 1.19 | **MaxDD:** 35.9% | **Win:** 76% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND roe > 0.1 AND margem_liquida > 0.1 AND liquidez_corrente > 1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### mf_val_qual_liq_t20
- **Return:** 2359.8% | **CAGR:** 26.8% | **Sharpe:** 1.29 | **MaxDD:** 27.0% | **Win:** 75% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND roe > 0.1 AND margem_liquida > 0.1 AND liquidez_corrente > 1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### mf_val_qual_liq_pl
- **Return:** 1611.6% | **CAGR:** 23.4% | **Sharpe:** 1.09 | **MaxDD:** 36.8% | **Win:** 75% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND roe > 0.1 AND margem_liquida > 0.1 AND liquidez_corrente > 1 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### mf_val_qual_liq_pl_t20
- **Return:** 2623.2% | **CAGR:** 27.7% | **Sharpe:** 1.33 | **MaxDD:** 25.7% | **Win:** 73% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND roe > 0.1 AND margem_liquida > 0.1 AND liquidez_corrente > 1 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```

### mf_kitchen_sink
- **Return:** 1551.1% | **CAGR:** 23.1% | **Sharpe:** 1.06 | **MaxDD:** 39.6% | **Win:** 76% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND roe > 0.1 AND margem_liquida > 0.05 AND liquidez_corrente > 1 AND divida_liquida_ebit < 3 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### mf_kitchen_sink_t20
- **Return:** 1507.0% | **CAGR:** 22.8% | **Sharpe:** 1.16 | **MaxDD:** 27.6% | **Win:** 78% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND roe > 0.1 AND margem_liquida > 0.05 AND liquidez_corrente > 1 AND divida_liquida_ebit < 3 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### mf_val_qual_pvp
- **Return:** 1603.0% | **CAGR:** 23.4% | **Sharpe:** 1.08 | **MaxDD:** 36.8% | **Win:** 75% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND roe > 0.1 AND margem_liquida > 0.1 AND pvp_ratio > 0 AND pvp_ratio < 2 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### mf_val_qual_pvp_t20
- **Return:** 2569.3% | **CAGR:** 27.5% | **Sharpe:** 1.31 | **MaxDD:** 25.7% | **Win:** 73% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND roe > 0.1 AND margem_liquida > 0.1 AND pvp_ratio > 0 AND pvp_ratio < 2 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```

### mf_mb_ml_roe
- **Return:** 1565.9% | **CAGR:** 23.2% | **Sharpe:** 1.03 | **MaxDD:** 41.1% | **Win:** 75% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND ev_ebit > 0 AND ev_ebit < 10 AND margem_bruta > 0.3 AND margem_liquida > 0.1 AND roe > 0.1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### mf_mb_ml_roe_t20
- **Return:** 977.3% | **CAGR:** 19.3% | **Sharpe:** 0.91 | **MaxDD:** 36.5% | **Win:** 67% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND ev_ebit > 0 AND ev_ebit < 10 AND margem_bruta > 0.3 AND margem_liquida > 0.1 AND roe > 0.1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### mf_val_roe_debt
- **Return:** 1344.0% | **CAGR:** 21.9% | **Sharpe:** 0.99 | **MaxDD:** 39.6% | **Win:** 75% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND roe > 0.2 AND margem_liquida > 0.15 AND divida_liquida_ebit < 3 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### mf_val_roe_debt_t20
- **Return:** 1317.2% | **CAGR:** 21.7% | **Sharpe:** 1.10 | **MaxDD:** 27.1% | **Win:** 76% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND roe > 0.2 AND margem_liquida > 0.15 AND divida_liquida_ebit < 3 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```

### mf_ev_roe_mb_liq
- **Return:** 1560.8% | **CAGR:** 23.1% | **Sharpe:** 1.04 | **MaxDD:** 38.4% | **Win:** 71% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 8 AND roe > 0.15 AND margem_bruta > 0.3 AND liquidez_corrente > 1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### mf_ev_roe_mb_liq_t20
- **Return:** 1140.8% | **CAGR:** 20.5% | **Sharpe:** 0.94 | **MaxDD:** 32.8% | **Win:** 69% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 8 AND roe > 0.15 AND margem_bruta > 0.3 AND liquidez_corrente > 1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### mf_val_roe20_ml10
- **Return:** 2044.8% | **CAGR:** 25.5% | **Sharpe:** 1.18 | **MaxDD:** 35.9% | **Win:** 76% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND roe > 0.2 AND margem_liquida > 0.1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### mf_val_roe20_ml10_t20
- **Return:** 2487.8% | **CAGR:** 27.3% | **Sharpe:** 1.27 | **MaxDD:** 27.0% | **Win:** 75% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND roe > 0.2 AND margem_liquida > 0.1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```


---
## 7. Alternative rankings

### pl10_ev10_rank_roe
- **Return:** 1719.9% | **CAGR:** 24.0% | **Sharpe:** 1.05 | **MaxDD:** 41.0% | **Win:** 73% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND ev_ebit > 0 AND ev_ebit < 10 AND roe > 0 AND avg_daily_liquidity > 1e6" --rank "roe DESC" --top 10
```

### pl10_ev10_rank_roe_t20
- **Return:** 1193.0% | **CAGR:** 20.9% | **Sharpe:** 0.97 | **MaxDD:** 36.0% | **Win:** 69% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND ev_ebit > 0 AND ev_ebit < 10 AND roe > 0 AND avg_daily_liquidity > 1e6" --rank "roe DESC" --top 20
```

### pl10_ev10_rank_ml
- **Return:** 749.4% | **CAGR:** 17.2% | **Sharpe:** 0.79 | **MaxDD:** 42.0% | **Win:** 69% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND ev_ebit > 0 AND ev_ebit < 10 AND margem_liquida > 0 AND avg_daily_liquidity > 1e6" --rank "margem_liquida DESC" --top 10
```

### pl10_ev10_rank_ml_t20
- **Return:** 842.1% | **CAGR:** 18.1% | **Sharpe:** 0.87 | **MaxDD:** 36.0% | **Win:** 69% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND ev_ebit > 0 AND ev_ebit < 10 AND margem_liquida > 0 AND avg_daily_liquidity > 1e6" --rank "margem_liquida DESC" --top 20
```

### pl10_ev10_rank_pvp
- **Return:** 986.4% | **CAGR:** 19.3% | **Sharpe:** 0.80 | **MaxDD:** 40.9% | **Win:** 60% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND pvp_ratio > 0 AND avg_daily_liquidity > 1e6" --rank "pvp_ratio ASC" --top 10
```

### pl10_ev10_rank_pvp_t20
- **Return:** 1528.5% | **CAGR:** 23.0% | **Sharpe:** 0.92 | **MaxDD:** 39.4% | **Win:** 69% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND pvp_ratio > 0 AND avg_daily_liquidity > 1e6" --rank "pvp_ratio ASC" --top 20
```

### pl10_ev10_rank_ps
- **Return:** 763.3% | **CAGR:** 17.3% | **Sharpe:** 0.75 | **MaxDD:** 40.9% | **Win:** 64% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND price_to_sales > 0 AND avg_daily_liquidity > 1e6" --rank "price_to_sales ASC" --top 10
```

### pl10_ev10_rank_ps_t20
- **Return:** 997.2% | **CAGR:** 19.4% | **Sharpe:** 0.81 | **MaxDD:** 42.1% | **Win:** 65% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND price_to_sales > 0 AND avg_daily_liquidity > 1e6" --rank "price_to_sales ASC" --top 20
```

### pl10_ev10_rank_roa
- **Return:** 1275.6% | **CAGR:** 21.4% | **Sharpe:** 0.99 | **MaxDD:** 38.9% | **Win:** 78% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 10 AND roa > 0 AND avg_daily_liquidity > 1e6" --rank "roa DESC" --top 10
```

### pl10_ev10_rank_roa_t20
- **Return:** 1271.2% | **CAGR:** 21.4% | **Sharpe:** 0.98 | **MaxDD:** 36.9% | **Win:** 73% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 10 AND roa > 0 AND avg_daily_liquidity > 1e6" --rank "roa DESC" --top 20
```

### ev8_me_rank_me
- **Return:** 1351.0% | **CAGR:** 21.9% | **Sharpe:** 0.99 | **MaxDD:** 39.6% | **Win:** 73% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 8 AND margem_ebit > 0.1 AND avg_daily_liquidity > 1e6" --rank "margem_ebit DESC" --top 10
```

### ev8_me_rank_me_t20
- **Return:** 1036.1% | **CAGR:** 19.7% | **Sharpe:** 0.95 | **MaxDD:** 36.9% | **Win:** 71% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 8 AND margem_ebit > 0.1 AND avg_daily_liquidity > 1e6" --rank "margem_ebit DESC" --top 20
```

### ev8_mb_rank_mb
- **Return:** 1981.8% | **CAGR:** 25.2% | **Sharpe:** 1.11 | **MaxDD:** 39.8% | **Win:** 73% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 8 AND margem_bruta > 0.2 AND avg_daily_liquidity > 1e6" --rank "margem_bruta DESC" --top 10
```

### ev8_mb_rank_mb_t20
- **Return:** 1159.1% | **CAGR:** 20.6% | **Sharpe:** 0.97 | **MaxDD:** 33.5% | **Win:** 73% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 8 AND margem_bruta > 0.2 AND avg_daily_liquidity > 1e6" --rank "margem_bruta DESC" --top 20
```

### pl5_rank_ev
- **Return:** 2268.8% | **CAGR:** 26.4% | **Sharpe:** 1.15 | **MaxDD:** 37.5% | **Win:** 73% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### pl5_rank_ev_t20
- **Return:** 1427.9% | **CAGR:** 22.4% | **Sharpe:** 1.01 | **MaxDD:** 38.3% | **Win:** 76% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### ev5_rank_pl
- **Return:** 2464.7% | **CAGR:** 27.2% | **Sharpe:** 1.27 | **MaxDD:** 29.5% | **Win:** 78% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 5 AND pl_ratio > 0 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### ev5_rank_pl_t20
- **Return:** 2466.9% | **CAGR:** 27.2% | **Sharpe:** 1.34 | **MaxDD:** 24.6% | **Win:** 76% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 5 AND pl_ratio > 0 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```

### pl5_rank_roe
- **Return:** 1768.9% | **CAGR:** 24.2% | **Sharpe:** 1.01 | **MaxDD:** 43.7% | **Win:** 75% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND roe > 0 AND avg_daily_liquidity > 1e6" --rank "roe DESC" --top 10
```

### pl5_rank_roe_t20
- **Return:** 1424.6% | **CAGR:** 22.4% | **Sharpe:** 0.97 | **MaxDD:** 37.1% | **Win:** 73% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND roe > 0 AND avg_daily_liquidity > 1e6" --rank "roe DESC" --top 20
```

### pl5_rank_ml
- **Return:** 1169.0% | **CAGR:** 20.7% | **Sharpe:** 0.92 | **MaxDD:** 41.0% | **Win:** 65% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND margem_liquida > 0 AND avg_daily_liquidity > 1e6" --rank "margem_liquida DESC" --top 10
```

### pl5_rank_ml_t20
- **Return:** 1232.0% | **CAGR:** 21.1% | **Sharpe:** 0.92 | **MaxDD:** 38.6% | **Win:** 67% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND margem_liquida > 0 AND avg_daily_liquidity > 1e6" --rank "margem_liquida DESC" --top 20
```

### pl5_rank_pvp
- **Return:** 1388.3% | **CAGR:** 22.1% | **Sharpe:** 0.89 | **MaxDD:** 36.1% | **Win:** 58% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND pvp_ratio > 0 AND avg_daily_liquidity > 1e6" --rank "pvp_ratio ASC" --top 10
```

### pl5_rank_pvp_t20
- **Return:** 1320.8% | **CAGR:** 21.7% | **Sharpe:** 0.90 | **MaxDD:** 38.6% | **Win:** 69% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND pvp_ratio > 0 AND avg_daily_liquidity > 1e6" --rank "pvp_ratio ASC" --top 20
```


---
## 8. Size-constrained strategies

### mid_pl8_ev8
- **Return:** 1413.6% | **CAGR:** 22.3% | **Sharpe:** 1.01 | **MaxDD:** 38.2% | **Win:** 69% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND market_cap > 1e9 AND market_cap < 1e10 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### mid_pl8_ev8_t20
- **Return:** 1530.2% | **CAGR:** 23.0% | **Sharpe:** 1.04 | **MaxDD:** 38.4% | **Win:** 75% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND market_cap > 1e9 AND market_cap < 1e10 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### mid_ev10_roe10
- **Return:** 1754.7% | **CAGR:** 24.1% | **Sharpe:** 1.09 | **MaxDD:** 36.7% | **Win:** 69% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 10 AND roe > 0.1 AND market_cap > 1e9 AND market_cap < 1e10 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### mid_ev10_roe10_t20
- **Return:** 1106.4% | **CAGR:** 20.3% | **Sharpe:** 0.90 | **MaxDD:** 40.3% | **Win:** 67% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 10 AND roe > 0.1 AND market_cap > 1e9 AND market_cap < 1e10 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### notlarge_ev8
- **Return:** 1914.8% | **CAGR:** 24.9% | **Sharpe:** 1.13 | **MaxDD:** 35.9% | **Win:** 78% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 8 AND market_cap < 1e10 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### notlarge_ev8_t20
- **Return:** 1547.3% | **CAGR:** 23.1% | **Sharpe:** 1.05 | **MaxDD:** 35.0% | **Win:** 71% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 8 AND market_cap < 1e10 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### notlarge_pl8_ev8
- **Return:** 2202.1% | **CAGR:** 26.2% | **Sharpe:** 1.20 | **MaxDD:** 35.9% | **Win:** 78% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND market_cap < 1e10 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### notlarge_pl8_ev8_t20
- **Return:** 1502.4% | **CAGR:** 22.8% | **Sharpe:** 1.05 | **MaxDD:** 34.5% | **Win:** 71% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND market_cap < 1e10 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### large_ev10
- **Return:** 401.2% | **CAGR:** 12.7% | **Sharpe:** 0.67 | **MaxDD:** 30.4% | **Win:** 65% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 10 AND market_cap > 1e10 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### large_ev10_t20
- **Return:** 816.7% | **CAGR:** 17.8% | **Sharpe:** 0.95 | **MaxDD:** 36.1% | **Win:** 71% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 10 AND market_cap > 1e10 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### large_pl10_roe10
- **Return:** 298.4% | **CAGR:** 10.8% | **Sharpe:** 0.59 | **MaxDD:** 35.4% | **Win:** 62% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND roe > 0.1 AND market_cap > 1e10 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### large_pl10_roe10_t20
- **Return:** 855.8% | **CAGR:** 18.2% | **Sharpe:** 0.94 | **MaxDD:** 41.4% | **Win:** 71% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND roe > 0.1 AND market_cap > 1e10 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```


---
## 9. Yield / income oriented

### yield_pl5_ml15
- **Return:** 1785.8% | **CAGR:** 24.3% | **Sharpe:** 1.02 | **MaxDD:** 42.7% | **Win:** 65% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND margem_liquida > 0.15 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### yield_pl5_ml15_t20
- **Return:** 1119.5% | **CAGR:** 20.4% | **Sharpe:** 0.92 | **MaxDD:** 41.1% | **Win:** 65% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND margem_liquida > 0.15 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```

### yield_pl5_ml20
- **Return:** 1498.1% | **CAGR:** 22.8% | **Sharpe:** 1.01 | **MaxDD:** 41.0% | **Win:** 69% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND margem_liquida > 0.2 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### yield_pl5_ml20_t20
- **Return:** 1300.9% | **CAGR:** 21.6% | **Sharpe:** 0.94 | **MaxDD:** 41.1% | **Win:** 67% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND margem_liquida > 0.2 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```

### yield_pl5_roe20_ml10
- **Return:** 1173.8% | **CAGR:** 20.7% | **Sharpe:** 0.92 | **MaxDD:** 43.7% | **Win:** 73% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND roe > 0.2 AND margem_liquida > 0.1 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### yield_pl5_roe20_ml10_t20
- **Return:** 1468.9% | **CAGR:** 22.6% | **Sharpe:** 1.02 | **MaxDD:** 41.1% | **Win:** 67% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND roe > 0.2 AND margem_liquida > 0.1 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```

### yield_pl8_roe15_ml10_debt2
- **Return:** 1389.9% | **CAGR:** 22.2% | **Sharpe:** 1.11 | **MaxDD:** 25.7% | **Win:** 71% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND roe > 0.15 AND margem_liquida > 0.1 AND divida_liquida_ebit > 0 AND divida_liquida_ebit < 2 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### yield_pl8_roe15_ml10_debt2_t20
- **Return:** 1222.9% | **CAGR:** 21.1% | **Sharpe:** 1.09 | **MaxDD:** 27.2% | **Win:** 69% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND roe > 0.15 AND margem_liquida > 0.1 AND divida_liquida_ebit > 0 AND divida_liquida_ebit < 2 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```


---
## 10. Wide value + high quality (GARP)

### garp_pl15_roe25_ml15
- **Return:** 1044.8% | **CAGR:** 19.8% | **Sharpe:** 0.91 | **MaxDD:** 45.3% | **Win:** 78% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 15 AND roe > 0.25 AND margem_liquida > 0.15 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### garp_pl15_roe25_ml15_t20
- **Return:** 735.4% | **CAGR:** 17.0% | **Sharpe:** 0.85 | **MaxDD:** 37.5% | **Win:** 69% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 15 AND roe > 0.25 AND margem_liquida > 0.15 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```

### garp_ev15_roe20_me20
- **Return:** 1165.5% | **CAGR:** 20.7% | **Sharpe:** 0.99 | **MaxDD:** 35.5% | **Win:** 78% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 15 AND roe > 0.2 AND margem_ebit > 0.2 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### garp_ev15_roe20_me20_t20
- **Return:** 619.4% | **CAGR:** 15.7% | **Sharpe:** 0.81 | **MaxDD:** 35.7% | **Win:** 65% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 15 AND roe > 0.2 AND margem_ebit > 0.2 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### garp_pl12_roe20_mb40_liq15
- **Return:** 798.3% | **CAGR:** 17.7% | **Sharpe:** 0.84 | **MaxDD:** 39.5% | **Win:** 71% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 12 AND roe > 0.2 AND margem_bruta > 0.4 AND liquidez_corrente > 1.5 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### garp_pl12_roe20_mb40_liq15_t20
- **Return:** 793.0% | **CAGR:** 17.6% | **Sharpe:** 0.85 | **MaxDD:** 36.6% | **Win:** 73% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 12 AND roe > 0.2 AND margem_bruta > 0.4 AND liquidez_corrente > 1.5 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```

### garp_ev10_roe15_ml10_liq1
- **Return:** 1561.7% | **CAGR:** 23.1% | **Sharpe:** 1.04 | **MaxDD:** 41.9% | **Win:** 76% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 10 AND roe > 0.15 AND margem_liquida > 0.1 AND liquidez_corrente > 1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### garp_ev10_roe15_ml10_liq1_t20
- **Return:** 1018.2% | **CAGR:** 19.6% | **Sharpe:** 0.94 | **MaxDD:** 34.1% | **Win:** 69% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 10 AND roe > 0.15 AND margem_liquida > 0.1 AND liquidez_corrente > 1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### garp_pl10_roe15_ml10_cf
- **Return:** 1553.8% | **CAGR:** 23.1% | **Sharpe:** 0.99 | **MaxDD:** 46.4% | **Win:** 73% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND roe > 0.15 AND margem_liquida > 0.1 AND fluxo_caixa_op_ttm > 0 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### garp_pl10_roe15_ml10_cf_t20
- **Return:** 1072.5% | **CAGR:** 20.0% | **Sharpe:** 0.92 | **MaxDD:** 38.1% | **Win:** 69% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND roe > 0.15 AND margem_liquida > 0.1 AND fluxo_caixa_op_ttm > 0 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```


---
## 11. Top N sweep (best filters from above)

### best_ps_ml_t5
- **Return:** 2315.6% | **CAGR:** 26.6% | **Sharpe:** 1.04 | **MaxDD:** 32.9% | **Win:** 62% | **Top:** 5
```
bun backtest --filter "price_to_sales > 0 AND price_to_sales < 1 AND margem_liquida > 0.1 AND avg_daily_liquidity > 1e6" --rank "price_to_sales ASC" --top 5
```

### best_ps_ml_t10
- **Return:** 1713.3% | **CAGR:** 23.9% | **Sharpe:** 0.97 | **MaxDD:** 40.0% | **Win:** 67% | **Top:** 10
```
bun backtest --filter "price_to_sales > 0 AND price_to_sales < 1 AND margem_liquida > 0.1 AND avg_daily_liquidity > 1e6" --rank "price_to_sales ASC" --top 10
```

### best_ps_ml_t15
- **Return:** 1565.7% | **CAGR:** 23.2% | **Sharpe:** 0.98 | **MaxDD:** 41.1% | **Win:** 67% | **Top:** 15
```
bun backtest --filter "price_to_sales > 0 AND price_to_sales < 1 AND margem_liquida > 0.1 AND avg_daily_liquidity > 1e6" --rank "price_to_sales ASC" --top 15
```

### best_ps_ml_t20
- **Return:** 1374.7% | **CAGR:** 22.1% | **Sharpe:** 0.95 | **MaxDD:** 40.3% | **Win:** 64% | **Top:** 20
```
bun backtest --filter "price_to_sales > 0 AND price_to_sales < 1 AND margem_liquida > 0.1 AND avg_daily_liquidity > 1e6" --rank "price_to_sales ASC" --top 20
```

### best_ps_ml_t30
- **Return:** 1137.1% | **CAGR:** 20.5% | **Sharpe:** 0.90 | **MaxDD:** 41.7% | **Win:** 67% | **Top:** 30
```
bun backtest --filter "price_to_sales > 0 AND price_to_sales < 1 AND margem_liquida > 0.1 AND avg_daily_liquidity > 1e6" --rank "price_to_sales ASC" --top 30
```

### best_mf_t5
- **Return:** 1734.2% | **CAGR:** 24.0% | **Sharpe:** 1.15 | **MaxDD:** 30.0% | **Win:** 76% | **Top:** 5
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND roe > 0.1 AND margem_liquida > 0.1 AND liquidez_corrente > 1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 5
```

### best_mf_t10
- **Return:** 2228.5% | **CAGR:** 26.3% | **Sharpe:** 1.19 | **MaxDD:** 35.9% | **Win:** 76% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND roe > 0.1 AND margem_liquida > 0.1 AND liquidez_corrente > 1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### best_mf_t15
- **Return:** 2150.2% | **CAGR:** 25.9% | **Sharpe:** 1.23 | **MaxDD:** 35.9% | **Win:** 75% | **Top:** 15
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND roe > 0.1 AND margem_liquida > 0.1 AND liquidez_corrente > 1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 15
```

### best_mf_t20
- **Return:** 2359.8% | **CAGR:** 26.8% | **Sharpe:** 1.29 | **MaxDD:** 27.0% | **Win:** 75% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND roe > 0.1 AND margem_liquida > 0.1 AND liquidez_corrente > 1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### best_mf_t30
- **Return:** 1854.6% | **CAGR:** 24.6% | **Sharpe:** 1.21 | **MaxDD:** 26.8% | **Win:** 71% | **Top:** 30
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND roe > 0.1 AND margem_liquida > 0.1 AND liquidez_corrente > 1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 30
```

### best_ev8_t5
- **Return:** 1235.8% | **CAGR:** 21.2% | **Sharpe:** 0.98 | **MaxDD:** 30.0% | **Win:** 69% | **Top:** 5
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 8 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 5
```

### best_ev8_t10
- **Return:** 1671.3% | **CAGR:** 23.7% | **Sharpe:** 1.12 | **MaxDD:** 35.9% | **Win:** 75% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 8 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### best_ev8_t15
- **Return:** 2065.8% | **CAGR:** 25.6% | **Sharpe:** 1.14 | **MaxDD:** 38.5% | **Win:** 76% | **Top:** 15
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 8 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 15
```

### best_ev8_t20
- **Return:** 1568.2% | **CAGR:** 23.2% | **Sharpe:** 1.06 | **MaxDD:** 34.9% | **Win:** 75% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 8 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### best_ev8_t30
- **Return:** 1340.8% | **CAGR:** 21.8% | **Sharpe:** 1.02 | **MaxDD:** 34.1% | **Win:** 71% | **Top:** 30
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 8 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 30
```


---
## 12. Contrarian / deep value

### deep_pl2
- **Return:** 1008.1% | **CAGR:** 19.5% | **Sharpe:** 0.85 | **MaxDD:** 34.9% | **Win:** 64% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 2 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### deep_pl2_t20
- **Return:** 4460.0% | **CAGR:** 32.7% | **Sharpe:** 1.21 | **MaxDD:** 27.8% | **Win:** 69% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 2 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```

### deep_ev2
- **Return:** 3968.0% | **CAGR:** 31.6% | **Sharpe:** 1.47 | **MaxDD:** 25.6% | **Win:** 76% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 2 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### deep_ev2_t20
- **Return:** 3746.9% | **CAGR:** 31.0% | **Sharpe:** 1.49 | **MaxDD:** 22.5% | **Win:** 76% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 2 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### deep_pvp03
- **Return:** 2111.2% | **CAGR:** 25.8% | **Sharpe:** 0.89 | **MaxDD:** 40.7% | **Win:** 62% | **Top:** 10
```
bun backtest --filter "pvp_ratio > 0 AND pvp_ratio < 0.3 AND avg_daily_liquidity > 1e6" --rank "pvp_ratio ASC" --top 10
```

### deep_pvp03_t20
- **Return:** 1456.6% | **CAGR:** 22.5% | **Sharpe:** 0.85 | **MaxDD:** 30.9% | **Win:** 62% | **Top:** 20
```
bun backtest --filter "pvp_ratio > 0 AND pvp_ratio < 0.3 AND avg_daily_liquidity > 1e6" --rank "pvp_ratio ASC" --top 20
```

### deep_pl3_pvp05
- **Return:** 1588.5% | **CAGR:** 23.3% | **Sharpe:** 1.01 | **MaxDD:** 34.9% | **Win:** 69% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 3 AND pvp_ratio > 0 AND pvp_ratio < 0.5 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### deep_pl3_pvp05_t20
- **Return:** 3082.5% | **CAGR:** 29.2% | **Sharpe:** 1.19 | **MaxDD:** 33.3% | **Win:** 71% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 3 AND pvp_ratio > 0 AND pvp_ratio < 0.5 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```

### deep_ev3_pvp1
- **Return:** 3395.1% | **CAGR:** 30.1% | **Sharpe:** 1.41 | **MaxDD:** 28.4% | **Win:** 76% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 3 AND pvp_ratio > 0 AND pvp_ratio < 1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### deep_ev3_pvp1_t20
- **Return:** 3166.6% | **CAGR:** 29.5% | **Sharpe:** 1.41 | **MaxDD:** 27.0% | **Win:** 80% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 3 AND pvp_ratio > 0 AND pvp_ratio < 1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### deep_pl3_ev3_ml5
- **Return:** 3930.5% | **CAGR:** 31.5% | **Sharpe:** 1.33 | **MaxDD:** 25.6% | **Win:** 80% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 3 AND ev_ebit > 0 AND ev_ebit < 3 AND margem_liquida > 0.05 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### deep_pl3_ev3_ml5_t20
- **Return:** 2722.2% | **CAGR:** 28.1% | **Sharpe:** 1.32 | **MaxDD:** 27.0% | **Win:** 78% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 3 AND ev_ebit > 0 AND ev_ebit < 3 AND margem_liquida > 0.05 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```

### deep_pl3_ev3_roe10
- **Return:** 2722.4% | **CAGR:** 28.1% | **Sharpe:** 1.29 | **MaxDD:** 28.4% | **Win:** 71% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 3 AND ev_ebit > 0 AND ev_ebit < 3 AND roe > 0.1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### deep_pl3_ev3_roe10_t20
- **Return:** 2620.8% | **CAGR:** 27.7% | **Sharpe:** 1.37 | **MaxDD:** 27.0% | **Win:** 78% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 3 AND ev_ebit > 0 AND ev_ebit < 3 AND roe > 0.1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```


---
## 13. Sector-agnostic quality screens

### quality_roe20_ml15_rankpl
- **Return:** 609.9% | **CAGR:** 15.6% | **Sharpe:** 0.78 | **MaxDD:** 42.2% | **Win:** 71% | **Top:** 10
```
bun backtest --filter "roe > 0.2 AND margem_liquida > 0.15 AND pl_ratio > 0 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### quality_roe20_ml15_rankpl_t20
- **Return:** 696.2% | **CAGR:** 16.6% | **Sharpe:** 0.82 | **MaxDD:** 39.3% | **Win:** 65% | **Top:** 20
```
bun backtest --filter "roe > 0.2 AND margem_liquida > 0.15 AND pl_ratio > 0 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```

### quality_roe15_mb30_rankev
- **Return:** 887.1% | **CAGR:** 18.5% | **Sharpe:** 0.85 | **MaxDD:** 39.0% | **Win:** 65% | **Top:** 10
```
bun backtest --filter "roe > 0.15 AND margem_bruta > 0.3 AND ev_ebit > 0 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### quality_roe15_mb30_rankev_t20
- **Return:** 534.9% | **CAGR:** 14.7% | **Sharpe:** 0.72 | **MaxDD:** 38.2% | **Win:** 62% | **Top:** 20
```
bun backtest --filter "roe > 0.15 AND margem_bruta > 0.3 AND ev_ebit > 0 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### quality_roa10_ml10_rankpl
- **Return:** 499.7% | **CAGR:** 14.2% | **Sharpe:** 0.70 | **MaxDD:** 40.4% | **Win:** 67% | **Top:** 10
```
bun backtest --filter "roa > 0.1 AND margem_liquida > 0.1 AND pl_ratio > 0 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### quality_roa10_ml10_rankpl_t20
- **Return:** 503.9% | **CAGR:** 14.2% | **Sharpe:** 0.71 | **MaxDD:** 38.5% | **Win:** 69% | **Top:** 20
```
bun backtest --filter "roa > 0.1 AND margem_liquida > 0.1 AND pl_ratio > 0 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```

### quality_roe15_liq15_rankev
- **Return:** 830.1% | **CAGR:** 18.0% | **Sharpe:** 0.87 | **MaxDD:** 37.2% | **Win:** 69% | **Top:** 10
```
bun backtest --filter "roe > 0.15 AND liquidez_corrente > 1.5 AND ev_ebit > 0 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### quality_roe15_liq15_rankev_t20
- **Return:** 662.9% | **CAGR:** 16.2% | **Sharpe:** 0.80 | **MaxDD:** 36.7% | **Win:** 67% | **Top:** 20
```
bun backtest --filter "roe > 0.15 AND liquidez_corrente > 1.5 AND ev_ebit > 0 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### quality_roe25_rankpl
- **Return:** 751.9% | **CAGR:** 17.2% | **Sharpe:** 0.81 | **MaxDD:** 40.3% | **Win:** 67% | **Top:** 10
```
bun backtest --filter "roe > 0.25 AND pl_ratio > 0 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### quality_roe25_rankpl_t20
- **Return:** 758.5% | **CAGR:** 17.3% | **Sharpe:** 0.83 | **MaxDD:** 35.2% | **Win:** 67% | **Top:** 20
```
bun backtest --filter "roe > 0.25 AND pl_ratio > 0 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```


---
## 14. Higher liquidity threshold (5M+/day)

### hiq_ps1_ml10
- **Return:** 1943.3% | **CAGR:** 25.0% | **Sharpe:** 1.13 | **MaxDD:** 41.0% | **Win:** 73% | **Top:** 10
```
bun backtest --filter "price_to_sales > 0 AND price_to_sales < 1 AND margem_liquida > 0.1 AND avg_daily_liquidity > 5e6" --rank "price_to_sales ASC" --top 10
```

### hiq_ps1_ml10_t20
- **Return:** 1339.0% | **CAGR:** 21.8% | **Sharpe:** 0.97 | **MaxDD:** 41.5% | **Win:** 71% | **Top:** 20
```
bun backtest --filter "price_to_sales > 0 AND price_to_sales < 1 AND margem_liquida > 0.1 AND avg_daily_liquidity > 5e6" --rank "price_to_sales ASC" --top 20
```

### hiq_ev8
- **Return:** 2404.4% | **CAGR:** 26.9% | **Sharpe:** 1.19 | **MaxDD:** 35.9% | **Win:** 75% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 8 AND avg_daily_liquidity > 5e6" --rank "ev_ebit ASC" --top 10
```

### hiq_ev8_t20
- **Return:** 1351.5% | **CAGR:** 21.9% | **Sharpe:** 1.01 | **MaxDD:** 36.4% | **Win:** 73% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 8 AND avg_daily_liquidity > 5e6" --rank "ev_ebit ASC" --top 20
```

### hiq_pl8_ev8
- **Return:** 2664.7% | **CAGR:** 27.9% | **Sharpe:** 1.21 | **MaxDD:** 35.9% | **Win:** 75% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND avg_daily_liquidity > 5e6" --rank "ev_ebit ASC" --top 10
```

### hiq_pl8_ev8_t20
- **Return:** 1267.7% | **CAGR:** 21.4% | **Sharpe:** 1.00 | **MaxDD:** 36.0% | **Win:** 73% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND avg_daily_liquidity > 5e6" --rank "ev_ebit ASC" --top 20
```

### hiq_ev15_roe10
- **Return:** 1914.1% | **CAGR:** 24.9% | **Sharpe:** 1.08 | **MaxDD:** 38.9% | **Win:** 73% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 15 AND roe > 0.1 AND avg_daily_liquidity > 5e6" --rank "ev_ebit ASC" --top 10
```

### hiq_ev15_roe10_t20
- **Return:** 907.0% | **CAGR:** 18.7% | **Sharpe:** 0.89 | **MaxDD:** 36.7% | **Win:** 73% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 15 AND roe > 0.1 AND avg_daily_liquidity > 5e6" --rank "ev_ebit ASC" --top 20
```

### hiq_pl10_liq15
- **Return:** 1337.3% | **CAGR:** 21.8% | **Sharpe:** 0.97 | **MaxDD:** 39.5% | **Win:** 67% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND liquidez_corrente > 1.5 AND avg_daily_liquidity > 5e6" --rank "pl_ratio ASC" --top 10
```

### hiq_pl10_liq15_t20
- **Return:** 1065.7% | **CAGR:** 20.0% | **Sharpe:** 0.89 | **MaxDD:** 37.0% | **Win:** 69% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND liquidez_corrente > 1.5 AND avg_daily_liquidity > 5e6" --rank "pl_ratio ASC" --top 20
```

### hiq_mf_val_qual_liq
- **Return:** 2647.0% | **CAGR:** 27.8% | **Sharpe:** 1.22 | **MaxDD:** 35.9% | **Win:** 75% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND roe > 0.1 AND margem_liquida > 0.1 AND liquidez_corrente > 1 AND avg_daily_liquidity > 5e6" --rank "ev_ebit ASC" --top 10
```

### hiq_mf_val_qual_liq_t20
- **Return:** 2402.1% | **CAGR:** 26.9% | **Sharpe:** 1.31 | **MaxDD:** 27.0% | **Win:** 78% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND roe > 0.1 AND margem_liquida > 0.1 AND liquidez_corrente > 1 AND avg_daily_liquidity > 5e6" --rank "ev_ebit ASC" --top 20
```


---
## TOP 25 BY TOTAL RETURN

| # | Strategy | Return | CAGR | Sharpe | MaxDD | Win% | Command |
|---|----------|--------|------|--------|-------|------|---------|
| 1 | deep_pl2_t20 | 4460.0% | 32.7% | 1.21 | 27.8% | 69% | `bun backtest --filter "pl_ratio > 0 AND pl_ratio < 2 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20` |
| 2 | deep_ev2 | 3968.0% | 31.6% | 1.47 | 25.6% | 76% | `bun backtest --filter "ev_ebit > 0 AND ev_ebit < 2 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10` |
| 3 | deep_pl3_ev3_ml5 | 3930.5% | 31.5% | 1.33 | 25.6% | 80% | `bun backtest --filter "pl_ratio > 0 AND pl_ratio < 3 AND ev_ebit > 0 AND ev_ebit < 3 AND margem_liquida > 0.05 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10` |
| 4 | deep_ev2_t20 | 3746.9% | 31.0% | 1.49 | 22.5% | 76% | `bun backtest --filter "ev_ebit > 0 AND ev_ebit < 2 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20` |
| 5 | deep_ev3_pvp1 | 3395.1% | 30.1% | 1.41 | 28.4% | 76% | `bun backtest --filter "ev_ebit > 0 AND ev_ebit < 3 AND pvp_ratio > 0 AND pvp_ratio < 1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10` |
| 6 | ev_3 | 3387.0% | 30.1% | 1.38 | 25.6% | 75% | `bun backtest --filter "ev_ebit > 0 AND ev_ebit < 3 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10` |
| 7 | ev_3_t20 | 3206.0% | 29.6% | 1.43 | 27.0% | 78% | `bun backtest --filter "ev_ebit > 0 AND ev_ebit < 3 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20` |
| 8 | deep_ev3_pvp1_t20 | 3166.6% | 29.5% | 1.41 | 27.0% | 80% | `bun backtest --filter "ev_ebit > 0 AND ev_ebit < 3 AND pvp_ratio > 0 AND pvp_ratio < 1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20` |
| 9 | deep_pl3_pvp05_t20 | 3082.5% | 29.2% | 1.19 | 33.3% | 71% | `bun backtest --filter "pl_ratio > 0 AND pl_ratio < 3 AND pvp_ratio > 0 AND pvp_ratio < 0.5 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20` |
| 10 | pl3_ev3 | 2995.9% | 29.0% | 1.33 | 25.6% | 73% | `bun backtest --filter "pl_ratio > 0 AND pl_ratio < 3 AND ev_ebit > 0 AND ev_ebit < 3 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10` |
| 11 | pl3_ev3_t20 | 2978.0% | 28.9% | 1.38 | 27.0% | 78% | `bun backtest --filter "pl_ratio > 0 AND pl_ratio < 3 AND ev_ebit > 0 AND ev_ebit < 3 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20` |
| 12 | ev5_roe20 | 2846.4% | 28.5% | 1.32 | 29.5% | 78% | `bun backtest --filter "ev_ebit > 0 AND ev_ebit < 5 AND roe > 0.2 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10` |
| 13 | pl5_ev5_ml10_rankpl_t20 | 2792.8% | 28.3% | 1.33 | 24.6% | 73% | `bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND margem_liquida > 0.1 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20` |
| 14 | pl5_ev5 | 2724.8% | 28.1% | 1.29 | 29.5% | 76% | `bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10` |
| 15 | deep_pl3_ev3_roe10 | 2722.4% | 28.1% | 1.29 | 28.4% | 71% | `bun backtest --filter "pl_ratio > 0 AND pl_ratio < 3 AND ev_ebit > 0 AND ev_ebit < 3 AND roe > 0.1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10` |
| 16 | deep_pl3_ev3_ml5_t20 | 2722.2% | 28.1% | 1.32 | 27.0% | 78% | `bun backtest --filter "pl_ratio > 0 AND pl_ratio < 3 AND ev_ebit > 0 AND ev_ebit < 3 AND margem_liquida > 0.05 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20` |
| 17 | pl8_ev8_me15 | 2690.8% | 28.0% | 1.24 | 35.9% | 78% | `bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND margem_ebit > 0.15 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10` |
| 18 | ev5_ps1 | 2679.6% | 27.9% | 1.22 | 32.8% | 78% | `bun backtest --filter "ev_ebit > 0 AND ev_ebit < 5 AND price_to_sales > 0 AND price_to_sales < 1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10` |
| 19 | hiq_pl8_ev8 | 2664.7% | 27.9% | 1.21 | 35.9% | 75% | `bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND avg_daily_liquidity > 5e6" --rank "ev_ebit ASC" --top 10` |
| 20 | hiq_mf_val_qual_liq | 2647.0% | 27.8% | 1.22 | 35.9% | 75% | `bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND roe > 0.1 AND margem_liquida > 0.1 AND liquidez_corrente > 1 AND avg_daily_liquidity > 5e6" --rank "ev_ebit ASC" --top 10` |
| 21 | mf_val_qual_liq_pl_t20 | 2623.2% | 27.7% | 1.33 | 25.7% | 73% | `bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND roe > 0.1 AND margem_liquida > 0.1 AND liquidez_corrente > 1 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20` |
| 22 | deep_pl3_ev3_roe10_t20 | 2620.8% | 27.7% | 1.37 | 27.0% | 78% | `bun backtest --filter "pl_ratio > 0 AND pl_ratio < 3 AND ev_ebit > 0 AND ev_ebit < 3 AND roe > 0.1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20` |
| 23 | ev5_roe20_t20 | 2620.2% | 27.7% | 1.30 | 27.0% | 78% | `bun backtest --filter "ev_ebit > 0 AND ev_ebit < 5 AND roe > 0.2 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20` |
| 24 | ev5_pvp1_t20 | 2610.3% | 27.7% | 1.32 | 24.7% | 78% | `bun backtest --filter "ev_ebit > 0 AND ev_ebit < 5 AND pvp_ratio > 0 AND pvp_ratio < 1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20` |
| 25 | mf_val_qual_pvp_t20 | 2569.3% | 27.5% | 1.31 | 25.7% | 73% | `bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND roe > 0.1 AND margem_liquida > 0.1 AND pvp_ratio > 0 AND pvp_ratio < 2 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20` |

---
## TOP 15 BY SHARPE RATIO

| # | Strategy | Return | CAGR | Sharpe | MaxDD | Win% | Command |
|---|----------|--------|------|--------|-------|------|---------|
| 1 | deep_ev2_t20 | 3746.9% | 31.0% | 1.49 | 22.5% | 76% | `bun backtest --filter "ev_ebit > 0 AND ev_ebit < 2 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20` |
| 2 | deep_ev2 | 3968.0% | 31.6% | 1.47 | 25.6% | 76% | `bun backtest --filter "ev_ebit > 0 AND ev_ebit < 2 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10` |
| 3 | ev_3_t20 | 3206.0% | 29.6% | 1.43 | 27.0% | 78% | `bun backtest --filter "ev_ebit > 0 AND ev_ebit < 3 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20` |
| 4 | deep_ev3_pvp1 | 3395.1% | 30.1% | 1.41 | 28.4% | 76% | `bun backtest --filter "ev_ebit > 0 AND ev_ebit < 3 AND pvp_ratio > 0 AND pvp_ratio < 1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10` |
| 5 | deep_ev3_pvp1_t20 | 3166.6% | 29.5% | 1.41 | 27.0% | 80% | `bun backtest --filter "ev_ebit > 0 AND ev_ebit < 3 AND pvp_ratio > 0 AND pvp_ratio < 1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20` |
| 6 | pl3_ev3_t20 | 2978.0% | 28.9% | 1.38 | 27.0% | 78% | `bun backtest --filter "pl_ratio > 0 AND pl_ratio < 3 AND ev_ebit > 0 AND ev_ebit < 3 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20` |
| 7 | ev_3 | 3387.0% | 30.1% | 1.38 | 25.6% | 75% | `bun backtest --filter "ev_ebit > 0 AND ev_ebit < 3 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10` |
| 8 | deep_pl3_ev3_roe10_t20 | 2620.8% | 27.7% | 1.37 | 27.0% | 78% | `bun backtest --filter "pl_ratio > 0 AND pl_ratio < 3 AND ev_ebit > 0 AND ev_ebit < 3 AND roe > 0.1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20` |
| 9 | ev5_rank_pl_t20 | 2466.9% | 27.2% | 1.34 | 24.6% | 76% | `bun backtest --filter "ev_ebit > 0 AND ev_ebit < 5 AND pl_ratio > 0 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20` |
| 10 | pl5_ev5_ml10_rankpl_t20 | 2792.8% | 28.3% | 1.33 | 24.6% | 73% | `bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND margem_liquida > 0.1 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20` |
| 11 | pl3_ev3 | 2995.9% | 29.0% | 1.33 | 25.6% | 73% | `bun backtest --filter "pl_ratio > 0 AND pl_ratio < 3 AND ev_ebit > 0 AND ev_ebit < 3 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10` |
| 12 | mf_val_qual_liq_pl_t20 | 2623.2% | 27.7% | 1.33 | 25.7% | 73% | `bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND roe > 0.1 AND margem_liquida > 0.1 AND liquidez_corrente > 1 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20` |
| 13 | deep_pl3_ev3_ml5 | 3930.5% | 31.5% | 1.33 | 25.6% | 80% | `bun backtest --filter "pl_ratio > 0 AND pl_ratio < 3 AND ev_ebit > 0 AND ev_ebit < 3 AND margem_liquida > 0.05 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10` |
| 14 | pl5_ev5_rankpl_t20 | 2453.2% | 27.1% | 1.32 | 24.6% | 75% | `bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20` |
| 15 | ev5_roe20 | 2846.4% | 28.5% | 1.32 | 29.5% | 78% | `bun backtest --filter "ev_ebit > 0 AND ev_ebit < 5 AND roe > 0.2 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10` |
