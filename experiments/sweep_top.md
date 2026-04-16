# Strategy Sweep Results

**Total strategies tested:** 6119

**Valid (>=40 quarters):** 6113

**Average total return:** 1707%
**Median total return:** 1501%
**Average Sharpe:** 1.03
**Strategies with CAGR > 20%:** 4281
**Strategies with CAGR > 25%:** 1839
**Strategies with CAGR > 30%:** 257

## Top 30 by Total Return

| # | Strategy | Return | CAGR | Sharpe | MaxDD | Win% | α% | Top | Command |
|---|----------|-------:|-----:|-------:|------:|-----:|----:|----:|---------|
| 1 | rand_1490 | 10704% | 40.6% | 1.44 | 23.9% | 75% | 76% | 15 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 2 AND price_to_sales > 0 AND price_to_sales < 1.5 AND liquidez_corrente > 2 AND market_cap >= 1000000000 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 15` |
| 2 | ev3_pvp0.5_pvp_ratio_t5 | 6839% | 36.1% | 1.55 | 22.3% | 73% | 76% | 5 | `bun src/backtest.ts --filter "ev_ebit > 0 AND ev_ebit < 3 AND pvp_ratio > 0 AND pvp_ratio < 0.5 AND avg_daily_liquidity > 1e6" --rank "pvp_ratio ASC" --top 5` |
| 3 | deepq_2_margemebit01_t15 | 6565% | 35.7% | 1.24 | 25.8% | 67% | 67% | 15 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 2 AND margem_ebit > 0.1 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 15` |
| 4 | ev3_pvp0.5_ev_ebit_t5 | 6411% | 35.5% | 1.45 | 22.3% | 71% | 76% | 5 | `bun src/backtest.ts --filter "ev_ebit > 0 AND ev_ebit < 3 AND pvp_ratio > 0 AND pvp_ratio < 0.5 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 5` |
| 5 | liq_bestPL3_liq10m_t20 | 6392% | 35.5% | 1.44 | 27.8% | 73% | 75% | 20 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 3 AND avg_daily_liquidity > 1e7" --rank "pl_ratio ASC" --top 20` |
| 6 | rand_896 | 6303% | 35.3% | 1.44 | 26.9% | 69% | 64% | 5 | `bun src/backtest.ts --filter "ev_ebit > 0 AND ev_ebit < 2 AND pvp_ratio > 0 AND pvp_ratio < 0.75 AND roe > 0.15 AND liquidez_corrente > 2 AND market_cap >= 500000000 AND avg_daily_liquidity > 1e7" --rank "pvp_ratio ASC" --top 5` |
| 7 | deepq_2_margemliquida005_t15 | 6125% | 35.0% | 1.21 | 27.7% | 69% | 69% | 15 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 2 AND margem_liquida > 0.05 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 15` |
| 8 | ev8_pvp0.5_ev_ebit_t10 | 6012% | 34.9% | 1.30 | 34.5% | 78% | 73% | 10 | `bun src/backtest.ts --filter "ev_ebit > 0 AND ev_ebit < 8 AND pvp_ratio > 0 AND pvp_ratio < 0.5 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10` |
| 9 | rand_838 | 5974% | 34.8% | 1.73 | 21.4% | 82% | 73% | 12 | `bun src/backtest.ts --filter "ev_ebit > 0 AND ev_ebit < 4 AND price_to_sales > 0 AND price_to_sales < 0.5 AND roe > 0.15 AND margem_liquida > 0.2 AND market_cap < 10000000000 AND avg_daily_liquidity > 5e6" --rank "ev_ebit ASC" --top 12` |
| 10 | deepq_2_margembruta02_t15 | 5948% | 34.8% | 1.21 | 28.0% | 67% | 69% | 15 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 2 AND margem_bruta > 0.2 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 15` |
| 11 | deepq_2_margemliquida01_t15 | 5887% | 34.7% | 1.21 | 23.9% | 67% | 69% | 15 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 2 AND margem_liquida > 0.1 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 15` |
| 12 | rand_778 | 5791% | 34.5% | 1.62 | 34.0% | 76% | 76% | 15 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 2 AND ev_ebit > 0 AND ev_ebit < 8 AND pvp_ratio > 0 AND pvp_ratio < 0.75 AND price_to_sales > 0 AND price_to_sales < 1 AND roe > 0.15 AND market_cap >= 1000000000 AND avg_daily_liquidity > 5e6" --rank "margem_liquida DESC" --top 15` |
| 13 | liq_bestPL3_liq5m_t20 | 5748% | 34.4% | 1.37 | 27.8% | 75% | 75% | 20 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 3 AND avg_daily_liquidity > 5e6" --rank "pl_ratio ASC" --top 20` |
| 14 | rand_642 | 5601% | 34.2% | 1.33 | 27.9% | 69% | 76% | 20 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 3 AND margem_bruta > 0.4 AND divida_liquida_ebit < 20 AND market_cap >= 5000000000 AND avg_daily_liquidity > 2e6" --rank "pvp_ratio ASC" --top 20` |
| 15 | pl_lt2_t15 | 5540% | 34.1% | 1.20 | 27.7% | 69% | 73% | 15 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 2 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 15` |
| 16 | ev15_pvp0.5_pvp_ratio_t5 | 5510% | 34.0% | 0.98 | 37.2% | 66% | 62% | 5 | `bun src/backtest.ts --filter "ev_ebit > 0 AND ev_ebit < 15 AND pvp_ratio > 0 AND pvp_ratio < 0.5 AND avg_daily_liquidity > 1e6" --rank "pvp_ratio ASC" --top 5` |
| 17 | ev15_pvp1_pvp_ratio_t5 | 5510% | 34.0% | 0.98 | 37.2% | 66% | 62% | 5 | `bun src/backtest.ts --filter "ev_ebit > 0 AND ev_ebit < 15 AND pvp_ratio > 0 AND pvp_ratio < 1 AND avg_daily_liquidity > 1e6" --rank "pvp_ratio ASC" --top 5` |
| 18 | ev15_pvp1.5_pvp_ratio_t5 | 5510% | 34.0% | 0.98 | 37.2% | 66% | 62% | 5 | `bun src/backtest.ts --filter "ev_ebit > 0 AND ev_ebit < 15 AND pvp_ratio > 0 AND pvp_ratio < 1.5 AND avg_daily_liquidity > 1e6" --rank "pvp_ratio ASC" --top 5` |
| 19 | ev15_pvp2_pvp_ratio_t5 | 5510% | 34.0% | 0.98 | 37.2% | 66% | 62% | 5 | `bun src/backtest.ts --filter "ev_ebit > 0 AND ev_ebit < 15 AND pvp_ratio > 0 AND pvp_ratio < 2 AND avg_daily_liquidity > 1e6" --rank "pvp_ratio ASC" --top 5` |
| 20 | rand_877 | 5486% | 34.0% | 1.41 | 21.4% | 75% | 75% | 12 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 4 AND ev_ebit > 0 AND ev_ebit < 5 AND pvp_ratio > 0 AND pvp_ratio < 0.5 AND price_to_sales > 0 AND price_to_sales < 0.5 AND roe > 0.05 AND market_cap >= 5000000000 AND avg_daily_liquidity > 2e6" --rank "roe DESC" --top 12` |
| 21 | ev5_pvp0.5_pvp_ratio_t15 | 5461% | 33.9% | 1.50 | 23.3% | 76% | 73% | 15 | `bun src/backtest.ts --filter "ev_ebit > 0 AND ev_ebit < 5 AND pvp_ratio > 0 AND pvp_ratio < 0.5 AND avg_daily_liquidity > 1e6" --rank "pvp_ratio ASC" --top 15` |
| 22 | rand_966 | 5403% | 33.8% | 1.53 | 26.1% | 76% | 71% | 12 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 2 AND ev_ebit > 0 AND ev_ebit < 12 AND market_cap >= 5000000000 AND avg_daily_liquidity > 5e6" --rank "ev_ebit ASC" --top 12` |
| 23 | rand_439 | 5336% | 33.7% | 1.56 | 20.5% | 78% | 75% | 15 | `bun src/backtest.ts --filter "ev_ebit > 0 AND ev_ebit < 5 AND pvp_ratio > 0 AND pvp_ratio < 0.5 AND price_to_sales > 0 AND price_to_sales < 1.5 AND margem_ebit > 0.1 AND avg_daily_liquidity > 2e6" --rank "pl_ratio ASC" --top 15` |
| 24 | ks_deep_pl3_ev3_roe10_ml5_margem_liquida_t8 | 5327% | 33.7% | 1.57 | 22.6% | 80% | 71% | 8 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 3 AND ev_ebit > 0 AND ev_ebit < 3 AND roe > 0.1 AND margem_liquida > 0.05 AND avg_daily_liquidity > 1e6" --rank "margem_liquida DESC" --top 8` |
| 25 | rand_813 | 5250% | 33.6% | 1.25 | 25.5% | 73% | 60% | 5 | `bun src/backtest.ts --filter "ev_ebit > 0 AND ev_ebit < 2 AND margem_liquida > 0.2 AND avg_daily_liquidity > 2e6" --rank "roe DESC" --top 5` |
| 26 | ev2_pvp0.5_pvp_ratio_t5 | 5224% | 33.5% | 1.38 | 26.9% | 71% | 66% | 5 | `bun src/backtest.ts --filter "ev_ebit > 0 AND ev_ebit < 2 AND pvp_ratio > 0 AND pvp_ratio < 0.5 AND avg_daily_liquidity > 1e6" --rank "pvp_ratio ASC" --top 5` |
| 27 | ks_deep_pl3_ev3_roe10_ml5_pvp_ratio_t8 | 5157% | 33.4% | 1.45 | 22.6% | 76% | 73% | 8 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 3 AND ev_ebit > 0 AND ev_ebit < 3 AND roe > 0.1 AND margem_liquida > 0.05 AND avg_daily_liquidity > 1e6" --rank "pvp_ratio ASC" --top 8` |
| 28 | ev2_pvp0.5_ev_ebit_t5 | 5123% | 33.3% | 1.41 | 22.3% | 71% | 66% | 5 | `bun src/backtest.ts --filter "ev_ebit > 0 AND ev_ebit < 2 AND pvp_ratio > 0 AND pvp_ratio < 0.5 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 5` |
| 29 | rand_905 | 5105% | 33.3% | 1.52 | 31.6% | 78% | 73% | 8 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 3 AND pvp_ratio > 0 AND pvp_ratio < 1 AND margem_liquida > 0.15 AND divida_liquida_ebit < 2 AND avg_daily_liquidity > 5e6" --rank "price_to_sales ASC" --top 8` |
| 30 | rand_69 | 5101% | 33.3% | 1.32 | 28.4% | 69% | 66% | 5 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 20 AND ev_ebit > 0 AND ev_ebit < 2 AND pvp_ratio > 0 AND pvp_ratio < 0.5 AND price_to_sales > 0 AND price_to_sales < 0.5 AND margem_ebit > 0.1 AND avg_daily_liquidity > 2e6" --rank "pl_ratio ASC" --top 5` |

## Top 25 by CAGR

| # | Strategy | Return | CAGR | Sharpe | MaxDD | Win% | α% | Top | Command |
|---|----------|-------:|-----:|-------:|------:|-----:|----:|----:|---------|
| 1 | rand_1490 | 10704% | 40.6% | 1.44 | 23.9% | 75% | 76% | 15 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 2 AND price_to_sales > 0 AND price_to_sales < 1.5 AND liquidez_corrente > 2 AND market_cap >= 1000000000 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 15` |
| 2 | ev3_pvp0.5_pvp_ratio_t5 | 6839% | 36.1% | 1.55 | 22.3% | 73% | 76% | 5 | `bun src/backtest.ts --filter "ev_ebit > 0 AND ev_ebit < 3 AND pvp_ratio > 0 AND pvp_ratio < 0.5 AND avg_daily_liquidity > 1e6" --rank "pvp_ratio ASC" --top 5` |
| 3 | deepq_2_margemebit01_t15 | 6565% | 35.7% | 1.24 | 25.8% | 67% | 67% | 15 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 2 AND margem_ebit > 0.1 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 15` |
| 4 | ev3_pvp0.5_ev_ebit_t5 | 6411% | 35.5% | 1.45 | 22.3% | 71% | 76% | 5 | `bun src/backtest.ts --filter "ev_ebit > 0 AND ev_ebit < 3 AND pvp_ratio > 0 AND pvp_ratio < 0.5 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 5` |
| 5 | liq_bestPL3_liq10m_t20 | 6392% | 35.5% | 1.44 | 27.8% | 73% | 75% | 20 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 3 AND avg_daily_liquidity > 1e7" --rank "pl_ratio ASC" --top 20` |
| 6 | rand_896 | 6303% | 35.3% | 1.44 | 26.9% | 69% | 64% | 5 | `bun src/backtest.ts --filter "ev_ebit > 0 AND ev_ebit < 2 AND pvp_ratio > 0 AND pvp_ratio < 0.75 AND roe > 0.15 AND liquidez_corrente > 2 AND market_cap >= 500000000 AND avg_daily_liquidity > 1e7" --rank "pvp_ratio ASC" --top 5` |
| 7 | deepq_2_margemliquida005_t15 | 6125% | 35.0% | 1.21 | 27.7% | 69% | 69% | 15 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 2 AND margem_liquida > 0.05 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 15` |
| 8 | rand_669 | 3054% | 35.0% | 1.09 | 27.9% | 70% | 61% | 25 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 2 AND divida_liquida_ebit < 0 AND market_cap >= 10000000000 AND market_cap < 100000000000 AND avg_daily_liquidity > 1e7" --rank "margem_ebit DESC" --top 25` |
| 9 | ev8_pvp0.5_ev_ebit_t10 | 6012% | 34.9% | 1.30 | 34.5% | 78% | 73% | 10 | `bun src/backtest.ts --filter "ev_ebit > 0 AND ev_ebit < 8 AND pvp_ratio > 0 AND pvp_ratio < 0.5 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10` |
| 10 | rand_838 | 5974% | 34.8% | 1.73 | 21.4% | 82% | 73% | 12 | `bun src/backtest.ts --filter "ev_ebit > 0 AND ev_ebit < 4 AND price_to_sales > 0 AND price_to_sales < 0.5 AND roe > 0.15 AND margem_liquida > 0.2 AND market_cap < 10000000000 AND avg_daily_liquidity > 5e6" --rank "ev_ebit ASC" --top 12` |
| 11 | deepq_2_margembruta02_t15 | 5948% | 34.8% | 1.21 | 28.0% | 67% | 69% | 15 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 2 AND margem_bruta > 0.2 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 15` |
| 12 | deepq_2_margemliquida01_t15 | 5887% | 34.7% | 1.21 | 23.9% | 67% | 69% | 15 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 2 AND margem_liquida > 0.1 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 15` |
| 13 | rand_778 | 5791% | 34.5% | 1.62 | 34.0% | 76% | 76% | 15 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 2 AND ev_ebit > 0 AND ev_ebit < 8 AND pvp_ratio > 0 AND pvp_ratio < 0.75 AND price_to_sales > 0 AND price_to_sales < 1 AND roe > 0.15 AND market_cap >= 1000000000 AND avg_daily_liquidity > 5e6" --rank "margem_liquida DESC" --top 15` |
| 14 | liq_bestPL3_liq5m_t20 | 5748% | 34.4% | 1.37 | 27.8% | 75% | 75% | 20 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 3 AND avg_daily_liquidity > 5e6" --rank "pl_ratio ASC" --top 20` |
| 15 | rand_642 | 5601% | 34.2% | 1.33 | 27.9% | 69% | 76% | 20 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 3 AND margem_bruta > 0.4 AND divida_liquida_ebit < 20 AND market_cap >= 5000000000 AND avg_daily_liquidity > 2e6" --rank "pvp_ratio ASC" --top 20` |
| 16 | pl_lt2_t15 | 5540% | 34.1% | 1.20 | 27.7% | 69% | 73% | 15 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 2 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 15` |
| 17 | ev15_pvp0.5_pvp_ratio_t5 | 5510% | 34.0% | 0.98 | 37.2% | 66% | 62% | 5 | `bun src/backtest.ts --filter "ev_ebit > 0 AND ev_ebit < 15 AND pvp_ratio > 0 AND pvp_ratio < 0.5 AND avg_daily_liquidity > 1e6" --rank "pvp_ratio ASC" --top 5` |
| 18 | ev15_pvp1_pvp_ratio_t5 | 5510% | 34.0% | 0.98 | 37.2% | 66% | 62% | 5 | `bun src/backtest.ts --filter "ev_ebit > 0 AND ev_ebit < 15 AND pvp_ratio > 0 AND pvp_ratio < 1 AND avg_daily_liquidity > 1e6" --rank "pvp_ratio ASC" --top 5` |
| 19 | ev15_pvp1.5_pvp_ratio_t5 | 5510% | 34.0% | 0.98 | 37.2% | 66% | 62% | 5 | `bun src/backtest.ts --filter "ev_ebit > 0 AND ev_ebit < 15 AND pvp_ratio > 0 AND pvp_ratio < 1.5 AND avg_daily_liquidity > 1e6" --rank "pvp_ratio ASC" --top 5` |
| 20 | ev15_pvp2_pvp_ratio_t5 | 5510% | 34.0% | 0.98 | 37.2% | 66% | 62% | 5 | `bun src/backtest.ts --filter "ev_ebit > 0 AND ev_ebit < 15 AND pvp_ratio > 0 AND pvp_ratio < 2 AND avg_daily_liquidity > 1e6" --rank "pvp_ratio ASC" --top 5` |
| 21 | rand_877 | 5486% | 34.0% | 1.41 | 21.4% | 75% | 75% | 12 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 4 AND ev_ebit > 0 AND ev_ebit < 5 AND pvp_ratio > 0 AND pvp_ratio < 0.5 AND price_to_sales > 0 AND price_to_sales < 0.5 AND roe > 0.05 AND market_cap >= 5000000000 AND avg_daily_liquidity > 2e6" --rank "roe DESC" --top 12` |
| 22 | ev5_pvp0.5_pvp_ratio_t15 | 5461% | 33.9% | 1.50 | 23.3% | 76% | 73% | 15 | `bun src/backtest.ts --filter "ev_ebit > 0 AND ev_ebit < 5 AND pvp_ratio > 0 AND pvp_ratio < 0.5 AND avg_daily_liquidity > 1e6" --rank "pvp_ratio ASC" --top 15` |
| 23 | rand_966 | 5403% | 33.8% | 1.53 | 26.1% | 76% | 71% | 12 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 2 AND ev_ebit > 0 AND ev_ebit < 12 AND market_cap >= 5000000000 AND avg_daily_liquidity > 5e6" --rank "ev_ebit ASC" --top 12` |
| 24 | rand_439 | 5336% | 33.7% | 1.56 | 20.5% | 78% | 75% | 15 | `bun src/backtest.ts --filter "ev_ebit > 0 AND ev_ebit < 5 AND pvp_ratio > 0 AND pvp_ratio < 0.5 AND price_to_sales > 0 AND price_to_sales < 1.5 AND margem_ebit > 0.1 AND avg_daily_liquidity > 2e6" --rank "pl_ratio ASC" --top 15` |
| 25 | ks_deep_pl3_ev3_roe10_ml5_margem_liquida_t8 | 5327% | 33.7% | 1.57 | 22.6% | 80% | 71% | 8 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 3 AND ev_ebit > 0 AND ev_ebit < 3 AND roe > 0.1 AND margem_liquida > 0.05 AND avg_daily_liquidity > 1e6" --rank "margem_liquida DESC" --top 8` |

## Top 25 by Sharpe Ratio

| # | Strategy | Return | CAGR | Sharpe | MaxDD | Win% | α% | Top | Command |
|---|----------|-------:|-----:|-------:|------:|-----:|----:|----:|---------|
| 1 | rand_838 | 5974% | 34.8% | 1.73 | 21.4% | 82% | 73% | 12 | `bun src/backtest.ts --filter "ev_ebit > 0 AND ev_ebit < 4 AND price_to_sales > 0 AND price_to_sales < 0.5 AND roe > 0.15 AND margem_liquida > 0.2 AND market_cap < 10000000000 AND avg_daily_liquidity > 5e6" --rank "ev_ebit ASC" --top 12` |
| 2 | rand_1007 | 4770% | 32.6% | 1.65 | 25.1% | 76% | 75% | 10 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 3 AND ev_ebit > 0 AND ev_ebit < 5 AND pvp_ratio > 0 AND pvp_ratio < 0.75 AND market_cap >= 10000000000 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10` |
| 3 | rand_685 | 4254% | 31.6% | 1.63 | 20.9% | 78% | 73% | 15 | `bun src/backtest.ts --filter "ev_ebit > 0 AND ev_ebit < 3 AND pvp_ratio > 0 AND pvp_ratio < 0.5 AND roe > 0.2 AND liquidez_corrente > 2 AND market_cap >= 10000000000 AND avg_daily_liquidity > 2e6" --rank "price_to_sales ASC" --top 15` |
| 4 | rand_778 | 5791% | 34.5% | 1.62 | 34.0% | 76% | 76% | 15 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 2 AND ev_ebit > 0 AND ev_ebit < 8 AND pvp_ratio > 0 AND pvp_ratio < 0.75 AND price_to_sales > 0 AND price_to_sales < 1 AND roe > 0.15 AND market_cap >= 1000000000 AND avg_daily_liquidity > 5e6" --rank "margem_liquida DESC" --top 15` |
| 5 | rand_357 | 4108% | 31.3% | 1.60 | 23.3% | 78% | 73% | 15 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 20 AND ev_ebit > 0 AND ev_ebit < 2 AND pvp_ratio > 0 AND pvp_ratio < 0.75 AND margem_liquida > 0.05 AND margem_ebit > 0.1 AND avg_daily_liquidity > 5e6" --rank "price_to_sales ASC" --top 15` |
| 6 | rand_512 | 4365% | 31.8% | 1.60 | 26.3% | 84% | 75% | 12 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 4 AND ev_ebit > 0 AND ev_ebit < 3 AND price_to_sales > 0 AND price_to_sales < 0.5 AND roe > 0.25 AND margem_liquida > 0.1 AND margem_bruta > 0.2 AND avg_daily_liquidity > 2e6" --rank "roe DESC" --top 12` |
| 7 | rand_502 | 4431% | 32.0% | 1.58 | 23.3% | 78% | 67% | 20 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 20 AND ev_ebit > 0 AND ev_ebit < 2 AND pvp_ratio > 0 AND pvp_ratio < 0.75 AND price_to_sales > 0 AND price_to_sales < 1 AND divida_liquida_ebit < 10 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20` |
| 8 | rand_623 | 3229% | 29.0% | 1.58 | 22.1% | 76% | 71% | 15 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 4 AND roe > 0.05 AND margem_bruta > 0.4 AND market_cap >= 5000000000 AND avg_daily_liquidity > 5e6" --rank "ev_ebit ASC" --top 15` |
| 9 | rand_1492 | 4113% | 31.3% | 1.57 | 22.1% | 76% | 71% | 15 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 12 AND ev_ebit > 0 AND ev_ebit < 3 AND price_to_sales > 0 AND price_to_sales < 1 AND roe > 0.25 AND margem_liquida > 0.2 AND margem_bruta > 0.2 AND avg_daily_liquidity > 5e6" --rank "ev_ebit ASC" --top 15` |
| 10 | ks_deep_pl3_ev3_roe10_ml5_margem_liquida_t8 | 5327% | 33.7% | 1.57 | 22.6% | 80% | 71% | 8 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 3 AND ev_ebit > 0 AND ev_ebit < 3 AND roe > 0.1 AND margem_liquida > 0.05 AND avg_daily_liquidity > 1e6" --rank "margem_liquida DESC" --top 8` |
| 11 | rand_439 | 5336% | 33.7% | 1.56 | 20.5% | 78% | 75% | 15 | `bun src/backtest.ts --filter "ev_ebit > 0 AND ev_ebit < 5 AND pvp_ratio > 0 AND pvp_ratio < 0.5 AND price_to_sales > 0 AND price_to_sales < 1.5 AND margem_ebit > 0.1 AND avg_daily_liquidity > 2e6" --rank "pl_ratio ASC" --top 15` |
| 12 | rand_249 | 3481% | 29.7% | 1.55 | 19.8% | 78% | 67% | 12 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 10 AND ev_ebit > 0 AND ev_ebit < 3 AND pvp_ratio > 0 AND pvp_ratio < 0.5 AND avg_daily_liquidity > 2e6" --rank "ev_ebit ASC" --top 12` |
| 13 | ev2_pvp0.5_ev_ebit_t20 | 3781% | 30.5% | 1.55 | 23.3% | 80% | 69% | 20 | `bun src/backtest.ts --filter "ev_ebit > 0 AND ev_ebit < 2 AND pvp_ratio > 0 AND pvp_ratio < 0.5 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20` |
| 14 | rand_574 | 3805% | 30.5% | 1.55 | 23.5% | 84% | 71% | 15 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 6 AND ev_ebit > 0 AND ev_ebit < 3 AND avg_daily_liquidity > 1e7" --rank "price_to_sales ASC" --top 15` |
| 15 | ev3_pvp0.5_pvp_ratio_t5 | 6839% | 36.1% | 1.55 | 22.3% | 73% | 76% | 5 | `bun src/backtest.ts --filter "ev_ebit > 0 AND ev_ebit < 3 AND pvp_ratio > 0 AND pvp_ratio < 0.5 AND avg_daily_liquidity > 1e6" --rank "pvp_ratio ASC" --top 5` |
| 16 | rand_33 | 3725% | 30.3% | 1.55 | 19.7% | 82% | 69% | 15 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 20 AND ev_ebit > 0 AND ev_ebit < 3 AND margem_bruta > 0.3 AND avg_daily_liquidity > 1e7" --rank "pvp_ratio ASC" --top 15` |
| 17 | rand_526 | 3696% | 30.3% | 1.54 | 23.3% | 80% | 67% | 20 | `bun src/backtest.ts --filter "ev_ebit > 0 AND ev_ebit < 2 AND pvp_ratio > 0 AND pvp_ratio < 1.5 AND roe > 0.25 AND margem_liquida > 0.05 AND avg_daily_liquidity > 2e6" --rank "pvp_ratio ASC" --top 20` |
| 18 | ev3_pvp0.5_ev_ebit_t15 | 3258% | 29.1% | 1.54 | 20.9% | 76% | 67% | 15 | `bun src/backtest.ts --filter "ev_ebit > 0 AND ev_ebit < 3 AND pvp_ratio > 0 AND pvp_ratio < 0.5 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 15` |
| 19 | rand_486 | 3704% | 30.3% | 1.54 | 20.9% | 78% | 71% | 15 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 12 AND ev_ebit > 0 AND ev_ebit < 3 AND pvp_ratio > 0 AND pvp_ratio < 0.5 AND avg_daily_liquidity > 2e6" --rank "pvp_ratio ASC" --top 15` |
| 20 | ev2_pvp0.5_pvp_ratio_t15 | 3602% | 30.0% | 1.54 | 23.3% | 78% | 69% | 15 | `bun src/backtest.ts --filter "ev_ebit > 0 AND ev_ebit < 2 AND pvp_ratio > 0 AND pvp_ratio < 0.5 AND avg_daily_liquidity > 1e6" --rank "pvp_ratio ASC" --top 15` |
| 21 | rand_344 | 4587% | 32.3% | 1.54 | 20.8% | 80% | 66% | 12 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 10 AND ev_ebit > 0 AND ev_ebit < 2 AND divida_liquida_ebit < 2 AND avg_daily_liquidity > 1e6" --rank "pvp_ratio ASC" --top 12` |
| 22 | ev3_pvp1_pvp_ratio_t15 | 3430% | 29.6% | 1.54 | 20.9% | 78% | 69% | 15 | `bun src/backtest.ts --filter "ev_ebit > 0 AND ev_ebit < 3 AND pvp_ratio > 0 AND pvp_ratio < 1 AND avg_daily_liquidity > 1e6" --rank "pvp_ratio ASC" --top 15` |
| 23 | rand_1250 | 3938% | 30.9% | 1.53 | 19.1% | 78% | 67% | 12 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 20 AND ev_ebit > 0 AND ev_ebit < 3 AND pvp_ratio > 0 AND pvp_ratio < 2 AND margem_liquida > 0.1 AND margem_ebit > 0.2 AND avg_daily_liquidity > 2e6" --rank "pvp_ratio ASC" --top 12` |
| 24 | rand_966 | 5403% | 33.8% | 1.53 | 26.1% | 76% | 71% | 12 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 2 AND ev_ebit > 0 AND ev_ebit < 12 AND market_cap >= 5000000000 AND avg_daily_liquidity > 5e6" --rank "ev_ebit ASC" --top 12` |
| 25 | ev2_pvp1_pvp_ratio_t15 | 3350% | 29.4% | 1.53 | 23.3% | 76% | 69% | 15 | `bun src/backtest.ts --filter "ev_ebit > 0 AND ev_ebit < 2 AND pvp_ratio > 0 AND pvp_ratio < 1 AND avg_daily_liquidity > 1e6" --rank "pvp_ratio ASC" --top 15` |

## Top 25 Lowest Drawdown (CAGR > 15%)

| # | Strategy | Return | CAGR | Sharpe | MaxDD | Win% | α% | Top | Command |
|---|----------|-------:|-----:|-------:|------:|-----:|----:|----:|---------|
| 1 | rand_119 | 5093% | 33.3% | 1.49 | 18.5% | 75% | 71% | 8 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 15 AND ev_ebit > 0 AND ev_ebit < 4 AND pvp_ratio > 0 AND pvp_ratio < 0.5 AND market_cap >= 1000000000 AND market_cap < 10000000000 AND avg_daily_liquidity > 1e6" --rank "pvp_ratio ASC" --top 8` |
| 2 | ev3_pvp0.5_ev_ebit_t10 | 3182% | 28.9% | 1.48 | 18.8% | 76% | 71% | 10 | `bun src/backtest.ts --filter "ev_ebit > 0 AND ev_ebit < 3 AND pvp_ratio > 0 AND pvp_ratio < 0.5 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10` |
| 3 | rand_1051 | 2595% | 27.1% | 1.43 | 19.1% | 78% | 71% | 15 | `bun src/backtest.ts --filter "ev_ebit > 0 AND ev_ebit < 4 AND margem_liquida > 0.2 AND market_cap < 50000000000 AND avg_daily_liquidity > 1e7" --rank "pvp_ratio ASC" --top 15` |
| 4 | rand_1250 | 3938% | 30.9% | 1.53 | 19.1% | 78% | 67% | 12 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 20 AND ev_ebit > 0 AND ev_ebit < 3 AND pvp_ratio > 0 AND pvp_ratio < 2 AND margem_liquida > 0.1 AND margem_ebit > 0.2 AND avg_daily_liquidity > 2e6" --rank "pvp_ratio ASC" --top 12` |
| 5 | ev3_pvp0.5_pvp_ratio_t10 | 3473% | 29.7% | 1.50 | 19.4% | 75% | 73% | 10 | `bun src/backtest.ts --filter "ev_ebit > 0 AND ev_ebit < 3 AND pvp_ratio > 0 AND pvp_ratio < 0.5 AND avg_daily_liquidity > 1e6" --rank "pvp_ratio ASC" --top 10` |
| 6 | rand_42 | 3583% | 30.0% | 1.36 | 19.5% | 73% | 67% | 8 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 15 AND ev_ebit > 0 AND ev_ebit < 2 AND margem_bruta > 0.4 AND liquidez_corrente > 1.5 AND avg_daily_liquidity > 1e6" --rank "margem_liquida DESC" --top 8` |
| 7 | rand_187 | 3876% | 30.7% | 1.39 | 19.5% | 73% | 69% | 8 | `bun src/backtest.ts --filter "ev_ebit > 0 AND ev_ebit < 2 AND margem_liquida > 0.15 AND margem_ebit > 0.1 AND avg_daily_liquidity > 2e6" --rank "pvp_ratio ASC" --top 8` |
| 8 | rand_237 | 3880% | 30.7% | 1.38 | 19.5% | 73% | 67% | 8 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 4 AND ev_ebit > 0 AND ev_ebit < 2 AND margem_liquida > 0.2 AND margem_ebit > 0.15 AND avg_daily_liquidity > 5e6" --rank "price_to_sales ASC" --top 8` |
| 9 | rand_649 | 4081% | 31.2% | 1.52 | 19.6% | 80% | 64% | 12 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 6 AND ev_ebit > 0 AND ev_ebit < 2 AND liquidez_corrente > 2 AND avg_daily_liquidity > 1e6" --rank "pvp_ratio ASC" --top 12` |
| 10 | rand_33 | 3725% | 30.3% | 1.55 | 19.7% | 82% | 69% | 15 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 20 AND ev_ebit > 0 AND ev_ebit < 3 AND margem_bruta > 0.3 AND avg_daily_liquidity > 1e7" --rank "pvp_ratio ASC" --top 15` |
| 11 | rand_249 | 3481% | 29.7% | 1.55 | 19.8% | 78% | 67% | 12 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 10 AND ev_ebit > 0 AND ev_ebit < 3 AND pvp_ratio > 0 AND pvp_ratio < 0.5 AND avg_daily_liquidity > 2e6" --rank "ev_ebit ASC" --top 12` |
| 12 | rand_92 | 2968% | 28.3% | 1.31 | 19.9% | 76% | 66% | 8 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 4 AND price_to_sales > 0 AND price_to_sales < 1.5 AND market_cap < 10000000000 AND avg_daily_liquidity > 1e6" --rank "pvp_ratio ASC" --top 8` |
| 13 | rand_56 | 2994% | 28.4% | 1.40 | 20.2% | 78% | 66% | 10 | `bun src/backtest.ts --filter "ev_ebit > 0 AND ev_ebit < 4 AND avg_daily_liquidity > 1e7" --rank "pl_ratio ASC" --top 10` |
| 14 | rand_439 | 5336% | 33.7% | 1.56 | 20.5% | 78% | 75% | 15 | `bun src/backtest.ts --filter "ev_ebit > 0 AND ev_ebit < 5 AND pvp_ratio > 0 AND pvp_ratio < 0.5 AND price_to_sales > 0 AND price_to_sales < 1.5 AND margem_ebit > 0.1 AND avg_daily_liquidity > 2e6" --rank "pl_ratio ASC" --top 15` |
| 15 | liq_bestPL3EV3ML5_liq2m_t15 | 3153% | 28.8% | 1.43 | 20.5% | 80% | 67% | 15 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 3 AND ev_ebit > 0 AND ev_ebit < 3 AND margem_liquida > 0.05 AND avg_daily_liquidity > 2e6" --rank "ev_ebit ASC" --top 15` |
| 16 | rand_1160 | 3047% | 28.5% | 1.42 | 20.7% | 76% | 73% | 8 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 10 AND ev_ebit > 0 AND ev_ebit < 8 AND pvp_ratio > 0 AND pvp_ratio < 0.5 AND divida_liquida_ebit < 2 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 8` |
| 17 | pl2_ev10_pl_ratio_t10 | 2542% | 26.9% | 1.27 | 20.8% | 71% | 66% | 10 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 2 AND ev_ebit > 0 AND ev_ebit < 10 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10` |
| 18 | pl2_ev15_pl_ratio_t10 | 2531% | 26.8% | 1.22 | 20.8% | 69% | 64% | 10 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 2 AND ev_ebit > 0 AND ev_ebit < 15 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10` |
| 19 | rand_344 | 4587% | 32.3% | 1.54 | 20.8% | 80% | 66% | 12 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 10 AND ev_ebit > 0 AND ev_ebit < 2 AND divida_liquida_ebit < 2 AND avg_daily_liquidity > 1e6" --rank "pvp_ratio ASC" --top 12` |
| 20 | ev3_pvp0.5_ev_ebit_t15 | 3258% | 29.1% | 1.54 | 20.9% | 76% | 67% | 15 | `bun src/backtest.ts --filter "ev_ebit > 0 AND ev_ebit < 3 AND pvp_ratio > 0 AND pvp_ratio < 0.5 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 15` |
| 21 | ev3_pvp0.5_pvp_ratio_t15 | 3598% | 30.0% | 1.53 | 20.9% | 78% | 69% | 15 | `bun src/backtest.ts --filter "ev_ebit > 0 AND ev_ebit < 3 AND pvp_ratio > 0 AND pvp_ratio < 0.5 AND avg_daily_liquidity > 1e6" --rank "pvp_ratio ASC" --top 15` |
| 22 | ev3_pvp1_pvp_ratio_t15 | 3430% | 29.6% | 1.54 | 20.9% | 78% | 69% | 15 | `bun src/backtest.ts --filter "ev_ebit > 0 AND ev_ebit < 3 AND pvp_ratio > 0 AND pvp_ratio < 1 AND avg_daily_liquidity > 1e6" --rank "pvp_ratio ASC" --top 15` |
| 23 | ev3_pvp1.5_pvp_ratio_t15 | 3329% | 29.3% | 1.51 | 20.9% | 78% | 69% | 15 | `bun src/backtest.ts --filter "ev_ebit > 0 AND ev_ebit < 3 AND pvp_ratio > 0 AND pvp_ratio < 1.5 AND avg_daily_liquidity > 1e6" --rank "pvp_ratio ASC" --top 15` |
| 24 | ev3_pvp2_pvp_ratio_t15 | 3261% | 29.1% | 1.48 | 20.9% | 78% | 67% | 15 | `bun src/backtest.ts --filter "ev_ebit > 0 AND ev_ebit < 3 AND pvp_ratio > 0 AND pvp_ratio < 2 AND avg_daily_liquidity > 1e6" --rank "pvp_ratio ASC" --top 15` |
| 25 | rand_486 | 3704% | 30.3% | 1.54 | 20.9% | 78% | 71% | 15 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 12 AND ev_ebit > 0 AND ev_ebit < 3 AND pvp_ratio > 0 AND pvp_ratio < 0.5 AND avg_daily_liquidity > 2e6" --rank "pvp_ratio ASC" --top 15` |

## Top 25 by Robust Score (Sharpe × (1+CAGR) / (1+DD))

| # | Strategy | Return | CAGR | Sharpe | MaxDD | Win% | α% | Top | Command |
|---|----------|-------:|-----:|-------:|------:|-----:|----:|----:|---------|
| 1 | rand_838 | 5974% | 34.8% | 1.73 | 21.4% | 82% | 73% | 12 | `bun src/backtest.ts --filter "ev_ebit > 0 AND ev_ebit < 4 AND price_to_sales > 0 AND price_to_sales < 0.5 AND roe > 0.15 AND margem_liquida > 0.2 AND market_cap < 10000000000 AND avg_daily_liquidity > 5e6" --rank "ev_ebit ASC" --top 12` |
| 2 | rand_685 | 4254% | 31.6% | 1.63 | 20.9% | 78% | 73% | 15 | `bun src/backtest.ts --filter "ev_ebit > 0 AND ev_ebit < 3 AND pvp_ratio > 0 AND pvp_ratio < 0.5 AND roe > 0.2 AND liquidez_corrente > 2 AND market_cap >= 10000000000 AND avg_daily_liquidity > 2e6" --rank "price_to_sales ASC" --top 15` |
| 3 | rand_1007 | 4770% | 32.6% | 1.65 | 25.1% | 76% | 75% | 10 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 3 AND ev_ebit > 0 AND ev_ebit < 5 AND pvp_ratio > 0 AND pvp_ratio < 0.75 AND market_cap >= 10000000000 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 10` |
| 4 | rand_439 | 5336% | 33.7% | 1.56 | 20.5% | 78% | 75% | 15 | `bun src/backtest.ts --filter "ev_ebit > 0 AND ev_ebit < 5 AND pvp_ratio > 0 AND pvp_ratio < 0.5 AND price_to_sales > 0 AND price_to_sales < 1.5 AND margem_ebit > 0.1 AND avg_daily_liquidity > 2e6" --rank "pl_ratio ASC" --top 15` |
| 5 | ev3_pvp0.5_pvp_ratio_t5 | 6839% | 36.1% | 1.55 | 22.3% | 73% | 76% | 5 | `bun src/backtest.ts --filter "ev_ebit > 0 AND ev_ebit < 3 AND pvp_ratio > 0 AND pvp_ratio < 0.5 AND avg_daily_liquidity > 1e6" --rank "pvp_ratio ASC" --top 5` |
| 6 | ks_deep_pl3_ev3_roe10_ml5_margem_liquida_t8 | 5327% | 33.7% | 1.57 | 22.6% | 80% | 71% | 8 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 3 AND ev_ebit > 0 AND ev_ebit < 3 AND roe > 0.1 AND margem_liquida > 0.05 AND avg_daily_liquidity > 1e6" --rank "margem_liquida DESC" --top 8` |
| 7 | rand_357 | 4108% | 31.3% | 1.60 | 23.3% | 78% | 73% | 15 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 20 AND ev_ebit > 0 AND ev_ebit < 2 AND pvp_ratio > 0 AND pvp_ratio < 0.75 AND margem_liquida > 0.05 AND margem_ebit > 0.1 AND avg_daily_liquidity > 5e6" --rank "price_to_sales ASC" --top 15` |
| 8 | rand_502 | 4431% | 32.0% | 1.58 | 23.3% | 78% | 67% | 20 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 20 AND ev_ebit > 0 AND ev_ebit < 2 AND pvp_ratio > 0 AND pvp_ratio < 0.75 AND price_to_sales > 0 AND price_to_sales < 1 AND divida_liquida_ebit < 10 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20` |
| 9 | rand_1492 | 4113% | 31.3% | 1.57 | 22.1% | 76% | 71% | 15 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 12 AND ev_ebit > 0 AND ev_ebit < 3 AND price_to_sales > 0 AND price_to_sales < 1 AND roe > 0.25 AND margem_liquida > 0.2 AND margem_bruta > 0.2 AND avg_daily_liquidity > 5e6" --rank "ev_ebit ASC" --top 15` |
| 10 | rand_344 | 4587% | 32.3% | 1.54 | 20.8% | 80% | 66% | 12 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 10 AND ev_ebit > 0 AND ev_ebit < 2 AND divida_liquida_ebit < 2 AND avg_daily_liquidity > 1e6" --rank "pvp_ratio ASC" --top 12` |
| 11 | rand_33 | 3725% | 30.3% | 1.55 | 19.7% | 82% | 69% | 15 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 20 AND ev_ebit > 0 AND ev_ebit < 3 AND margem_bruta > 0.3 AND avg_daily_liquidity > 1e7" --rank "pvp_ratio ASC" --top 15` |
| 12 | rand_1250 | 3938% | 30.9% | 1.53 | 19.1% | 78% | 67% | 12 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 20 AND ev_ebit > 0 AND ev_ebit < 3 AND pvp_ratio > 0 AND pvp_ratio < 2 AND margem_liquida > 0.1 AND margem_ebit > 0.2 AND avg_daily_liquidity > 2e6" --rank "pvp_ratio ASC" --top 12` |
| 13 | rand_249 | 3481% | 29.7% | 1.55 | 19.8% | 78% | 67% | 12 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 10 AND ev_ebit > 0 AND ev_ebit < 3 AND pvp_ratio > 0 AND pvp_ratio < 0.5 AND avg_daily_liquidity > 2e6" --rank "ev_ebit ASC" --top 12` |
| 14 | rand_119 | 5093% | 33.3% | 1.49 | 18.5% | 75% | 71% | 8 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 15 AND ev_ebit > 0 AND ev_ebit < 4 AND pvp_ratio > 0 AND pvp_ratio < 0.5 AND market_cap >= 1000000000 AND market_cap < 10000000000 AND avg_daily_liquidity > 1e6" --rank "pvp_ratio ASC" --top 8` |
| 15 | rand_512 | 4365% | 31.8% | 1.60 | 26.3% | 84% | 75% | 12 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 4 AND ev_ebit > 0 AND ev_ebit < 3 AND price_to_sales > 0 AND price_to_sales < 0.5 AND roe > 0.25 AND margem_liquida > 0.1 AND margem_bruta > 0.2 AND avg_daily_liquidity > 2e6" --rank "roe DESC" --top 12` |
| 16 | rand_623 | 3229% | 29.0% | 1.58 | 22.1% | 76% | 71% | 15 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 4 AND roe > 0.05 AND margem_bruta > 0.4 AND market_cap >= 5000000000 AND avg_daily_liquidity > 5e6" --rank "ev_ebit ASC" --top 15` |
| 17 | rand_649 | 4081% | 31.2% | 1.52 | 19.6% | 80% | 64% | 12 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 6 AND ev_ebit > 0 AND ev_ebit < 2 AND liquidez_corrente > 2 AND avg_daily_liquidity > 1e6" --rank "pvp_ratio ASC" --top 12` |
| 18 | rand_486 | 3704% | 30.3% | 1.54 | 20.9% | 78% | 71% | 15 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 12 AND ev_ebit > 0 AND ev_ebit < 3 AND pvp_ratio > 0 AND pvp_ratio < 0.5 AND avg_daily_liquidity > 2e6" --rank "pvp_ratio ASC" --top 15` |
| 19 | ev3_pvp0.5_ev_ebit_t15 | 3258% | 29.1% | 1.54 | 20.9% | 76% | 67% | 15 | `bun src/backtest.ts --filter "ev_ebit > 0 AND ev_ebit < 3 AND pvp_ratio > 0 AND pvp_ratio < 0.5 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 15` |
| 20 | ev3_pvp1_pvp_ratio_t15 | 3430% | 29.6% | 1.54 | 20.9% | 78% | 69% | 15 | `bun src/backtest.ts --filter "ev_ebit > 0 AND ev_ebit < 3 AND pvp_ratio > 0 AND pvp_ratio < 1 AND avg_daily_liquidity > 1e6" --rank "pvp_ratio ASC" --top 15` |
| 21 | ev3_pvp0.5_pvp_ratio_t15 | 3598% | 30.0% | 1.53 | 20.9% | 78% | 69% | 15 | `bun src/backtest.ts --filter "ev_ebit > 0 AND ev_ebit < 3 AND pvp_ratio > 0 AND pvp_ratio < 0.5 AND avg_daily_liquidity > 1e6" --rank "pvp_ratio ASC" --top 15` |
| 22 | ev2_pvp0.5_ev_ebit_t20 | 3781% | 30.5% | 1.55 | 23.3% | 80% | 69% | 20 | `bun src/backtest.ts --filter "ev_ebit > 0 AND ev_ebit < 2 AND pvp_ratio > 0 AND pvp_ratio < 0.5 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 20` |
| 23 | rand_574 | 3805% | 30.5% | 1.55 | 23.5% | 84% | 71% | 15 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 6 AND ev_ebit > 0 AND ev_ebit < 3 AND avg_daily_liquidity > 1e7" --rank "price_to_sales ASC" --top 15` |
| 24 | rand_1490 | 10704% | 40.6% | 1.44 | 23.9% | 75% | 76% | 15 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 2 AND price_to_sales > 0 AND price_to_sales < 1.5 AND liquidez_corrente > 2 AND market_cap >= 1000000000 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 15` |
| 25 | rand_526 | 3696% | 30.3% | 1.54 | 23.3% | 80% | 67% | 20 | `bun src/backtest.ts --filter "ev_ebit > 0 AND ev_ebit < 2 AND pvp_ratio > 0 AND pvp_ratio < 1.5 AND roe > 0.25 AND margem_liquida > 0.05 AND avg_daily_liquidity > 2e6" --rank "pvp_ratio ASC" --top 20` |

## Top 25 by Alpha Rate (% quarters beating BOVA11)

| # | Strategy | Return | CAGR | Sharpe | MaxDD | Win% | α% | Top | Command |
|---|----------|-------:|-----:|-------:|------:|-----:|----:|----:|---------|
| 1 | rand_321 | 2245% | 25.8% | 1.26 | 26.8% | 69% | 80% | 30 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 6 AND ev_ebit > 0 AND ev_ebit < 5 AND roe > 0.15 AND margem_liquida > 0.2 AND avg_daily_liquidity > 5e6" --rank "pl_ratio ASC" --top 30` |
| 2 | rand_739 | 3917% | 30.8% | 1.33 | 34.6% | 71% | 80% | 20 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 2 AND price_to_sales > 0 AND price_to_sales < 1.5 AND roe > 0.15 AND liquidez_corrente > 1.5 AND avg_daily_liquidity > 2e6" --rank "roe DESC" --top 20` |
| 3 | ev3_pvp0.5_pvp_ratio_t30 | 2958% | 28.2% | 1.40 | 26.1% | 75% | 78% | 30 | `bun src/backtest.ts --filter "ev_ebit > 0 AND ev_ebit < 3 AND pvp_ratio > 0 AND pvp_ratio < 0.5 AND avg_daily_liquidity > 1e6" --rank "pvp_ratio ASC" --top 30` |
| 4 | ev5_pvp0.5_pvp_ratio_t30 | 3395% | 29.5% | 1.37 | 28.2% | 71% | 78% | 30 | `bun src/backtest.ts --filter "ev_ebit > 0 AND ev_ebit < 5 AND pvp_ratio > 0 AND pvp_ratio < 0.5 AND avg_daily_liquidity > 1e6" --rank "pvp_ratio ASC" --top 30` |
| 5 | ev5_pvp1.5_pvp_ratio_t30 | 1982% | 24.7% | 1.24 | 27.0% | 73% | 78% | 30 | `bun src/backtest.ts --filter "ev_ebit > 0 AND ev_ebit < 5 AND pvp_ratio > 0 AND pvp_ratio < 1.5 AND avg_daily_liquidity > 1e6" --rank "pvp_ratio ASC" --top 30` |
| 6 | ev8_me15_t10 | 2256% | 25.8% | 1.18 | 35.9% | 76% | 78% | 10 | `bun src/backtest.ts --filter "ev_ebit > 0 AND ev_ebit < 8 AND margem_ebit > 0.15 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10` |
| 7 | ev10_me15_t10 | 1954% | 24.6% | 1.11 | 39.6% | 76% | 78% | 10 | `bun src/backtest.ts --filter "ev_ebit > 0 AND ev_ebit < 10 AND margem_ebit > 0.15 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 10` |
| 8 | ks_pl5_ev5_pvp1_roe15_ml10_margem_liquida_t15 | 2176% | 25.5% | 1.24 | 36.8% | 78% | 78% | 15 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND pvp_ratio > 0 AND pvp_ratio < 1 AND roe > 0.15 AND margem_liquida > 0.1 AND avg_daily_liquidity > 1e6" --rank "margem_liquida DESC" --top 15` |
| 9 | liq_bestEV5_liq10m_t30 | 2366% | 26.3% | 1.30 | 27.1% | 69% | 78% | 30 | `bun src/backtest.ts --filter "ev_ebit > 0 AND ev_ebit < 5 AND avg_daily_liquidity > 1e7" --rank "ev_ebit ASC" --top 30` |
| 10 | rand_156 | 4739% | 32.6% | 1.48 | 26.2% | 73% | 78% | 10 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 2 AND ev_ebit > 0 AND ev_ebit < 20 AND margem_liquida > 0.2 AND margem_ebit > 0.15 AND liquidez_corrente > 1.5 AND avg_daily_liquidity > 1e7" --rank "roe DESC" --top 10` |
| 11 | rand_400 | 3882% | 30.7% | 1.41 | 30.9% | 73% | 78% | 20 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 3 AND ev_ebit > 0 AND ev_ebit < 8 AND pvp_ratio > 0 AND pvp_ratio < 2 AND margem_liquida > 0.15 AND margem_bruta > 0.2 AND liquidez_corrente > 1.5 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 20` |
| 12 | rand_899 | 2169% | 25.5% | 1.23 | 27.1% | 71% | 78% | 30 | `bun src/backtest.ts --filter "ev_ebit > 0 AND ev_ebit < 5 AND pvp_ratio > 0 AND pvp_ratio < 0.75 AND roe > 0.05 AND margem_ebit > 0.15 AND liquidez_corrente > 1 AND avg_daily_liquidity > 1e7" --rank "roe DESC" --top 30` |
| 13 | rand_968 | 1934% | 24.5% | 1.11 | 35.9% | 73% | 78% | 10 | `bun src/backtest.ts --filter "ev_ebit > 0 AND ev_ebit < 8 AND roe > 0.1 AND margem_liquida > 0.15 AND margem_ebit > 0.1 AND liquidez_corrente > 1 AND market_cap >= 1000000000 AND avg_daily_liquidity > 2e6" --rank "pvp_ratio ASC" --top 10` |
| 14 | rand_1203 | 2317% | 26.1% | 1.24 | 30.6% | 71% | 78% | 15 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 3 AND roe > 0.15 AND margem_ebit > 0.1 AND avg_daily_liquidity > 1e7" --rank "roe DESC" --top 15` |
| 15 | rand_1338 | 2750% | 27.6% | 1.32 | 32.6% | 84% | 78% | 15 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 4 AND ev_ebit > 0 AND ev_ebit < 5 AND pvp_ratio > 0 AND pvp_ratio < 1 AND roe > 0.2 AND market_cap < 1000000000000 AND avg_daily_liquidity > 1e7" --rank "margem_liquida DESC" --top 15` |
| 16 | pl2_pvp1.5_pl_ratio_t15 | 3764% | 30.4% | 1.32 | 30.1% | 69% | 76% | 15 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 2 AND pvp_ratio > 0 AND pvp_ratio < 1.5 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 15` |
| 17 | pl2_pvp2_pl_ratio_t15 | 3694% | 30.3% | 1.30 | 30.1% | 69% | 76% | 15 | `bun src/backtest.ts --filter "pl_ratio > 0 AND pl_ratio < 2 AND pvp_ratio > 0 AND pvp_ratio < 2 AND avg_daily_liquidity > 1e6" --rank "pl_ratio ASC" --top 15` |
| 18 | ev3_pvp0.5_ev_ebit_t5 | 6411% | 35.5% | 1.45 | 22.3% | 71% | 76% | 5 | `bun src/backtest.ts --filter "ev_ebit > 0 AND ev_ebit < 3 AND pvp_ratio > 0 AND pvp_ratio < 0.5 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 5` |
| 19 | ev3_pvp0.5_pvp_ratio_t5 | 6839% | 36.1% | 1.55 | 22.3% | 73% | 76% | 5 | `bun src/backtest.ts --filter "ev_ebit > 0 AND ev_ebit < 3 AND pvp_ratio > 0 AND pvp_ratio < 0.5 AND avg_daily_liquidity > 1e6" --rank "pvp_ratio ASC" --top 5` |
| 20 | ev3_pvp0.5_ev_ebit_t30 | 3035% | 28.5% | 1.41 | 26.1% | 75% | 76% | 30 | `bun src/backtest.ts --filter "ev_ebit > 0 AND ev_ebit < 3 AND pvp_ratio > 0 AND pvp_ratio < 0.5 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 30` |
| 21 | ev5_pvp0.5_ev_ebit_t15 | 3830% | 30.6% | 1.44 | 24.3% | 78% | 76% | 15 | `bun src/backtest.ts --filter "ev_ebit > 0 AND ev_ebit < 5 AND pvp_ratio > 0 AND pvp_ratio < 0.5 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 15` |
| 22 | ev5_pvp0.5_ev_ebit_t30 | 3007% | 28.4% | 1.35 | 28.8% | 73% | 76% | 30 | `bun src/backtest.ts --filter "ev_ebit > 0 AND ev_ebit < 5 AND pvp_ratio > 0 AND pvp_ratio < 0.5 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 30` |
| 23 | ev5_pvp1_pvp_ratio_t15 | 2707% | 27.4% | 1.29 | 31.6% | 78% | 76% | 15 | `bun src/backtest.ts --filter "ev_ebit > 0 AND ev_ebit < 5 AND pvp_ratio > 0 AND pvp_ratio < 1 AND avg_daily_liquidity > 1e6" --rank "pvp_ratio ASC" --top 15` |
| 24 | ev5_pvp1_ev_ebit_t30 | 2292% | 26.0% | 1.28 | 26.8% | 73% | 76% | 30 | `bun src/backtest.ts --filter "ev_ebit > 0 AND ev_ebit < 5 AND pvp_ratio > 0 AND pvp_ratio < 1 AND avg_daily_liquidity > 1e6" --rank "ev_ebit ASC" --top 30` |
| 25 | ev5_pvp1_pvp_ratio_t30 | 2737% | 27.5% | 1.35 | 28.0% | 73% | 76% | 30 | `bun src/backtest.ts --filter "ev_ebit > 0 AND ev_ebit < 5 AND pvp_ratio > 0 AND pvp_ratio < 1 AND avg_daily_liquidity > 1e6" --rank "pvp_ratio ASC" --top 30` |

## Per-Category Best

### 1.value_ev

| Strategy | Return | CAGR | Sharpe | MaxDD | Top |
|----------|-------:|-----:|-------:|------:|----:|
| ev_lt2_t5 | 4340% | 31.8% | 1.31 | 25.8% | 5 |
| ev_lt2_t10 | 3968% | 30.9% | 1.47 | 25.6% | 10 |
| ev_lt2_t20 | 3747% | 30.4% | 1.49 | 22.5% | 20 |

### 1.value_pl

| Strategy | Return | CAGR | Sharpe | MaxDD | Top |
|----------|-------:|-----:|-------:|------:|----:|
| pl_lt2_t15 | 5540% | 34.1% | 1.20 | 27.7% | 15 |
| pl_lt2.5_t20 | 5020% | 33.1% | 1.24 | 29.5% | 20 |
| pl_lt2_t20 | 4460% | 32.0% | 1.21 | 27.8% | 20 |

### 1.value_ps

| Strategy | Return | CAGR | Sharpe | MaxDD | Top |
|----------|-------:|-----:|-------:|------:|----:|
| ps_lt0.3_t30 | 1365% | 21.6% | 0.83 | 32.6% | 30 |
| ps_lt0.3_t15 | 1206% | 20.6% | 0.77 | 50.8% | 15 |
| ps_lt0.5_t15 | 1122% | 20.0% | 0.75 | 50.8% | 15 |

### 1.value_pvp

| Strategy | Return | CAGR | Sharpe | MaxDD | Top |
|----------|-------:|-----:|-------:|------:|----:|
| pvp_lt0.3_t10 | 2111% | 25.3% | 0.89 | 40.7% | 10 |
| pvp_lt0.5_t10 | 1977% | 24.7% | 0.88 | 40.9% | 10 |
| pvp_lt0.75_t10 | 1977% | 24.7% | 0.88 | 40.9% | 10 |

### 10.deep_value

| Strategy | Return | CAGR | Sharpe | MaxDD | Top |
|----------|-------:|-----:|-------:|------:|----:|
| deep_pl_ratio_2.5_t25 | 3976% | 30.9% | 1.24 | 28.6% | 25 |
| deep_pl_ratio_1.5_t40 | 3759% | 30.4% | 1.22 | 30.3% | 40 |
| deep_ev_ebit_1.5_t25 | 3415% | 29.5% | 1.46 | 23.5% | 25 |

### 10.deep_value_qual

| Strategy | Return | CAGR | Sharpe | MaxDD | Top |
|----------|-------:|-----:|-------:|------:|----:|
| deepq_2_margemebit01_t15 | 6565% | 35.7% | 1.24 | 25.8% | 15 |
| deepq_2_margemliquida005_t15 | 6125% | 35.0% | 1.21 | 27.7% | 15 |
| deepq_2_margembruta02_t15 | 5948% | 34.8% | 1.21 | 28.0% | 15 |

### 11.quality_only

| Strategy | Return | CAGR | Sharpe | MaxDD | Top |
|----------|-------:|-----:|-------:|------:|----:|
| qo_roe20_ml10_mb30_margem_liquida_t20 | 603% | 15.2% | 0.78 | 37.1% | 20 |
| qo_roe15_roa10_ml10_roe_t5 | 576% | 14.9% | 0.71 | 45.0% | 5 |
| qo_roe15_roa10_ml10_roe_t10 | 560% | 14.7% | 0.72 | 40.3% | 10 |

### 12.cross_rank

| Strategy | Return | CAGR | Sharpe | MaxDD | Top |
|----------|-------:|-----:|-------:|------:|----:|
| cross_ev10_rk_pvp_ratio_t10 | 2839% | 27.9% | 1.10 | 34.5% | 10 |
| cross_ev5_rk_price_to_sales_t10 | 2775% | 27.7% | 1.24 | 29.6% | 10 |
| cross_ev5_rk_pvp_ratio_t20 | 2630% | 27.2% | 1.33 | 23.3% | 20 |

### 13.yield

| Strategy | Return | CAGR | Sharpe | MaxDD | Top |
|----------|-------:|-----:|-------:|------:|----:|
| yield_pl3_ml0.1_dle2_t10 | 3836% | 30.6% | 1.40 | 26.0% | 10 |
| yield_pl3_ml0.15_dle2_t10 | 3657% | 30.2% | 1.43 | 26.0% | 10 |
| yield_pl3_ml0.15_dle3_t10 | 3618% | 30.1% | 1.34 | 31.6% | 10 |

### 14.garp

| Strategy | Return | CAGR | Sharpe | MaxDD | Top |
|----------|-------:|-----:|-------:|------:|----:|
| garp_pl20_roe0.2_ml0.15_t10 | 1369% | 21.6% | 1.05 | 37.4% | 10 |
| garp_pl15_roe0.2_ml0.1_t10 | 1336% | 21.4% | 0.97 | 47.5% | 10 |
| garp_pl15_roe0.2_ml0.15_t10 | 1319% | 21.3% | 1.02 | 41.4% | 10 |

### 15.random

| Strategy | Return | CAGR | Sharpe | MaxDD | Top |
|----------|-------:|-----:|-------:|------:|----:|
| rand_1490 | 10704% | 40.6% | 1.44 | 23.9% | 15 |
| rand_896 | 6303% | 35.3% | 1.44 | 26.9% | 5 |
| rand_838 | 5974% | 34.8% | 1.73 | 21.4% | 12 |

### 16.concentrated

| Strategy | Return | CAGR | Sharpe | MaxDD | Top |
|----------|-------:|-----:|-------:|------:|----:|
| concentrated_sw_ev2_t4 | 3994% | 31.0% | 1.17 | 27.7% | 4 |
| concentrated_sw_pl3_ev3_ml5_t4 | 2802% | 27.8% | 1.02 | 31.2% | 4 |
| concentrated_sw_ev3_t4 | 1898% | 24.3% | 1.04 | 24.1% | 4 |

### 2.qual_mb

| Strategy | Return | CAGR | Sharpe | MaxDD | Top |
|----------|-------:|-----:|-------:|------:|----:|
| mb_gt0.1_t30 | 114% | 5.7% | 0.35 | 42.7% | 30 |
| mb_gt0.2_t30 | 114% | 5.7% | 0.35 | 42.7% | 30 |
| mb_gt0.3_t30 | 110% | 5.5% | 0.34 | 42.7% | 30 |

### 2.qual_me

| Strategy | Return | CAGR | Sharpe | MaxDD | Top |
|----------|-------:|-----:|-------:|------:|----:|
| me_gt0.05_t5 | 395% | 12.3% | 0.56 | 39.0% | 5 |
| me_gt0.1_t5 | 395% | 12.3% | 0.56 | 39.0% | 5 |
| me_gt0.15_t5 | 395% | 12.3% | 0.56 | 39.0% | 5 |

### 2.qual_ml

| Strategy | Return | CAGR | Sharpe | MaxDD | Top |
|----------|-------:|-----:|-------:|------:|----:|
| ml_gt0.25_t15 | 410% | 12.6% | 0.65 | 35.7% | 15 |
| ml_gt0.25_t20 | 409% | 12.6% | 0.67 | 36.3% | 20 |
| ml_gt0.03_t15 | 400% | 12.4% | 0.64 | 35.7% | 15 |

### 2.qual_roa

| Strategy | Return | CAGR | Sharpe | MaxDD | Top |
|----------|-------:|-----:|-------:|------:|----:|
| roa_gt0.05_t30 | 459% | 13.3% | 0.71 | 37.6% | 30 |
| roa_gt0.03_t30 | 455% | 13.3% | 0.71 | 37.6% | 30 |
| roa_gt0.08_t20 | 445% | 13.1% | 0.69 | 39.9% | 20 |

### 2.qual_roe

| Strategy | Return | CAGR | Sharpe | MaxDD | Top |
|----------|-------:|-----:|-------:|------:|----:|
| roe_gt0.3_t30 | 591% | 15.1% | 0.78 | 38.4% | 30 |
| roe_gt0.05_t15 | 573% | 14.9% | 0.74 | 38.9% | 15 |
| roe_gt0.1_t15 | 573% | 14.9% | 0.74 | 38.9% | 15 |

### 3.val_val

| Strategy | Return | CAGR | Sharpe | MaxDD | Top |
|----------|-------:|-----:|-------:|------:|----:|
| ev3_pvp0.5_pvp_ratio_t5 | 6839% | 36.1% | 1.55 | 22.3% | 5 |
| ev3_pvp0.5_ev_ebit_t5 | 6411% | 35.5% | 1.45 | 22.3% | 5 |
| ev8_pvp0.5_ev_ebit_t10 | 6012% | 34.9% | 1.30 | 34.5% | 10 |

### 4.val_qual

| Strategy | Return | CAGR | Sharpe | MaxDD | Top |
|----------|-------:|-----:|-------:|------:|----:|
| ev3_ml10_t10 | 3639% | 30.1% | 1.40 | 25.6% | 10 |
| ev3_roa12_rq_t10 | 3622% | 30.1% | 1.35 | 25.6% | 10 |
| ev3_roa8_rq_t10 | 3615% | 30.1% | 1.34 | 25.6% | 10 |

### 5.three_factor

| Strategy | Return | CAGR | Sharpe | MaxDD | Top |
|----------|-------:|-----:|-------:|------:|----:|
| mf_ev5_roe15_dle3_t10 | 3348% | 29.4% | 1.35 | 35.9% | 10 |
| mf_ev5_roe15_cf_t10 | 3209% | 29.0% | 1.39 | 29.6% | 10 |
| mf_ev5_ml15_dle3_t10 | 3019% | 28.4% | 1.36 | 35.9% | 10 |

### 6.kitchen_sink

| Strategy | Return | CAGR | Sharpe | MaxDD | Top |
|----------|-------:|-----:|-------:|------:|----:|
| ks_deep_pl3_ev3_roe10_ml5_margem_liquida_t8 | 5327% | 33.7% | 1.57 | 22.6% | 8 |
| ks_deep_pl3_ev3_roe10_ml5_pvp_ratio_t8 | 5157% | 33.4% | 1.45 | 22.6% | 8 |
| ks_deep_pl3_ev3_roe10_ml5_pl_ratio_t8 | 4710% | 32.5% | 1.47 | 22.6% | 8 |

### 7.liquidity_tiers

| Strategy | Return | CAGR | Sharpe | MaxDD | Top |
|----------|-------:|-----:|-------:|------:|----:|
| liq_bestPL3_liq10m_t20 | 6392% | 35.5% | 1.44 | 27.8% | 20 |
| liq_bestPL3_liq5m_t20 | 5748% | 34.4% | 1.37 | 27.8% | 20 |
| liq_bestPL3_liq2m_t20 | 4627% | 32.4% | 1.26 | 27.8% | 20 |

### 8.market_cap

| Strategy | Return | CAGR | Sharpe | MaxDD | Top |
|----------|-------:|-----:|-------:|------:|----:|
| cap_xlarge_pl5_t20 | 4403% | 31.9% | 1.31 | 27.8% | 20 |
| cap_small_ev10_t10 | 4199% | 31.4% | 1.15 | 32.4% | 10 |
| cap_small_ev5_t20 | 3670% | 30.2% | 1.26 | 33.2% | 20 |

### 9.top_sweep

| Strategy | Return | CAGR | Sharpe | MaxDD | Top |
|----------|-------:|-----:|-------:|------:|----:|
| sw_pl3_ev3_ml5_t10 | 3931% | 30.8% | 1.33 | 25.6% | 10 |
| sw_pl3_ev3_ml5_t8 | 3924% | 30.8% | 1.33 | 25.7% | 8 |
| sw_ev2_t12 | 3862% | 30.7% | 1.49 | 23.4% | 12 |
