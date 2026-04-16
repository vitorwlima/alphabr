# Backtest Experiment Results

All strategies filtered with `avg_daily_liquidity > 1e6` (R$1M+/day).


---
## 1. Pure Value (single metric)

### pl_3
- **Return:** 1224.6% | **CAGR:** 21.1% | **Sharpe:** 0.91 | **MaxDD:** 39.4% | **Win:** 64% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 3 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### pl_3_t20
- **Return:** 2457.7% | **CAGR:** 27.1% | **Sharpe:** 1.09 | **MaxDD:** 39.4% | **Win:** 65% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 3 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```

### pl_5
- **Return:** 962.4% | **CAGR:** 19.1% | **Sharpe:** 0.85 | **MaxDD:** 37.6% | **Win:** 64% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### pl_5_t20
- **Return:** 2149.3% | **CAGR:** 25.9% | **Sharpe:** 1.07 | **MaxDD:** 39.9% | **Win:** 67% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```

### pl_8
- **Return:** 975.1% | **CAGR:** 19.2% | **Sharpe:** 0.85 | **MaxDD:** 37.6% | **Win:** 64% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### pl_8_t20
- **Return:** 1672.6% | **CAGR:** 23.7% | **Sharpe:** 0.97 | **MaxDD:** 40.8% | **Win:** 69% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```

### pl_10
- **Return:** 975.1% | **CAGR:** 19.2% | **Sharpe:** 0.85 | **MaxDD:** 37.6% | **Win:** 64% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### pl_10_t20
- **Return:** 1662.0% | **CAGR:** 23.7% | **Sharpe:** 0.97 | **MaxDD:** 40.8% | **Win:** 69% | **Top:** 20
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
- **Return:** 181.3% | **CAGR:** 8.0% | **Sharpe:** 0.54 | **MaxDD:** 40.6% | **Win:** 54% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 3 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### ev_3_t20
- **Return:** 176.1% | **CAGR:** 7.8% | **Sharpe:** 0.53 | **MaxDD:** 40.6% | **Win:** 54% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 3 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### ev_5
- **Return:** 859.5% | **CAGR:** 18.2% | **Sharpe:** 0.81 | **MaxDD:** 56.7% | **Win:** 73% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 5 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### ev_5_t20
- **Return:** 994.1% | **CAGR:** 19.4% | **Sharpe:** 0.84 | **MaxDD:** 56.7% | **Win:** 75% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 5 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### ev_8
- **Return:** 1766.9% | **CAGR:** 24.2% | **Sharpe:** 1.14 | **MaxDD:** 34.6% | **Win:** 76% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 8 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### ev_8_t20
- **Return:** 1869.0% | **CAGR:** 24.7% | **Sharpe:** 1.14 | **MaxDD:** 34.6% | **Win:** 76% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 8 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### ev_10
- **Return:** 1671.3% | **CAGR:** 23.7% | **Sharpe:** 1.12 | **MaxDD:** 35.9% | **Win:** 75% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 10 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### ev_10_t20
- **Return:** 1489.5% | **CAGR:** 22.7% | **Sharpe:** 1.04 | **MaxDD:** 38.0% | **Win:** 73% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 10 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### ev_15
- **Return:** 1671.3% | **CAGR:** 23.7% | **Sharpe:** 1.12 | **MaxDD:** 35.9% | **Win:** 75% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 15 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### ev_15_t20
- **Return:** 1450.6% | **CAGR:** 22.5% | **Sharpe:** 1.02 | **MaxDD:** 36.9% | **Win:** 73% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 15 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### pvp_05
- **Return:** 1977.5% | **CAGR:** 25.2% | **Sharpe:** 0.87 | **MaxDD:** 40.9% | **Win:** 62% | **Top:** 10
```
bun backtest --filter "pvp_ratio > 0 AND pvp_ratio < 0.5 AND avg_daily_liquidity > 1e6" --rank "pvp_ratio ASC" --top 10
```

### pvp_05_t20
- **Return:** 1488.6% | **CAGR:** 22.7% | **Sharpe:** 0.85 | **MaxDD:** 41.5% | **Win:** 62% | **Top:** 20
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
- **Return:** 1118.7% | **CAGR:** 20.3% | **Sharpe:** 0.76 | **MaxDD:** 42.7% | **Win:** 56% | **Top:** 20
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
- **Return:** 1099.5% | **CAGR:** 20.2% | **Sharpe:** 0.86 | **MaxDD:** 56.7% | **Win:** 71% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### pl5_ev5_t20
- **Return:** 976.7% | **CAGR:** 19.2% | **Sharpe:** 0.83 | **MaxDD:** 56.7% | **Win:** 73% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### pl5_ev5_rankpl
- **Return:** 976.5% | **CAGR:** 19.2% | **Sharpe:** 0.84 | **MaxDD:** 56.7% | **Win:** 73% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### pl5_ev5_rankpl_t20
- **Return:** 985.7% | **CAGR:** 19.3% | **Sharpe:** 0.84 | **MaxDD:** 56.7% | **Win:** 73% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```

### pl8_ev8
- **Return:** 2304.8% | **CAGR:** 26.6% | **Sharpe:** 1.24 | **MaxDD:** 34.6% | **Win:** 76% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### pl8_ev8_t20
- **Return:** 2065.4% | **CAGR:** 25.6% | **Sharpe:** 1.18 | **MaxDD:** 34.6% | **Win:** 76% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### pl10_ev10
- **Return:** 2009.2% | **CAGR:** 25.3% | **Sharpe:** 1.19 | **MaxDD:** 35.9% | **Win:** 75% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND ev_ebit > 0 AND ev_ebit < 10 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### pl10_ev10_t20
- **Return:** 1596.4% | **CAGR:** 23.3% | **Sharpe:** 1.06 | **MaxDD:** 38.5% | **Win:** 71% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND ev_ebit > 0 AND ev_ebit < 10 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### pl3_ev3
- **Return:** 129.2% | **CAGR:** 6.3% | **Sharpe:** 0.46 | **MaxDD:** 40.6% | **Win:** 54% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 3 AND ev_ebit > 0 AND ev_ebit < 3 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### pl3_ev3_t20
- **Return:** 129.2% | **CAGR:** 6.3% | **Sharpe:** 0.46 | **MaxDD:** 40.6% | **Win:** 54% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 3 AND ev_ebit > 0 AND ev_ebit < 3 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### pl5_pvp1
- **Return:** 1453.4% | **CAGR:** 22.5% | **Sharpe:** 0.98 | **MaxDD:** 37.6% | **Win:** 64% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND pvp_ratio > 0 AND pvp_ratio < 1 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### pl5_pvp1_t20
- **Return:** 2586.6% | **CAGR:** 27.6% | **Sharpe:** 1.13 | **MaxDD:** 38.1% | **Win:** 73% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND pvp_ratio > 0 AND pvp_ratio < 1 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```

### pl8_pvp15
- **Return:** 1279.0% | **CAGR:** 21.5% | **Sharpe:** 0.95 | **MaxDD:** 37.6% | **Win:** 64% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND pvp_ratio > 0 AND pvp_ratio < 1.5 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### pl8_pvp15_t20
- **Return:** 1853.4% | **CAGR:** 24.6% | **Sharpe:** 1.01 | **MaxDD:** 41.2% | **Win:** 65% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND pvp_ratio > 0 AND pvp_ratio < 1.5 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```

### ev5_pvp1
- **Return:** 1016.1% | **CAGR:** 19.6% | **Sharpe:** 0.86 | **MaxDD:** 56.7% | **Win:** 73% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 5 AND pvp_ratio > 0 AND pvp_ratio < 1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### ev5_pvp1_t20
- **Return:** 1026.7% | **CAGR:** 19.6% | **Sharpe:** 0.86 | **MaxDD:** 56.7% | **Win:** 73% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 5 AND pvp_ratio > 0 AND pvp_ratio < 1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### ev8_pvp15
- **Return:** 2486.9% | **CAGR:** 27.2% | **Sharpe:** 1.24 | **MaxDD:** 31.1% | **Win:** 78% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 8 AND pvp_ratio > 0 AND pvp_ratio < 1.5 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### ev8_pvp15_t20
- **Return:** 2259.5% | **CAGR:** 26.4% | **Sharpe:** 1.23 | **MaxDD:** 31.1% | **Win:** 76% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 8 AND pvp_ratio > 0 AND pvp_ratio < 1.5 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### pl5_ps1
- **Return:** 1397.6% | **CAGR:** 22.2% | **Sharpe:** 0.96 | **MaxDD:** 37.6% | **Win:** 67% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND price_to_sales > 0 AND price_to_sales < 1 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### pl5_ps1_t20
- **Return:** 2385.7% | **CAGR:** 26.9% | **Sharpe:** 1.09 | **MaxDD:** 41.8% | **Win:** 71% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND price_to_sales > 0 AND price_to_sales < 1 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```

### ev5_ps1
- **Return:** 1438.5% | **CAGR:** 22.4% | **Sharpe:** 0.88 | **MaxDD:** 60.2% | **Win:** 76% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 5 AND price_to_sales > 0 AND price_to_sales < 1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### ev5_ps1_t20
- **Return:** 1339.4% | **CAGR:** 21.8% | **Sharpe:** 0.86 | **MaxDD:** 60.2% | **Win:** 76% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 5 AND price_to_sales > 0 AND price_to_sales < 1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```


---
## 3. Value + Quality (margins)

### pl5_ev5_ml5
- **Return:** 1182.3% | **CAGR:** 20.8% | **Sharpe:** 0.87 | **MaxDD:** 56.7% | **Win:** 73% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND margem_liquida > 0.05 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### pl5_ev5_ml5_t20
- **Return:** 1061.8% | **CAGR:** 19.9% | **Sharpe:** 0.84 | **MaxDD:** 56.7% | **Win:** 73% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND margem_liquida > 0.05 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### pl5_ev5_ml10
- **Return:** 1020.0% | **CAGR:** 19.6% | **Sharpe:** 0.83 | **MaxDD:** 56.7% | **Win:** 73% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND margem_liquida > 0.1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### pl5_ev5_ml10_t20
- **Return:** 975.8% | **CAGR:** 19.2% | **Sharpe:** 0.82 | **MaxDD:** 56.7% | **Win:** 73% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND margem_liquida > 0.1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### pl5_ev5_ml10_rankpl
- **Return:** 1002.7% | **CAGR:** 19.5% | **Sharpe:** 0.82 | **MaxDD:** 56.7% | **Win:** 73% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND margem_liquida > 0.1 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### pl5_ev5_ml10_rankpl_t20
- **Return:** 975.8% | **CAGR:** 19.2% | **Sharpe:** 0.82 | **MaxDD:** 56.7% | **Win:** 73% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND margem_liquida > 0.1 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```

### pl5_ev5_ml15
- **Return:** 503.8% | **CAGR:** 14.2% | **Sharpe:** 0.62 | **MaxDD:** 60.7% | **Win:** 67% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND margem_liquida > 0.15 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### pl5_ev5_ml15_t20
- **Return:** 511.1% | **CAGR:** 14.3% | **Sharpe:** 0.63 | **MaxDD:** 60.7% | **Win:** 65% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND margem_liquida > 0.15 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### pl5_ev5_ml20
- **Return:** 732.3% | **CAGR:** 17.0% | **Sharpe:** 0.72 | **MaxDD:** 56.7% | **Win:** 68% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND margem_liquida > 0.2 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### pl5_ev5_ml20_t20
- **Return:** 753.4% | **CAGR:** 17.2% | **Sharpe:** 0.73 | **MaxDD:** 56.7% | **Win:** 68% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND margem_liquida > 0.2 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### pl5_ev8_ml10_rankpl
- **Return:** 1788.0% | **CAGR:** 24.3% | **Sharpe:** 1.14 | **MaxDD:** 33.8% | **Win:** 73% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 8 AND margem_liquida > 0.1 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### pl5_ev8_ml10_rankpl_t20
- **Return:** 2418.0% | **CAGR:** 27.0% | **Sharpe:** 1.21 | **MaxDD:** 33.8% | **Win:** 73% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 8 AND margem_liquida > 0.1 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```

### pl8_ev8_ml10
- **Return:** 2486.9% | **CAGR:** 27.2% | **Sharpe:** 1.20 | **MaxDD:** 34.6% | **Win:** 75% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND margem_liquida > 0.1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### pl8_ev8_ml10_t20
- **Return:** 1809.6% | **CAGR:** 24.4% | **Sharpe:** 1.11 | **MaxDD:** 34.6% | **Win:** 71% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND margem_liquida > 0.1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### pl10_ev10_ml10
- **Return:** 2265.1% | **CAGR:** 26.4% | **Sharpe:** 1.18 | **MaxDD:** 35.9% | **Win:** 78% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND ev_ebit > 0 AND ev_ebit < 10 AND margem_liquida > 0.1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### pl10_ev10_ml10_t20
- **Return:** 1615.2% | **CAGR:** 23.4% | **Sharpe:** 1.06 | **MaxDD:** 38.9% | **Win:** 75% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND ev_ebit > 0 AND ev_ebit < 10 AND margem_liquida > 0.1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### pl8_ev8_mb30
- **Return:** 2069.1% | **CAGR:** 25.6% | **Sharpe:** 1.10 | **MaxDD:** 45.2% | **Win:** 73% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND margem_bruta > 0.3 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### pl8_ev8_mb30_t20
- **Return:** 1644.1% | **CAGR:** 23.6% | **Sharpe:** 1.02 | **MaxDD:** 45.2% | **Win:** 71% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND margem_bruta > 0.3 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### pl8_ev8_mb40
- **Return:** 1679.5% | **CAGR:** 23.8% | **Sharpe:** 0.99 | **MaxDD:** 45.2% | **Win:** 67% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND margem_bruta > 0.4 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### pl8_ev8_mb40_t20
- **Return:** 1743.8% | **CAGR:** 24.1% | **Sharpe:** 1.01 | **MaxDD:** 45.2% | **Win:** 67% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND margem_bruta > 0.4 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### ev8_mb30
- **Return:** 2043.1% | **CAGR:** 25.5% | **Sharpe:** 1.08 | **MaxDD:** 45.2% | **Win:** 73% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 8 AND margem_bruta > 0.3 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### ev8_mb30_t20
- **Return:** 1588.9% | **CAGR:** 23.3% | **Sharpe:** 1.00 | **MaxDD:** 45.2% | **Win:** 71% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 8 AND margem_bruta > 0.3 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### pl8_ev8_me15
- **Return:** 2771.6% | **CAGR:** 28.2% | **Sharpe:** 1.24 | **MaxDD:** 33.8% | **Win:** 78% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND margem_ebit > 0.15 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### pl8_ev8_me15_t20
- **Return:** 2094.9% | **CAGR:** 25.7% | **Sharpe:** 1.18 | **MaxDD:** 33.8% | **Win:** 76% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND margem_ebit > 0.15 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### pl10_ev10_me20
- **Return:** 1658.0% | **CAGR:** 23.7% | **Sharpe:** 1.05 | **MaxDD:** 40.2% | **Win:** 76% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND ev_ebit > 0 AND ev_ebit < 10 AND margem_ebit > 0.2 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### pl10_ev10_me20_t20
- **Return:** 1156.9% | **CAGR:** 20.6% | **Sharpe:** 0.94 | **MaxDD:** 40.2% | **Win:** 73% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND ev_ebit > 0 AND ev_ebit < 10 AND margem_ebit > 0.2 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### ev5_me15
- **Return:** 810.3% | **CAGR:** 17.8% | **Sharpe:** 0.76 | **MaxDD:** 56.7% | **Win:** 71% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 5 AND margem_ebit > 0.15 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### ev5_me15_t20
- **Return:** 718.8% | **CAGR:** 16.9% | **Sharpe:** 0.73 | **MaxDD:** 56.7% | **Win:** 69% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 5 AND margem_ebit > 0.15 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### ev8_me20
- **Return:** 1900.1% | **CAGR:** 24.8% | **Sharpe:** 1.09 | **MaxDD:** 36.2% | **Win:** 73% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 8 AND margem_ebit > 0.2 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### ev8_me20_t20
- **Return:** 1549.7% | **CAGR:** 23.1% | **Sharpe:** 1.03 | **MaxDD:** 36.2% | **Win:** 69% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 8 AND margem_ebit > 0.2 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### ps1_ml10
- **Return:** 2424.8% | **CAGR:** 27.0% | **Sharpe:** 1.08 | **MaxDD:** 40.0% | **Win:** 69% | **Top:** 10
```
bun backtest --filter "price_to_sales > 0 AND price_to_sales < 1 AND margem_liquida > 0.1 AND avg_daily_liquidity > 1e6" --rank "price_to_sales ASC" --top 10
```

### ps1_ml10_t20
- **Return:** 2683.1% | **CAGR:** 27.9% | **Sharpe:** 1.16 | **MaxDD:** 40.6% | **Win:** 73% | **Top:** 20
```
bun backtest --filter "price_to_sales > 0 AND price_to_sales < 1 AND margem_liquida > 0.1 AND avg_daily_liquidity > 1e6" --rank "price_to_sales ASC" --top 20
```

### ps1_ml15
- **Return:** 2585.1% | **CAGR:** 27.6% | **Sharpe:** 1.08 | **MaxDD:** 46.0% | **Win:** 75% | **Top:** 10
```
bun backtest --filter "price_to_sales > 0 AND price_to_sales < 1 AND margem_liquida > 0.15 AND avg_daily_liquidity > 1e6" --rank "price_to_sales ASC" --top 10
```

### ps1_ml15_t20
- **Return:** 2541.2% | **CAGR:** 27.4% | **Sharpe:** 1.09 | **MaxDD:** 46.0% | **Win:** 75% | **Top:** 20
```
bun backtest --filter "price_to_sales > 0 AND price_to_sales < 1 AND margem_liquida > 0.15 AND avg_daily_liquidity > 1e6" --rank "price_to_sales ASC" --top 20
```

### ps05_ml10
- **Return:** 2113.9% | **CAGR:** 25.8% | **Sharpe:** 1.01 | **MaxDD:** 31.8% | **Win:** 64% | **Top:** 10
```
bun backtest --filter "price_to_sales > 0 AND price_to_sales < 0.5 AND margem_liquida > 0.1 AND avg_daily_liquidity > 1e6" --rank "price_to_sales ASC" --top 10
```

### ps05_ml10_t20
- **Return:** 2454.5% | **CAGR:** 27.1% | **Sharpe:** 1.08 | **MaxDD:** 31.8% | **Win:** 67% | **Top:** 20
```
bun backtest --filter "price_to_sales > 0 AND price_to_sales < 0.5 AND margem_liquida > 0.1 AND avg_daily_liquidity > 1e6" --rank "price_to_sales ASC" --top 20
```

### ps2_ml10
- **Return:** 1951.8% | **CAGR:** 25.1% | **Sharpe:** 1.02 | **MaxDD:** 40.0% | **Win:** 69% | **Top:** 10
```
bun backtest --filter "price_to_sales > 0 AND price_to_sales < 2 AND margem_liquida > 0.1 AND avg_daily_liquidity > 1e6" --rank "price_to_sales ASC" --top 10
```

### ps2_ml10_t20
- **Return:** 2055.0% | **CAGR:** 25.5% | **Sharpe:** 1.09 | **MaxDD:** 40.8% | **Win:** 73% | **Top:** 20
```
bun backtest --filter "price_to_sales > 0 AND price_to_sales < 2 AND margem_liquida > 0.1 AND avg_daily_liquidity > 1e6" --rank "price_to_sales ASC" --top 20
```

### ps1_mb30
- **Return:** 1028.7% | **CAGR:** 19.7% | **Sharpe:** 0.72 | **MaxDD:** 52.4% | **Win:** 67% | **Top:** 10
```
bun backtest --filter "price_to_sales > 0 AND price_to_sales < 1 AND margem_bruta > 0.3 AND avg_daily_liquidity > 1e6" --rank "price_to_sales ASC" --top 10
```

### ps1_mb30_t20
- **Return:** 1414.4% | **CAGR:** 22.3% | **Sharpe:** 0.82 | **MaxDD:** 52.4% | **Win:** 67% | **Top:** 20
```
bun backtest --filter "price_to_sales > 0 AND price_to_sales < 1 AND margem_bruta > 0.3 AND avg_daily_liquidity > 1e6" --rank "price_to_sales ASC" --top 20
```

### ps1_me15
- **Return:** 2714.8% | **CAGR:** 28.0% | **Sharpe:** 1.02 | **MaxDD:** 37.1% | **Win:** 69% | **Top:** 10
```
bun backtest --filter "price_to_sales > 0 AND price_to_sales < 1 AND margem_ebit > 0.15 AND avg_daily_liquidity > 1e6" --rank "price_to_sales ASC" --top 10
```

### ps1_me15_t20
- **Return:** 3029.4% | **CAGR:** 29.1% | **Sharpe:** 1.16 | **MaxDD:** 37.1% | **Win:** 69% | **Top:** 20
```
bun backtest --filter "price_to_sales > 0 AND price_to_sales < 1 AND margem_ebit > 0.15 AND avg_daily_liquidity > 1e6" --rank "price_to_sales ASC" --top 20
```


---
## 4. Value + ROE/ROA (Greenblatt style)

### ev10_roe10
- **Return:** 2307.7% | **CAGR:** 26.6% | **Sharpe:** 1.15 | **MaxDD:** 36.9% | **Win:** 73% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 10 AND roe > 0.1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### ev10_roe10_t20
- **Return:** 1542.0% | **CAGR:** 23.0% | **Sharpe:** 1.04 | **MaxDD:** 37.9% | **Win:** 71% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 10 AND roe > 0.1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### ev15_roe10
- **Return:** 2259.9% | **CAGR:** 26.4% | **Sharpe:** 1.15 | **MaxDD:** 36.9% | **Win:** 73% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 15 AND roe > 0.1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### ev15_roe10_t20
- **Return:** 1229.6% | **CAGR:** 21.1% | **Sharpe:** 0.98 | **MaxDD:** 34.8% | **Win:** 71% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 15 AND roe > 0.1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### ev8_roe15
- **Return:** 2015.4% | **CAGR:** 25.4% | **Sharpe:** 1.12 | **MaxDD:** 46.4% | **Win:** 73% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 8 AND roe > 0.15 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### ev8_roe15_t20
- **Return:** 1741.5% | **CAGR:** 24.1% | **Sharpe:** 1.08 | **MaxDD:** 46.4% | **Win:** 76% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 8 AND roe > 0.15 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### ev5_roe20
- **Return:** 322.7% | **CAGR:** 11.3% | **Sharpe:** 0.59 | **MaxDD:** 56.7% | **Win:** 70% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 5 AND roe > 0.2 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### ev5_roe20_t20
- **Return:** 264.2% | **CAGR:** 10.0% | **Sharpe:** 0.54 | **MaxDD:** 56.7% | **Win:** 70% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 5 AND roe > 0.2 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### ev10_roe15_rankroe
- **Return:** 1758.2% | **CAGR:** 24.2% | **Sharpe:** 1.05 | **MaxDD:** 42.5% | **Win:** 73% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 10 AND roe > 0.15 AND avg_daily_liquidity > 1e6" --rank "roe DESC" --top 10
```

### ev10_roe15_rankroe_t20
- **Return:** 1552.0% | **CAGR:** 23.1% | **Sharpe:** 1.02 | **MaxDD:** 42.5% | **Win:** 69% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 10 AND roe > 0.15 AND avg_daily_liquidity > 1e6" --rank "roe DESC" --top 20
```

### pl10_roe10
- **Return:** 1800.5% | **CAGR:** 24.4% | **Sharpe:** 0.99 | **MaxDD:** 38.9% | **Win:** 62% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND roe > 0.1 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### pl10_roe10_t20
- **Return:** 1645.6% | **CAGR:** 23.6% | **Sharpe:** 1.01 | **MaxDD:** 38.7% | **Win:** 67% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND roe > 0.1 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```

### pl10_roe15
- **Return:** 1911.9% | **CAGR:** 24.9% | **Sharpe:** 1.05 | **MaxDD:** 45.4% | **Win:** 78% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND roe > 0.15 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### pl10_roe15_t20
- **Return:** 1596.4% | **CAGR:** 23.3% | **Sharpe:** 1.05 | **MaxDD:** 42.0% | **Win:** 73% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND roe > 0.15 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```

### pl5_roe15
- **Return:** 1817.3% | **CAGR:** 24.5% | **Sharpe:** 1.05 | **MaxDD:** 47.6% | **Win:** 73% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND roe > 0.15 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### pl5_roe15_t20
- **Return:** 1573.4% | **CAGR:** 23.2% | **Sharpe:** 1.04 | **MaxDD:** 47.6% | **Win:** 71% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND roe > 0.15 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```

### pl15_roe20
- **Return:** 1051.6% | **CAGR:** 19.8% | **Sharpe:** 0.91 | **MaxDD:** 41.3% | **Win:** 73% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 15 AND roe > 0.2 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### pl15_roe20_t20
- **Return:** 773.8% | **CAGR:** 17.4% | **Sharpe:** 0.83 | **MaxDD:** 41.3% | **Win:** 73% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 15 AND roe > 0.2 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```

### pl15_roe25
- **Return:** 499.1% | **CAGR:** 14.2% | **Sharpe:** 0.69 | **MaxDD:** 44.1% | **Win:** 64% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 15 AND roe > 0.25 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### pl15_roe25_t20
- **Return:** 352.1% | **CAGR:** 11.8% | **Sharpe:** 0.60 | **MaxDD:** 44.1% | **Win:** 65% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 15 AND roe > 0.25 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```

### ev10_roa10
- **Return:** 921.3% | **CAGR:** 18.8% | **Sharpe:** 0.84 | **MaxDD:** 51.8% | **Win:** 71% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 10 AND roa > 0.1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### ev10_roa10_t20
- **Return:** 767.5% | **CAGR:** 17.4% | **Sharpe:** 0.79 | **MaxDD:** 51.8% | **Win:** 73% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 10 AND roa > 0.1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### pl10_roa10
- **Return:** 661.8% | **CAGR:** 16.2% | **Sharpe:** 0.76 | **MaxDD:** 47.3% | **Win:** 67% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND roa > 0.1 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### pl10_roa10_t20
- **Return:** 690.1% | **CAGR:** 16.5% | **Sharpe:** 0.77 | **MaxDD:** 47.3% | **Win:** 69% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND roa > 0.1 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```

### ev8_roa15
- **Return:** 235.4% | **CAGR:** 9.4% | **Sharpe:** 0.58 | **MaxDD:** 59.6% | **Win:** 60% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 8 AND roa > 0.15 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### ev8_roa15_t20
- **Return:** 227.2% | **CAGR:** 9.2% | **Sharpe:** 0.57 | **MaxDD:** 59.6% | **Win:** 60% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 8 AND roa > 0.15 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### pvp15_roe10
- **Return:** 1918.9% | **CAGR:** 24.9% | **Sharpe:** 1.03 | **MaxDD:** 34.4% | **Win:** 71% | **Top:** 10
```
bun backtest --filter "pvp_ratio > 0 AND pvp_ratio < 1.5 AND roe > 0.1 AND avg_daily_liquidity > 1e6" --rank "pvp_ratio ASC" --top 10
```

### pvp15_roe10_t20
- **Return:** 1611.0% | **CAGR:** 23.4% | **Sharpe:** 0.98 | **MaxDD:** 36.8% | **Win:** 65% | **Top:** 20
```
bun backtest --filter "pvp_ratio > 0 AND pvp_ratio < 1.5 AND roe > 0.1 AND avg_daily_liquidity > 1e6" --rank "pvp_ratio ASC" --top 20
```

### pvp1_roe15
- **Return:** 1867.8% | **CAGR:** 24.7% | **Sharpe:** 1.03 | **MaxDD:** 45.1% | **Win:** 80% | **Top:** 10
```
bun backtest --filter "pvp_ratio > 0 AND pvp_ratio < 1 AND roe > 0.15 AND avg_daily_liquidity > 1e6" --rank "pvp_ratio ASC" --top 10
```

### pvp1_roe15_t20
- **Return:** 2014.8% | **CAGR:** 25.4% | **Sharpe:** 1.08 | **MaxDD:** 45.1% | **Win:** 78% | **Top:** 20
```
bun backtest --filter "pvp_ratio > 0 AND pvp_ratio < 1 AND roe > 0.15 AND avg_daily_liquidity > 1e6" --rank "pvp_ratio ASC" --top 20
```

### pvp2_roe20
- **Return:** 842.6% | **CAGR:** 18.1% | **Sharpe:** 0.80 | **MaxDD:** 51.1% | **Win:** 64% | **Top:** 10
```
bun backtest --filter "pvp_ratio > 0 AND pvp_ratio < 2 AND roe > 0.2 AND avg_daily_liquidity > 1e6" --rank "pvp_ratio ASC" --top 10
```

### pvp2_roe20_t20
- **Return:** 801.2% | **CAGR:** 17.7% | **Sharpe:** 0.80 | **MaxDD:** 51.1% | **Win:** 64% | **Top:** 20
```
bun backtest --filter "pvp_ratio > 0 AND pvp_ratio < 2 AND roe > 0.2 AND avg_daily_liquidity > 1e6" --rank "pvp_ratio ASC" --top 20
```


---
## 5. Value + Balance Sheet (debt, liquidity ratio)

### pl10_lowdebt2
- **Return:** 803.1% | **CAGR:** 17.7% | **Sharpe:** 0.77 | **MaxDD:** 47.5% | **Win:** 69% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND divida_liquida_ebit > 0 AND divida_liquida_ebit < 2 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### pl10_lowdebt2_t20
- **Return:** 719.6% | **CAGR:** 16.9% | **Sharpe:** 0.74 | **MaxDD:** 47.5% | **Win:** 67% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND divida_liquida_ebit > 0 AND divida_liquida_ebit < 2 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```

### ev8_lowdebt2
- **Return:** 1702.5% | **CAGR:** 23.9% | **Sharpe:** 1.08 | **MaxDD:** 32.3% | **Win:** 63% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 8 AND divida_liquida_ebit > 0 AND divida_liquida_ebit < 2 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### ev8_lowdebt2_t20
- **Return:** 1996.4% | **CAGR:** 25.3% | **Sharpe:** 1.13 | **MaxDD:** 32.3% | **Win:** 62% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 8 AND divida_liquida_ebit > 0 AND divida_liquida_ebit < 2 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### ev8_lowdebt1
- **Return:** 78.1% | **CAGR:** 4.4% | **Sharpe:** 0.38 | **MaxDD:** 45.1% | **Win:** 61% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 8 AND divida_liquida_ebit > 0 AND divida_liquida_ebit < 1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### ev8_lowdebt1_t20
- **Return:** 78.1% | **CAGR:** 4.4% | **Sharpe:** 0.38 | **MaxDD:** 45.1% | **Win:** 61% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 8 AND divida_liquida_ebit > 0 AND divida_liquida_ebit < 1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### pl10_nodebt
- **Return:** 98.2% | **CAGR:** 10.7% | **Sharpe:** 0.65 | **MaxDD:** 34.0% | **Win:** 53% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND divida_liquida_ebit < 0 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### pl10_nodebt_t20
- **Return:** 98.2% | **CAGR:** 10.7% | **Sharpe:** 0.65 | **MaxDD:** 34.0% | **Win:** 53% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND divida_liquida_ebit < 0 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```

### ev10_nodebt
- **Return:** 184.4% | **CAGR:** 16.7% | **Sharpe:** 0.78 | **MaxDD:** 37.5% | **Win:** 55% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 10 AND divida_liquida_ebit < 0 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### ev10_nodebt_t20
- **Return:** 184.4% | **CAGR:** 16.7% | **Sharpe:** 0.78 | **MaxDD:** 37.5% | **Win:** 55% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 10 AND divida_liquida_ebit < 0 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### pl8_nodebt_roe10
- **Return:** 64.6% | **CAGR:** 8.0% | **Sharpe:** 0.60 | **MaxDD:** 24.1% | **Win:** 57% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND divida_liquida_ebit < 0 AND roe > 0.1 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### pl8_nodebt_roe10_t20
- **Return:** 64.6% | **CAGR:** 8.0% | **Sharpe:** 0.60 | **MaxDD:** 24.1% | **Win:** 57% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND divida_liquida_ebit < 0 AND roe > 0.1 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```

### pl10_liq15
- **Return:** 1391.4% | **CAGR:** 22.2% | **Sharpe:** 0.95 | **MaxDD:** 36.9% | **Win:** 67% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND liquidez_corrente > 1.5 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### pl10_liq15_t20
- **Return:** 1200.6% | **CAGR:** 20.9% | **Sharpe:** 0.88 | **MaxDD:** 40.6% | **Win:** 62% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND liquidez_corrente > 1.5 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```

### pl10_liq2
- **Return:** 1087.4% | **CAGR:** 20.1% | **Sharpe:** 0.83 | **MaxDD:** 41.4% | **Win:** 60% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND liquidez_corrente > 2 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### pl10_liq2_t20
- **Return:** 1124.7% | **CAGR:** 20.4% | **Sharpe:** 0.84 | **MaxDD:** 41.4% | **Win:** 64% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND liquidez_corrente > 2 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```

### ev8_liq15
- **Return:** 1485.6% | **CAGR:** 22.7% | **Sharpe:** 1.03 | **MaxDD:** 33.8% | **Win:** 71% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 8 AND liquidez_corrente > 1.5 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### ev8_liq15_t20
- **Return:** 1349.6% | **CAGR:** 21.9% | **Sharpe:** 1.02 | **MaxDD:** 33.8% | **Win:** 69% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 8 AND liquidez_corrente > 1.5 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### ev8_liq2
- **Return:** 2147.0% | **CAGR:** 25.9% | **Sharpe:** 1.10 | **MaxDD:** 31.9% | **Win:** 71% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 8 AND liquidez_corrente > 2 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### ev8_liq2_t20
- **Return:** 1877.6% | **CAGR:** 24.7% | **Sharpe:** 1.07 | **MaxDD:** 31.9% | **Win:** 71% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 8 AND liquidez_corrente > 2 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### pl8_ev8_cf
- **Return:** 2329.2% | **CAGR:** 26.7% | **Sharpe:** 1.25 | **MaxDD:** 34.6% | **Win:** 76% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND fluxo_caixa_op_ttm > 0 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### pl8_ev8_cf_t20
- **Return:** 2142.7% | **CAGR:** 25.9% | **Sharpe:** 1.21 | **MaxDD:** 34.6% | **Win:** 75% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND fluxo_caixa_op_ttm > 0 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### ev10_cf
- **Return:** 2029.1% | **CAGR:** 25.4% | **Sharpe:** 1.20 | **MaxDD:** 35.9% | **Win:** 75% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 10 AND fluxo_caixa_op_ttm > 0 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### ev10_cf_t20
- **Return:** 1479.8% | **CAGR:** 22.7% | **Sharpe:** 1.06 | **MaxDD:** 38.0% | **Win:** 69% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 10 AND fluxo_caixa_op_ttm > 0 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```


---
## 6. Multi-factor (3+ filters)

### mf_val_qual1
- **Return:** 2318.0% | **CAGR:** 26.6% | **Sharpe:** 1.13 | **MaxDD:** 46.4% | **Win:** 78% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND roe > 0.15 AND margem_liquida > 0.1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### mf_val_qual1_t20
- **Return:** 1655.2% | **CAGR:** 23.6% | **Sharpe:** 1.03 | **MaxDD:** 46.4% | **Win:** 76% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND roe > 0.15 AND margem_liquida > 0.1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### mf_val_qual2
- **Return:** 1993.9% | **CAGR:** 25.3% | **Sharpe:** 1.13 | **MaxDD:** 36.9% | **Win:** 73% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND ev_ebit > 0 AND ev_ebit < 10 AND roe > 0.1 AND margem_liquida > 0.05 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### mf_val_qual2_t20
- **Return:** 1454.9% | **CAGR:** 22.5% | **Sharpe:** 1.03 | **MaxDD:** 37.9% | **Win:** 69% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND ev_ebit > 0 AND ev_ebit < 10 AND roe > 0.1 AND margem_liquida > 0.05 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### mf_val_qual_liq
- **Return:** 2549.3% | **CAGR:** 27.5% | **Sharpe:** 1.15 | **MaxDD:** 24.6% | **Win:** 70% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND roe > 0.1 AND margem_liquida > 0.1 AND liquidez_corrente > 1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### mf_val_qual_liq_t20
- **Return:** 2389.2% | **CAGR:** 26.9% | **Sharpe:** 1.13 | **MaxDD:** 24.6% | **Win:** 70% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND roe > 0.1 AND margem_liquida > 0.1 AND liquidez_corrente > 1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### mf_val_qual_liq_pl
- **Return:** 2619.8% | **CAGR:** 27.7% | **Sharpe:** 1.16 | **MaxDD:** 24.6% | **Win:** 70% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND roe > 0.1 AND margem_liquida > 0.1 AND liquidez_corrente > 1 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### mf_val_qual_liq_pl_t20
- **Return:** 2389.2% | **CAGR:** 26.9% | **Sharpe:** 1.13 | **MaxDD:** 24.6% | **Win:** 70% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND roe > 0.1 AND margem_liquida > 0.1 AND liquidez_corrente > 1 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```

### mf_kitchen_sink
- **Return:** 1941.1% | **CAGR:** 25.0% | **Sharpe:** 1.05 | **MaxDD:** 51.5% | **Win:** 76% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND roe > 0.1 AND margem_liquida > 0.05 AND liquidez_corrente > 1 AND divida_liquida_ebit < 3 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### mf_kitchen_sink_t20
- **Return:** 1638.5% | **CAGR:** 23.6% | **Sharpe:** 1.01 | **MaxDD:** 51.5% | **Win:** 76% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND roe > 0.1 AND margem_liquida > 0.05 AND liquidez_corrente > 1 AND divida_liquida_ebit < 3 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### mf_val_qual_pvp
- **Return:** 1024.6% | **CAGR:** 19.6% | **Sharpe:** 0.81 | **MaxDD:** 56.7% | **Win:** 71% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND roe > 0.1 AND margem_liquida > 0.1 AND pvp_ratio > 0 AND pvp_ratio < 2 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### mf_val_qual_pvp_t20
- **Return:** 932.5% | **CAGR:** 18.9% | **Sharpe:** 0.78 | **MaxDD:** 56.7% | **Win:** 71% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND roe > 0.1 AND margem_liquida > 0.1 AND pvp_ratio > 0 AND pvp_ratio < 2 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```

### mf_mb_ml_roe
- **Return:** 1334.0% | **CAGR:** 21.8% | **Sharpe:** 0.96 | **MaxDD:** 45.1% | **Win:** 71% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND ev_ebit > 0 AND ev_ebit < 10 AND margem_bruta > 0.3 AND margem_liquida > 0.1 AND roe > 0.1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### mf_mb_ml_roe_t20
- **Return:** 1101.8% | **CAGR:** 20.2% | **Sharpe:** 0.91 | **MaxDD:** 45.1% | **Win:** 71% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND ev_ebit > 0 AND ev_ebit < 10 AND margem_bruta > 0.3 AND margem_liquida > 0.1 AND roe > 0.1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### mf_val_roe_debt
- **Return:** 272.5% | **CAGR:** 10.2% | **Sharpe:** 0.54 | **MaxDD:** 64.1% | **Win:** 72% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND roe > 0.2 AND margem_liquida > 0.15 AND divida_liquida_ebit < 3 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### mf_val_roe_debt_t20
- **Return:** 245.1% | **CAGR:** 9.6% | **Sharpe:** 0.52 | **MaxDD:** 64.1% | **Win:** 70% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND roe > 0.2 AND margem_liquida > 0.15 AND divida_liquida_ebit < 3 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```

### mf_ev_roe_mb_liq
- **Return:** 762.1% | **CAGR:** 17.3% | **Sharpe:** 0.77 | **MaxDD:** 62.4% | **Win:** 73% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 8 AND roe > 0.15 AND margem_bruta > 0.3 AND liquidez_corrente > 1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### mf_ev_roe_mb_liq_t20
- **Return:** 678.4% | **CAGR:** 16.4% | **Sharpe:** 0.75 | **MaxDD:** 62.4% | **Win:** 71% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 8 AND roe > 0.15 AND margem_bruta > 0.3 AND liquidez_corrente > 1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### mf_val_roe20_ml10
- **Return:** 377.5% | **CAGR:** 12.3% | **Sharpe:** 0.63 | **MaxDD:** 56.7% | **Win:** 67% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND roe > 0.2 AND margem_liquida > 0.1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### mf_val_roe20_ml10_t20
- **Return:** 346.4% | **CAGR:** 11.7% | **Sharpe:** 0.61 | **MaxDD:** 56.7% | **Win:** 67% | **Top:** 20
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
- **Return:** 1566.7% | **CAGR:** 23.2% | **Sharpe:** 1.04 | **MaxDD:** 38.5% | **Win:** 69% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND ev_ebit > 0 AND ev_ebit < 10 AND roe > 0 AND avg_daily_liquidity > 1e6" --rank "roe DESC" --top 20
```

### pl10_ev10_rank_ml
- **Return:** 749.4% | **CAGR:** 17.2% | **Sharpe:** 0.79 | **MaxDD:** 42.0% | **Win:** 69% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND ev_ebit > 0 AND ev_ebit < 10 AND margem_liquida > 0 AND avg_daily_liquidity > 1e6" --rank "margem_liquida DESC" --top 10
```

### pl10_ev10_rank_ml_t20
- **Return:** 1079.8% | **CAGR:** 20.1% | **Sharpe:** 0.93 | **MaxDD:** 38.5% | **Win:** 67% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND ev_ebit > 0 AND ev_ebit < 10 AND margem_liquida > 0 AND avg_daily_liquidity > 1e6" --rank "margem_liquida DESC" --top 20
```

### pl10_ev10_rank_pvp
- **Return:** 986.4% | **CAGR:** 19.3% | **Sharpe:** 0.80 | **MaxDD:** 40.9% | **Win:** 60% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND pvp_ratio > 0 AND avg_daily_liquidity > 1e6" --rank "pvp_ratio ASC" --top 10
```

### pl10_ev10_rank_pvp_t20
- **Return:** 1595.9% | **CAGR:** 23.3% | **Sharpe:** 0.94 | **MaxDD:** 39.4% | **Win:** 69% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND pvp_ratio > 0 AND avg_daily_liquidity > 1e6" --rank "pvp_ratio ASC" --top 20
```

### pl10_ev10_rank_ps
- **Return:** 763.3% | **CAGR:** 17.3% | **Sharpe:** 0.75 | **MaxDD:** 40.9% | **Win:** 64% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND price_to_sales > 0 AND avg_daily_liquidity > 1e6" --rank "price_to_sales ASC" --top 10
```

### pl10_ev10_rank_ps_t20
- **Return:** 1059.0% | **CAGR:** 19.9% | **Sharpe:** 0.83 | **MaxDD:** 42.1% | **Win:** 65% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND price_to_sales > 0 AND avg_daily_liquidity > 1e6" --rank "price_to_sales ASC" --top 20
```

### pl10_ev10_rank_roa
- **Return:** 1275.6% | **CAGR:** 21.4% | **Sharpe:** 0.99 | **MaxDD:** 38.9% | **Win:** 78% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 10 AND roa > 0 AND avg_daily_liquidity > 1e6" --rank "roa DESC" --top 10
```

### pl10_ev10_rank_roa_t20
- **Return:** 1458.5% | **CAGR:** 22.6% | **Sharpe:** 1.03 | **MaxDD:** 38.0% | **Win:** 71% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 10 AND roa > 0 AND avg_daily_liquidity > 1e6" --rank "roa DESC" --top 20
```

### ev8_me_rank_me
- **Return:** 1356.1% | **CAGR:** 21.9% | **Sharpe:** 1.00 | **MaxDD:** 34.6% | **Win:** 71% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 8 AND margem_ebit > 0.1 AND avg_daily_liquidity > 1e6" --rank "margem_ebit DESC" --top 10
```

### ev8_me_rank_me_t20
- **Return:** 1446.7% | **CAGR:** 22.5% | **Sharpe:** 1.07 | **MaxDD:** 34.6% | **Win:** 71% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 8 AND margem_ebit > 0.1 AND avg_daily_liquidity > 1e6" --rank "margem_ebit DESC" --top 20
```

### ev8_mb_rank_mb
- **Return:** 2068.9% | **CAGR:** 25.6% | **Sharpe:** 1.15 | **MaxDD:** 34.6% | **Win:** 73% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 8 AND margem_bruta > 0.2 AND avg_daily_liquidity > 1e6" --rank "margem_bruta DESC" --top 10
```

### ev8_mb_rank_mb_t20
- **Return:** 1884.1% | **CAGR:** 24.8% | **Sharpe:** 1.14 | **MaxDD:** 34.6% | **Win:** 76% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 8 AND margem_bruta > 0.2 AND avg_daily_liquidity > 1e6" --rank "margem_bruta DESC" --top 20
```

### pl5_rank_ev
- **Return:** 2240.8% | **CAGR:** 26.3% | **Sharpe:** 1.14 | **MaxDD:** 37.5% | **Win:** 73% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### pl5_rank_ev_t20
- **Return:** 1761.4% | **CAGR:** 24.2% | **Sharpe:** 1.08 | **MaxDD:** 39.4% | **Win:** 75% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### ev5_rank_pl
- **Return:** 973.1% | **CAGR:** 19.2% | **Sharpe:** 0.84 | **MaxDD:** 56.7% | **Win:** 75% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 5 AND pl_ratio > 0 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### ev5_rank_pl_t20
- **Return:** 1003.3% | **CAGR:** 19.5% | **Sharpe:** 0.84 | **MaxDD:** 56.7% | **Win:** 75% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 5 AND pl_ratio > 0 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```

### pl5_rank_roe
- **Return:** 1873.6% | **CAGR:** 24.7% | **Sharpe:** 1.03 | **MaxDD:** 43.7% | **Win:** 76% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND roe > 0 AND avg_daily_liquidity > 1e6" --rank "roe DESC" --top 10
```

### pl5_rank_roe_t20
- **Return:** 1870.2% | **CAGR:** 24.7% | **Sharpe:** 1.07 | **MaxDD:** 39.9% | **Win:** 73% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND roe > 0 AND avg_daily_liquidity > 1e6" --rank "roe DESC" --top 20
```

### pl5_rank_ml
- **Return:** 1248.5% | **CAGR:** 21.3% | **Sharpe:** 0.95 | **MaxDD:** 41.0% | **Win:** 67% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND margem_liquida > 0 AND avg_daily_liquidity > 1e6" --rank "margem_liquida DESC" --top 10
```

### pl5_rank_ml_t20
- **Return:** 1694.9% | **CAGR:** 23.8% | **Sharpe:** 1.03 | **MaxDD:** 39.9% | **Win:** 65% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND margem_liquida > 0 AND avg_daily_liquidity > 1e6" --rank "margem_liquida DESC" --top 20
```

### pl5_rank_pvp
- **Return:** 1496.3% | **CAGR:** 22.8% | **Sharpe:** 0.92 | **MaxDD:** 36.1% | **Win:** 60% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND pvp_ratio > 0 AND avg_daily_liquidity > 1e6" --rank "pvp_ratio ASC" --top 10
```

### pl5_rank_pvp_t20
- **Return:** 1900.0% | **CAGR:** 24.8% | **Sharpe:** 1.01 | **MaxDD:** 39.9% | **Win:** 67% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND pvp_ratio > 0 AND avg_daily_liquidity > 1e6" --rank "pvp_ratio ASC" --top 20
```


---
## 8. Size-constrained strategies

### mid_pl8_ev8
- **Return:** 1190.8% | **CAGR:** 20.9% | **Sharpe:** 1.03 | **MaxDD:** 28.9% | **Win:** 69% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND market_cap > 1e9 AND market_cap < 1e10 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### mid_pl8_ev8_t20
- **Return:** 1350.9% | **CAGR:** 21.9% | **Sharpe:** 1.07 | **MaxDD:** 28.9% | **Win:** 69% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND market_cap > 1e9 AND market_cap < 1e10 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### mid_ev10_roe10
- **Return:** 1458.1% | **CAGR:** 22.6% | **Sharpe:** 1.06 | **MaxDD:** 34.8% | **Win:** 67% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 10 AND roe > 0.1 AND market_cap > 1e9 AND market_cap < 1e10 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### mid_ev10_roe10_t20
- **Return:** 1320.2% | **CAGR:** 21.7% | **Sharpe:** 1.00 | **MaxDD:** 34.8% | **Win:** 67% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 10 AND roe > 0.1 AND market_cap > 1e9 AND market_cap < 1e10 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### notlarge_ev8
- **Return:** 1936.5% | **CAGR:** 25.0% | **Sharpe:** 1.13 | **MaxDD:** 34.6% | **Win:** 76% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 8 AND market_cap < 1e10 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### notlarge_ev8_t20
- **Return:** 1978.8% | **CAGR:** 25.2% | **Sharpe:** 1.16 | **MaxDD:** 34.6% | **Win:** 75% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 8 AND market_cap < 1e10 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### notlarge_pl8_ev8
- **Return:** 2344.3% | **CAGR:** 26.7% | **Sharpe:** 1.20 | **MaxDD:** 34.6% | **Win:** 76% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND market_cap < 1e10 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### notlarge_pl8_ev8_t20
- **Return:** 2263.6% | **CAGR:** 26.4% | **Sharpe:** 1.21 | **MaxDD:** 34.6% | **Win:** 75% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND market_cap < 1e10 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### large_ev10
- **Return:** 117.4% | **CAGR:** 5.9% | **Sharpe:** 0.53 | **MaxDD:** 39.8% | **Win:** 65% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 10 AND market_cap > 1e10 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### large_ev10_t20
- **Return:** 151.5% | **CAGR:** 7.1% | **Sharpe:** 0.60 | **MaxDD:** 39.8% | **Win:** 65% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 10 AND market_cap > 1e10 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### large_pl10_roe10
- **Return:** 461.7% | **CAGR:** 14.5% | **Sharpe:** 0.72 | **MaxDD:** 35.8% | **Win:** 69% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND roe > 0.1 AND market_cap > 1e10 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### large_pl10_roe10_t20
- **Return:** 477.3% | **CAGR:** 14.7% | **Sharpe:** 0.73 | **MaxDD:** 35.8% | **Win:** 71% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND roe > 0.1 AND market_cap > 1e10 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```


---
## 9. Yield / income oriented

### yield_pl5_ml15
- **Return:** 2582.2% | **CAGR:** 27.6% | **Sharpe:** 1.12 | **MaxDD:** 42.1% | **Win:** 65% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND margem_liquida > 0.15 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### yield_pl5_ml15_t20
- **Return:** 2122.0% | **CAGR:** 25.8% | **Sharpe:** 1.10 | **MaxDD:** 42.1% | **Win:** 67% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND margem_liquida > 0.15 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```

### yield_pl5_ml20
- **Return:** 1507.2% | **CAGR:** 22.8% | **Sharpe:** 0.97 | **MaxDD:** 39.5% | **Win:** 67% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND margem_liquida > 0.2 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### yield_pl5_ml20_t20
- **Return:** 1586.3% | **CAGR:** 23.3% | **Sharpe:** 0.97 | **MaxDD:** 39.5% | **Win:** 67% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND margem_liquida > 0.2 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```

### yield_pl5_roe20_ml10
- **Return:** 1218.9% | **CAGR:** 21.1% | **Sharpe:** 0.94 | **MaxDD:** 48.4% | **Win:** 70% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND roe > 0.2 AND margem_liquida > 0.1 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### yield_pl5_roe20_ml10_t20
- **Return:** 1273.1% | **CAGR:** 21.4% | **Sharpe:** 0.94 | **MaxDD:** 48.4% | **Win:** 70% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND roe > 0.2 AND margem_liquida > 0.1 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```

### yield_pl8_roe15_ml10_debt2
- **Return:** 1881.0% | **CAGR:** 24.8% | **Sharpe:** 1.05 | **MaxDD:** 32.3% | **Win:** 65% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND roe > 0.15 AND margem_liquida > 0.1 AND divida_liquida_ebit > 0 AND divida_liquida_ebit < 2 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### yield_pl8_roe15_ml10_debt2_t20
- **Return:** 1743.4% | **CAGR:** 24.1% | **Sharpe:** 1.03 | **MaxDD:** 32.3% | **Win:** 65% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND roe > 0.15 AND margem_liquida > 0.1 AND divida_liquida_ebit > 0 AND divida_liquida_ebit < 2 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```


---
## 10. Wide value + high quality (GARP)

### garp_pl15_roe25_ml15
- **Return:** 217.8% | **CAGR:** 8.9% | **Sharpe:** 0.49 | **MaxDD:** 48.0% | **Win:** 67% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 15 AND roe > 0.25 AND margem_liquida > 0.15 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### garp_pl15_roe25_ml15_t20
- **Return:** 188.3% | **CAGR:** 8.2% | **Sharpe:** 0.46 | **MaxDD:** 48.0% | **Win:** 65% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 15 AND roe > 0.25 AND margem_liquida > 0.15 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```

### garp_ev15_roe20_me20
- **Return:** 509.5% | **CAGR:** 14.3% | **Sharpe:** 0.68 | **MaxDD:** 39.4% | **Win:** 64% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 15 AND roe > 0.2 AND margem_ebit > 0.2 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### garp_ev15_roe20_me20_t20
- **Return:** 449.6% | **CAGR:** 13.5% | **Sharpe:** 0.67 | **MaxDD:** 39.4% | **Win:** 62% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 15 AND roe > 0.2 AND margem_ebit > 0.2 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### garp_pl12_roe20_mb40_liq15
- **Return:** 87.5% | **CAGR:** 4.8% | **Sharpe:** 0.38 | **MaxDD:** 66.0% | **Win:** 66% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 12 AND roe > 0.2 AND margem_bruta > 0.4 AND liquidez_corrente > 1.5 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### garp_pl12_roe20_mb40_liq15_t20
- **Return:** 73.7% | **CAGR:** 4.2% | **Sharpe:** 0.36 | **MaxDD:** 66.0% | **Win:** 66% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 12 AND roe > 0.2 AND margem_bruta > 0.4 AND liquidez_corrente > 1.5 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```

### garp_ev10_roe15_ml10_liq1
- **Return:** 1999.9% | **CAGR:** 25.3% | **Sharpe:** 1.10 | **MaxDD:** 41.8% | **Win:** 75% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 10 AND roe > 0.15 AND margem_liquida > 0.1 AND liquidez_corrente > 1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### garp_ev10_roe15_ml10_liq1_t20
- **Return:** 1448.3% | **CAGR:** 22.5% | **Sharpe:** 1.01 | **MaxDD:** 41.8% | **Win:** 71% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 10 AND roe > 0.15 AND margem_liquida > 0.1 AND liquidez_corrente > 1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### garp_pl10_roe15_ml10_cf
- **Return:** 2460.9% | **CAGR:** 27.2% | **Sharpe:** 1.15 | **MaxDD:** 43.3% | **Win:** 78% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND roe > 0.15 AND margem_liquida > 0.1 AND fluxo_caixa_op_ttm > 0 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### garp_pl10_roe15_ml10_cf_t20
- **Return:** 2341.6% | **CAGR:** 26.7% | **Sharpe:** 1.15 | **MaxDD:** 43.3% | **Win:** 78% | **Top:** 20
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
- **Return:** 2424.8% | **CAGR:** 27.0% | **Sharpe:** 1.08 | **MaxDD:** 40.0% | **Win:** 69% | **Top:** 10
```
bun backtest --filter "price_to_sales > 0 AND price_to_sales < 1 AND margem_liquida > 0.1 AND avg_daily_liquidity > 1e6" --rank "price_to_sales ASC" --top 10
```

### best_ps_ml_t15
- **Return:** 2711.5% | **CAGR:** 28.0% | **Sharpe:** 1.16 | **MaxDD:** 40.6% | **Win:** 73% | **Top:** 15
```
bun backtest --filter "price_to_sales > 0 AND price_to_sales < 1 AND margem_liquida > 0.1 AND avg_daily_liquidity > 1e6" --rank "price_to_sales ASC" --top 15
```

### best_ps_ml_t20
- **Return:** 2683.1% | **CAGR:** 27.9% | **Sharpe:** 1.16 | **MaxDD:** 40.6% | **Win:** 73% | **Top:** 20
```
bun backtest --filter "price_to_sales > 0 AND price_to_sales < 1 AND margem_liquida > 0.1 AND avg_daily_liquidity > 1e6" --rank "price_to_sales ASC" --top 20
```

### best_ps_ml_t30
- **Return:** 2207.8% | **CAGR:** 26.2% | **Sharpe:** 1.11 | **MaxDD:** 40.6% | **Win:** 73% | **Top:** 30
```
bun backtest --filter "price_to_sales > 0 AND price_to_sales < 1 AND margem_liquida > 0.1 AND avg_daily_liquidity > 1e6" --rank "price_to_sales ASC" --top 30
```

### best_mf_t5
- **Return:** 1686.2% | **CAGR:** 23.8% | **Sharpe:** 1.04 | **MaxDD:** 24.6% | **Win:** 70% | **Top:** 5
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND roe > 0.1 AND margem_liquida > 0.1 AND liquidez_corrente > 1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 5
```

### best_mf_t10
- **Return:** 2549.3% | **CAGR:** 27.5% | **Sharpe:** 1.15 | **MaxDD:** 24.6% | **Win:** 70% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND roe > 0.1 AND margem_liquida > 0.1 AND liquidez_corrente > 1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### best_mf_t15
- **Return:** 2481.5% | **CAGR:** 27.2% | **Sharpe:** 1.14 | **MaxDD:** 24.6% | **Win:** 70% | **Top:** 15
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND roe > 0.1 AND margem_liquida > 0.1 AND liquidez_corrente > 1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 15
```

### best_mf_t20
- **Return:** 2389.2% | **CAGR:** 26.9% | **Sharpe:** 1.13 | **MaxDD:** 24.6% | **Win:** 70% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND roe > 0.1 AND margem_liquida > 0.1 AND liquidez_corrente > 1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### best_mf_t30
- **Return:** 2389.2% | **CAGR:** 26.9% | **Sharpe:** 1.13 | **MaxDD:** 24.6% | **Win:** 70% | **Top:** 30
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND roe > 0.1 AND margem_liquida > 0.1 AND liquidez_corrente > 1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 30
```

### best_ev8_t5
- **Return:** 1235.8% | **CAGR:** 21.2% | **Sharpe:** 0.98 | **MaxDD:** 30.0% | **Win:** 69% | **Top:** 5
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 8 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 5
```

### best_ev8_t10
- **Return:** 1766.9% | **CAGR:** 24.2% | **Sharpe:** 1.14 | **MaxDD:** 34.6% | **Win:** 76% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 8 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### best_ev8_t15
- **Return:** 2111.1% | **CAGR:** 25.8% | **Sharpe:** 1.16 | **MaxDD:** 34.6% | **Win:** 76% | **Top:** 15
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 8 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 15
```

### best_ev8_t20
- **Return:** 1869.0% | **CAGR:** 24.7% | **Sharpe:** 1.14 | **MaxDD:** 34.6% | **Win:** 76% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 8 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### best_ev8_t30
- **Return:** 1850.6% | **CAGR:** 24.6% | **Sharpe:** 1.15 | **MaxDD:** 34.6% | **Win:** 75% | **Top:** 30
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 8 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 30
```


---
## 12. Contrarian / deep value

### deep_pl2
- **Return:** 1051.4% | **CAGR:** 19.8% | **Sharpe:** 0.82 | **MaxDD:** 35.3% | **Win:** 58% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 2 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### deep_pl2_t20
- **Return:** 1626.3% | **CAGR:** 23.5% | **Sharpe:** 0.95 | **MaxDD:** 35.3% | **Win:** 60% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 2 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```

### deep_ev2
- **Return:** 165.1% | **CAGR:** 10.5% | **Sharpe:** 0.69 | **MaxDD:** 32.8% | **Win:** 54% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 2 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### deep_ev2_t20
- **Return:** 165.1% | **CAGR:** 10.5% | **Sharpe:** 0.69 | **MaxDD:** 32.8% | **Win:** 54% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 2 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### deep_pvp03
- **Return:** 2259.2% | **CAGR:** 26.4% | **Sharpe:** 0.91 | **MaxDD:** 40.7% | **Win:** 65% | **Top:** 10
```
bun backtest --filter "pvp_ratio > 0 AND pvp_ratio < 0.3 AND avg_daily_liquidity > 1e6" --rank "pvp_ratio ASC" --top 10
```

### deep_pvp03_t20
- **Return:** 2370.4% | **CAGR:** 26.8% | **Sharpe:** 0.96 | **MaxDD:** 37.9% | **Win:** 67% | **Top:** 20
```
bun backtest --filter "pvp_ratio > 0 AND pvp_ratio < 0.3 AND avg_daily_liquidity > 1e6" --rank "pvp_ratio ASC" --top 20
```

### deep_pl3_pvp05
- **Return:** 1512.6% | **CAGR:** 22.9% | **Sharpe:** 0.97 | **MaxDD:** 41.3% | **Win:** 67% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 3 AND pvp_ratio > 0 AND pvp_ratio < 0.5 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### deep_pl3_pvp05_t20
- **Return:** 2420.9% | **CAGR:** 27.0% | **Sharpe:** 1.07 | **MaxDD:** 41.3% | **Win:** 67% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 3 AND pvp_ratio > 0 AND pvp_ratio < 0.5 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```

### deep_ev3_pvp1
- **Return:** 232.6% | **CAGR:** 9.3% | **Sharpe:** 0.60 | **MaxDD:** 40.6% | **Win:** 54% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 3 AND pvp_ratio > 0 AND pvp_ratio < 1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### deep_ev3_pvp1_t20
- **Return:** 232.6% | **CAGR:** 9.3% | **Sharpe:** 0.60 | **MaxDD:** 40.6% | **Win:** 54% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 3 AND pvp_ratio > 0 AND pvp_ratio < 1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### deep_pl3_ev3_ml5
- **Return:** 56.0% | **CAGR:** 3.3% | **Sharpe:** 0.33 | **MaxDD:** 40.6% | **Win:** 48% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 3 AND ev_ebit > 0 AND ev_ebit < 3 AND margem_liquida > 0.05 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### deep_pl3_ev3_ml5_t20
- **Return:** 56.0% | **CAGR:** 3.3% | **Sharpe:** 0.33 | **MaxDD:** 40.6% | **Win:** 48% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 3 AND ev_ebit > 0 AND ev_ebit < 3 AND margem_liquida > 0.05 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```

### deep_pl3_ev3_roe10
- **Return:** 236.3% | **CAGR:** 9.4% | **Sharpe:** 0.59 | **MaxDD:** 37.6% | **Win:** 59% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 3 AND ev_ebit > 0 AND ev_ebit < 3 AND roe > 0.1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### deep_pl3_ev3_roe10_t20
- **Return:** 236.3% | **CAGR:** 9.4% | **Sharpe:** 0.59 | **MaxDD:** 37.6% | **Win:** 59% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 3 AND ev_ebit > 0 AND ev_ebit < 3 AND roe > 0.1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```


---
## 13. Sector-agnostic quality screens

### quality_roe20_ml15_rankpl
- **Return:** 619.1% | **CAGR:** 15.7% | **Sharpe:** 0.76 | **MaxDD:** 42.2% | **Win:** 67% | **Top:** 10
```
bun backtest --filter "roe > 0.2 AND margem_liquida > 0.15 AND pl_ratio > 0 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### quality_roe20_ml15_rankpl_t20
- **Return:** 498.9% | **CAGR:** 14.2% | **Sharpe:** 0.70 | **MaxDD:** 42.2% | **Win:** 62% | **Top:** 20
```
bun backtest --filter "roe > 0.2 AND margem_liquida > 0.15 AND pl_ratio > 0 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```

### quality_roe15_mb30_rankev
- **Return:** 887.1% | **CAGR:** 18.5% | **Sharpe:** 0.85 | **MaxDD:** 39.0% | **Win:** 65% | **Top:** 10
```
bun backtest --filter "roe > 0.15 AND margem_bruta > 0.3 AND ev_ebit > 0 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### quality_roe15_mb30_rankev_t20
- **Return:** 461.8% | **CAGR:** 13.6% | **Sharpe:** 0.67 | **MaxDD:** 39.0% | **Win:** 60% | **Top:** 20
```
bun backtest --filter "roe > 0.15 AND margem_bruta > 0.3 AND ev_ebit > 0 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### quality_roa10_ml10_rankpl
- **Return:** 448.5% | **CAGR:** 13.4% | **Sharpe:** 0.67 | **MaxDD:** 40.4% | **Win:** 69% | **Top:** 10
```
bun backtest --filter "roa > 0.1 AND margem_liquida > 0.1 AND pl_ratio > 0 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### quality_roa10_ml10_rankpl_t20
- **Return:** 372.1% | **CAGR:** 12.2% | **Sharpe:** 0.62 | **MaxDD:** 41.1% | **Win:** 65% | **Top:** 20
```
bun backtest --filter "roa > 0.1 AND margem_liquida > 0.1 AND pl_ratio > 0 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```

### quality_roe15_liq15_rankev
- **Return:** 830.1% | **CAGR:** 18.0% | **Sharpe:** 0.87 | **MaxDD:** 37.2% | **Win:** 69% | **Top:** 10
```
bun backtest --filter "roe > 0.15 AND liquidez_corrente > 1.5 AND ev_ebit > 0 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10
```

### quality_roe15_liq15_rankev_t20
- **Return:** 635.2% | **CAGR:** 15.9% | **Sharpe:** 0.79 | **MaxDD:** 36.5% | **Win:** 69% | **Top:** 20
```
bun backtest --filter "roe > 0.15 AND liquidez_corrente > 1.5 AND ev_ebit > 0 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20
```

### quality_roe25_rankpl
- **Return:** 510.0% | **CAGR:** 14.3% | **Sharpe:** 0.72 | **MaxDD:** 40.3% | **Win:** 65% | **Top:** 10
```
bun backtest --filter "roe > 0.25 AND pl_ratio > 0 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10
```

### quality_roe25_rankpl_t20
- **Return:** 382.7% | **CAGR:** 12.4% | **Sharpe:** 0.64 | **MaxDD:** 40.9% | **Win:** 67% | **Top:** 20
```
bun backtest --filter "roe > 0.25 AND pl_ratio > 0 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20
```


---
## 14. Higher liquidity threshold (5M+/day)

### hiq_ps1_ml10
- **Return:** 2015.0% | **CAGR:** 25.4% | **Sharpe:** 1.14 | **MaxDD:** 40.4% | **Win:** 73% | **Top:** 10
```
bun backtest --filter "price_to_sales > 0 AND price_to_sales < 1 AND margem_liquida > 0.1 AND avg_daily_liquidity > 5e6" --rank "price_to_sales ASC" --top 10
```

### hiq_ps1_ml10_t20
- **Return:** 1864.0% | **CAGR:** 24.7% | **Sharpe:** 1.09 | **MaxDD:** 40.4% | **Win:** 71% | **Top:** 20
```
bun backtest --filter "price_to_sales > 0 AND price_to_sales < 1 AND margem_liquida > 0.1 AND avg_daily_liquidity > 5e6" --rank "price_to_sales ASC" --top 20
```

### hiq_ev8
- **Return:** 2345.3% | **CAGR:** 26.7% | **Sharpe:** 1.19 | **MaxDD:** 34.6% | **Win:** 75% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 8 AND avg_daily_liquidity > 5e6" --rank "ev_ebit ASC" --top 10
```

### hiq_ev8_t20
- **Return:** 1820.0% | **CAGR:** 24.5% | **Sharpe:** 1.15 | **MaxDD:** 34.6% | **Win:** 76% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 8 AND avg_daily_liquidity > 5e6" --rank "ev_ebit ASC" --top 20
```

### hiq_pl8_ev8
- **Return:** 2472.2% | **CAGR:** 27.2% | **Sharpe:** 1.20 | **MaxDD:** 34.6% | **Win:** 75% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND avg_daily_liquidity > 5e6" --rank "ev_ebit ASC" --top 10
```

### hiq_pl8_ev8_t20
- **Return:** 1885.9% | **CAGR:** 24.8% | **Sharpe:** 1.16 | **MaxDD:** 34.6% | **Win:** 76% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND avg_daily_liquidity > 5e6" --rank "ev_ebit ASC" --top 20
```

### hiq_ev15_roe10
- **Return:** 1914.1% | **CAGR:** 24.9% | **Sharpe:** 1.08 | **MaxDD:** 38.9% | **Win:** 73% | **Top:** 10
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 15 AND roe > 0.1 AND avg_daily_liquidity > 5e6" --rank "ev_ebit ASC" --top 10
```

### hiq_ev15_roe10_t20
- **Return:** 991.3% | **CAGR:** 19.4% | **Sharpe:** 0.91 | **MaxDD:** 36.3% | **Win:** 71% | **Top:** 20
```
bun backtest --filter "ev_ebit > 0 AND ev_ebit < 15 AND roe > 0.1 AND avg_daily_liquidity > 5e6" --rank "ev_ebit ASC" --top 20
```

### hiq_pl10_liq15
- **Return:** 1337.3% | **CAGR:** 21.8% | **Sharpe:** 0.97 | **MaxDD:** 39.5% | **Win:** 67% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND liquidez_corrente > 1.5 AND avg_daily_liquidity > 5e6" --rank "pl_ratio ASC" --top 10
```

### hiq_pl10_liq15_t20
- **Return:** 974.2% | **CAGR:** 19.2% | **Sharpe:** 0.84 | **MaxDD:** 41.2% | **Win:** 65% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND liquidez_corrente > 1.5 AND avg_daily_liquidity > 5e6" --rank "pl_ratio ASC" --top 20
```

### hiq_mf_val_qual_liq
- **Return:** 1436.0% | **CAGR:** 22.4% | **Sharpe:** 0.88 | **MaxDD:** 24.6% | **Win:** 72% | **Top:** 10
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND roe > 0.1 AND margem_liquida > 0.1 AND liquidez_corrente > 1 AND avg_daily_liquidity > 5e6" --rank "ev_ebit ASC" --top 10
```

### hiq_mf_val_qual_liq_t20
- **Return:** 1418.1% | **CAGR:** 22.3% | **Sharpe:** 0.88 | **MaxDD:** 24.6% | **Win:** 72% | **Top:** 20
```
bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND roe > 0.1 AND margem_liquida > 0.1 AND liquidez_corrente > 1 AND avg_daily_liquidity > 5e6" --rank "ev_ebit ASC" --top 20
```


---
## TOP 25 BY TOTAL RETURN

| # | Strategy | Return | CAGR | Sharpe | MaxDD | Win% | Command |
|---|----------|--------|------|--------|-------|------|---------|
| 1 | ps1_me15_t20 | 3029.4% | 29.1% | 1.16 | 37.1% | 69% | `bun backtest --filter "price_to_sales > 0 AND price_to_sales < 1 AND margem_ebit > 0.15 AND avg_daily_liquidity > 1e6" --rank "price_to_sales ASC" --top 20` |
| 2 | pl8_ev8_me15 | 2771.6% | 28.2% | 1.24 | 33.8% | 78% | `bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND margem_ebit > 0.15 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10` |
| 3 | ps1_me15 | 2714.8% | 28.0% | 1.02 | 37.1% | 69% | `bun backtest --filter "price_to_sales > 0 AND price_to_sales < 1 AND margem_ebit > 0.15 AND avg_daily_liquidity > 1e6" --rank "price_to_sales ASC" --top 10` |
| 4 | best_ps_ml_t15 | 2711.5% | 28.0% | 1.16 | 40.6% | 73% | `bun backtest --filter "price_to_sales > 0 AND price_to_sales < 1 AND margem_liquida > 0.1 AND avg_daily_liquidity > 1e6" --rank "price_to_sales ASC" --top 15` |
| 5 | ps1_ml10_t20 | 2683.1% | 27.9% | 1.16 | 40.6% | 73% | `bun backtest --filter "price_to_sales > 0 AND price_to_sales < 1 AND margem_liquida > 0.1 AND avg_daily_liquidity > 1e6" --rank "price_to_sales ASC" --top 20` |
| 6 | best_ps_ml_t20 | 2683.1% | 27.9% | 1.16 | 40.6% | 73% | `bun backtest --filter "price_to_sales > 0 AND price_to_sales < 1 AND margem_liquida > 0.1 AND avg_daily_liquidity > 1e6" --rank "price_to_sales ASC" --top 20` |
| 7 | mf_val_qual_liq_pl | 2619.8% | 27.7% | 1.16 | 24.6% | 70% | `bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND roe > 0.1 AND margem_liquida > 0.1 AND liquidez_corrente > 1 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10` |
| 8 | pl5_pvp1_t20 | 2586.6% | 27.6% | 1.13 | 38.1% | 73% | `bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND pvp_ratio > 0 AND pvp_ratio < 1 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20` |
| 9 | ps1_ml15 | 2585.1% | 27.6% | 1.08 | 46.0% | 75% | `bun backtest --filter "price_to_sales > 0 AND price_to_sales < 1 AND margem_liquida > 0.15 AND avg_daily_liquidity > 1e6" --rank "price_to_sales ASC" --top 10` |
| 10 | yield_pl5_ml15 | 2582.2% | 27.6% | 1.12 | 42.1% | 65% | `bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND margem_liquida > 0.15 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10` |
| 11 | mf_val_qual_liq | 2549.3% | 27.5% | 1.15 | 24.6% | 70% | `bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND roe > 0.1 AND margem_liquida > 0.1 AND liquidez_corrente > 1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10` |
| 12 | best_mf_t10 | 2549.3% | 27.5% | 1.15 | 24.6% | 70% | `bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND roe > 0.1 AND margem_liquida > 0.1 AND liquidez_corrente > 1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10` |
| 13 | ps1_ml15_t20 | 2541.2% | 27.4% | 1.09 | 46.0% | 75% | `bun backtest --filter "price_to_sales > 0 AND price_to_sales < 1 AND margem_liquida > 0.15 AND avg_daily_liquidity > 1e6" --rank "price_to_sales ASC" --top 20` |
| 14 | pl8_ev8_ml10 | 2486.9% | 27.2% | 1.20 | 34.6% | 75% | `bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND margem_liquida > 0.1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10` |
| 15 | ev8_pvp15 | 2486.9% | 27.2% | 1.24 | 31.1% | 78% | `bun backtest --filter "ev_ebit > 0 AND ev_ebit < 8 AND pvp_ratio > 0 AND pvp_ratio < 1.5 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10` |
| 16 | best_mf_t15 | 2481.5% | 27.2% | 1.14 | 24.6% | 70% | `bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND roe > 0.1 AND margem_liquida > 0.1 AND liquidez_corrente > 1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 15` |
| 17 | hiq_pl8_ev8 | 2472.2% | 27.2% | 1.20 | 34.6% | 75% | `bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND avg_daily_liquidity > 5e6" --rank "ev_ebit ASC" --top 10` |
| 18 | garp_pl10_roe15_ml10_cf | 2460.9% | 27.2% | 1.15 | 43.3% | 78% | `bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND roe > 0.15 AND margem_liquida > 0.1 AND fluxo_caixa_op_ttm > 0 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10` |
| 19 | pl_3_t20 | 2457.7% | 27.1% | 1.09 | 39.4% | 65% | `bun backtest --filter "pl_ratio > 0 AND pl_ratio < 3 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20` |
| 20 | ps05_ml10_t20 | 2454.5% | 27.1% | 1.08 | 31.8% | 67% | `bun backtest --filter "price_to_sales > 0 AND price_to_sales < 0.5 AND margem_liquida > 0.1 AND avg_daily_liquidity > 1e6" --rank "price_to_sales ASC" --top 20` |
| 21 | ps1_ml10 | 2424.8% | 27.0% | 1.08 | 40.0% | 69% | `bun backtest --filter "price_to_sales > 0 AND price_to_sales < 1 AND margem_liquida > 0.1 AND avg_daily_liquidity > 1e6" --rank "price_to_sales ASC" --top 10` |
| 22 | best_ps_ml_t10 | 2424.8% | 27.0% | 1.08 | 40.0% | 69% | `bun backtest --filter "price_to_sales > 0 AND price_to_sales < 1 AND margem_liquida > 0.1 AND avg_daily_liquidity > 1e6" --rank "price_to_sales ASC" --top 10` |
| 23 | deep_pl3_pvp05_t20 | 2420.9% | 27.0% | 1.07 | 41.3% | 67% | `bun backtest --filter "pl_ratio > 0 AND pl_ratio < 3 AND pvp_ratio > 0 AND pvp_ratio < 0.5 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20` |
| 24 | pl5_ev8_ml10_rankpl_t20 | 2418.0% | 27.0% | 1.21 | 33.8% | 73% | `bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 8 AND margem_liquida > 0.1 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20` |
| 25 | mf_val_qual_liq_t20 | 2389.2% | 26.9% | 1.13 | 24.6% | 70% | `bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND roe > 0.1 AND margem_liquida > 0.1 AND liquidez_corrente > 1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20` |

---
## TOP 15 BY SHARPE RATIO

| # | Strategy | Return | CAGR | Sharpe | MaxDD | Win% | Command |
|---|----------|--------|------|--------|-------|------|---------|
| 1 | pl8_ev8_cf | 2329.2% | 26.7% | 1.25 | 34.6% | 76% | `bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND fluxo_caixa_op_ttm > 0 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10` |
| 2 | pl8_ev8 | 2304.8% | 26.6% | 1.24 | 34.6% | 76% | `bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10` |
| 3 | pl8_ev8_me15 | 2771.6% | 28.2% | 1.24 | 33.8% | 78% | `bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND margem_ebit > 0.15 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10` |
| 4 | ev8_pvp15 | 2486.9% | 27.2% | 1.24 | 31.1% | 78% | `bun backtest --filter "ev_ebit > 0 AND ev_ebit < 8 AND pvp_ratio > 0 AND pvp_ratio < 1.5 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10` |
| 5 | ev8_pvp15_t20 | 2259.5% | 26.4% | 1.23 | 31.1% | 76% | `bun backtest --filter "ev_ebit > 0 AND ev_ebit < 8 AND pvp_ratio > 0 AND pvp_ratio < 1.5 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20` |
| 6 | pl8_ev8_cf_t20 | 2142.7% | 25.9% | 1.21 | 34.6% | 75% | `bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND fluxo_caixa_op_ttm > 0 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20` |
| 7 | pl5_ev8_ml10_rankpl_t20 | 2418.0% | 27.0% | 1.21 | 33.8% | 73% | `bun backtest --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 8 AND margem_liquida > 0.1 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20` |
| 8 | notlarge_pl8_ev8_t20 | 2263.6% | 26.4% | 1.21 | 34.6% | 75% | `bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND market_cap < 1e10 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20` |
| 9 | pl8_ev8_ml10 | 2486.9% | 27.2% | 1.20 | 34.6% | 75% | `bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND margem_liquida > 0.1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10` |
| 10 | notlarge_pl8_ev8 | 2344.3% | 26.7% | 1.20 | 34.6% | 76% | `bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND market_cap < 1e10 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10` |
| 11 | hiq_pl8_ev8 | 2472.2% | 27.2% | 1.20 | 34.6% | 75% | `bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND avg_daily_liquidity > 5e6" --rank "ev_ebit ASC" --top 10` |
| 12 | ev10_cf | 2029.1% | 25.4% | 1.20 | 35.9% | 75% | `bun backtest --filter "ev_ebit > 0 AND ev_ebit < 10 AND fluxo_caixa_op_ttm > 0 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10` |
| 13 | pl10_ev10 | 2009.2% | 25.3% | 1.19 | 35.9% | 75% | `bun backtest --filter "pl_ratio > 0 AND pl_ratio < 10 AND ev_ebit > 0 AND ev_ebit < 10 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10` |
| 14 | hiq_ev8 | 2345.3% | 26.7% | 1.19 | 34.6% | 75% | `bun backtest --filter "ev_ebit > 0 AND ev_ebit < 8 AND avg_daily_liquidity > 5e6" --rank "ev_ebit ASC" --top 10` |
| 15 | pl8_ev8_t20 | 2065.4% | 25.6% | 1.18 | 34.6% | 76% | `bun backtest --filter "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20` |
