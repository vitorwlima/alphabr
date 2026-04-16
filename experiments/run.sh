#!/bin/bash
# Systematic backtest experiments — all strategies require avg_daily_liquidity > 1e6
# Results are written to experiments/results.md with copy-paste ready commands

OUTFILE="experiments/results.md"
CSVFILE="experiments/results.csv"
LIQ="AND avg_daily_liquidity > 1e6"

cat > "$OUTFILE" << 'HEADER'
# Backtest Experiment Results

All strategies filtered with `avg_daily_liquidity > 1e6` (R$1M+/day).

HEADER

echo "strategy_id,total_return,cagr,max_drawdown,sharpe,win_rate,quarters,filter,rank,top" > "$CSVFILE"

run_backtest() {
  local id="$1"
  local filter="$2"
  local rank="$3"
  local top="$4"
  local category="$5"

  local full_filter="$filter $LIQ"

  result=$(bun src/backtest.ts --filter "$full_filter" --rank "$rank" --top "$top" 2>&1 | grep -A 10 "=== Results ===" )

  total_return=$(echo "$result" | grep "Total Return" | sed -E 's/.*Total Return:[[:space:]]+([0-9.-]+)%.*/\1/')
  cagr=$(echo "$result" | grep "CAGR" | sed -E 's/.*CAGR:[[:space:]]+([0-9.-]+)%.*/\1/')
  max_dd=$(echo "$result" | grep "Max Drawdown" | sed -E 's/.*Max Drawdown:[[:space:]]+([0-9.-]+)%.*/\1/')
  sharpe=$(echo "$result" | grep "Sharpe" | sed -E 's/.*Sharpe Ratio:[[:space:]]+([0-9.-]+).*/\1/')
  win_rate=$(echo "$result" | grep "Win Rate" | sed -E 's/.*\(([0-9]+)%\).*/\1/')
  quarters=$(echo "$result" | grep "Quarters" | sed -E 's/.*Quarters:[[:space:]]+([0-9]+).*/\1/')

  if [ -n "$total_return" ] && [ "$total_return" != "" ]; then
    echo "\"$id\",$total_return,$cagr,$max_dd,$sharpe,$win_rate,$quarters,\"$full_filter\",\"$rank\",$top" >> "$CSVFILE"

    # Write to markdown with copy-paste command
    cat >> "$OUTFILE" << EOF
### $id
- **Return:** ${total_return}% | **CAGR:** ${cagr}% | **Sharpe:** ${sharpe} | **MaxDD:** ${max_dd}% | **Win:** ${win_rate}% | **Top:** ${top}
\`\`\`
bun backtest --filter "$full_filter" --rank "$rank" --top $top
\`\`\`

EOF

    echo "[$id] Return: ${total_return}% | CAGR: ${cagr}% | Sharpe: ${sharpe}"
  else
    echo "[$id] FAILED or no results"
  fi
}

write_category() {
  echo "" >> "$OUTFILE"
  echo "---" >> "$OUTFILE"
  echo "## $1" >> "$OUTFILE"
  echo "" >> "$OUTFILE"
  echo "=== $1 ==="
}

# ============================================================
write_category "1. Pure Value (single metric)"
# ============================================================

# P/L
run_backtest "pl_3" "pl_ratio > 0 AND pl_ratio < 3" "pl_ratio ASC" 10
run_backtest "pl_3_t20" "pl_ratio > 0 AND pl_ratio < 3" "pl_ratio ASC" 20
run_backtest "pl_5" "pl_ratio > 0 AND pl_ratio < 5" "pl_ratio ASC" 10
run_backtest "pl_5_t20" "pl_ratio > 0 AND pl_ratio < 5" "pl_ratio ASC" 20
run_backtest "pl_8" "pl_ratio > 0 AND pl_ratio < 8" "pl_ratio ASC" 10
run_backtest "pl_8_t20" "pl_ratio > 0 AND pl_ratio < 8" "pl_ratio ASC" 20
run_backtest "pl_10" "pl_ratio > 0 AND pl_ratio < 10" "pl_ratio ASC" 10
run_backtest "pl_10_t20" "pl_ratio > 0 AND pl_ratio < 10" "pl_ratio ASC" 20
run_backtest "pl_15" "pl_ratio > 0 AND pl_ratio < 15" "pl_ratio ASC" 10
run_backtest "pl_15_t20" "pl_ratio > 0 AND pl_ratio < 15" "pl_ratio ASC" 20

# EV/EBIT
run_backtest "ev_3" "ev_ebit > 0 AND ev_ebit < 3" "ev_ebit ASC" 10
run_backtest "ev_3_t20" "ev_ebit > 0 AND ev_ebit < 3" "ev_ebit ASC" 20
run_backtest "ev_5" "ev_ebit > 0 AND ev_ebit < 5" "ev_ebit ASC" 10
run_backtest "ev_5_t20" "ev_ebit > 0 AND ev_ebit < 5" "ev_ebit ASC" 20
run_backtest "ev_8" "ev_ebit > 0 AND ev_ebit < 8" "ev_ebit ASC" 10
run_backtest "ev_8_t20" "ev_ebit > 0 AND ev_ebit < 8" "ev_ebit ASC" 20
run_backtest "ev_10" "ev_ebit > 0 AND ev_ebit < 10" "ev_ebit ASC" 10
run_backtest "ev_10_t20" "ev_ebit > 0 AND ev_ebit < 10" "ev_ebit ASC" 20
run_backtest "ev_15" "ev_ebit > 0 AND ev_ebit < 15" "ev_ebit ASC" 10
run_backtest "ev_15_t20" "ev_ebit > 0 AND ev_ebit < 15" "ev_ebit ASC" 20

# P/VP
run_backtest "pvp_05" "pvp_ratio > 0 AND pvp_ratio < 0.5" "pvp_ratio ASC" 10
run_backtest "pvp_05_t20" "pvp_ratio > 0 AND pvp_ratio < 0.5" "pvp_ratio ASC" 20
run_backtest "pvp_1" "pvp_ratio > 0 AND pvp_ratio < 1" "pvp_ratio ASC" 10
run_backtest "pvp_1_t20" "pvp_ratio > 0 AND pvp_ratio < 1" "pvp_ratio ASC" 20
run_backtest "pvp_15" "pvp_ratio > 0 AND pvp_ratio < 1.5" "pvp_ratio ASC" 10
run_backtest "pvp_15_t20" "pvp_ratio > 0 AND pvp_ratio < 1.5" "pvp_ratio ASC" 20
run_backtest "pvp_2" "pvp_ratio > 0 AND pvp_ratio < 2" "pvp_ratio ASC" 10
run_backtest "pvp_2_t20" "pvp_ratio > 0 AND pvp_ratio < 2" "pvp_ratio ASC" 20

# Price/Sales
run_backtest "ps_05" "price_to_sales > 0 AND price_to_sales < 0.5" "price_to_sales ASC" 10
run_backtest "ps_05_t20" "price_to_sales > 0 AND price_to_sales < 0.5" "price_to_sales ASC" 20
run_backtest "ps_1" "price_to_sales > 0 AND price_to_sales < 1" "price_to_sales ASC" 10
run_backtest "ps_1_t20" "price_to_sales > 0 AND price_to_sales < 1" "price_to_sales ASC" 20
run_backtest "ps_2" "price_to_sales > 0 AND price_to_sales < 2" "price_to_sales ASC" 10
run_backtest "ps_2_t20" "price_to_sales > 0 AND price_to_sales < 2" "price_to_sales ASC" 20

# ============================================================
write_category "2. Combined Value (two value metrics)"
# ============================================================

run_backtest "pl5_ev5" "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5" "ev_ebit ASC" 10
run_backtest "pl5_ev5_t20" "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5" "ev_ebit ASC" 20
run_backtest "pl5_ev5_rankpl" "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5" "pl_ratio ASC" 10
run_backtest "pl5_ev5_rankpl_t20" "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5" "pl_ratio ASC" 20
run_backtest "pl8_ev8" "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8" "ev_ebit ASC" 10
run_backtest "pl8_ev8_t20" "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8" "ev_ebit ASC" 20
run_backtest "pl10_ev10" "pl_ratio > 0 AND pl_ratio < 10 AND ev_ebit > 0 AND ev_ebit < 10" "ev_ebit ASC" 10
run_backtest "pl10_ev10_t20" "pl_ratio > 0 AND pl_ratio < 10 AND ev_ebit > 0 AND ev_ebit < 10" "ev_ebit ASC" 20
run_backtest "pl3_ev3" "pl_ratio > 0 AND pl_ratio < 3 AND ev_ebit > 0 AND ev_ebit < 3" "ev_ebit ASC" 10
run_backtest "pl3_ev3_t20" "pl_ratio > 0 AND pl_ratio < 3 AND ev_ebit > 0 AND ev_ebit < 3" "ev_ebit ASC" 20
run_backtest "pl5_pvp1" "pl_ratio > 0 AND pl_ratio < 5 AND pvp_ratio > 0 AND pvp_ratio < 1" "pl_ratio ASC" 10
run_backtest "pl5_pvp1_t20" "pl_ratio > 0 AND pl_ratio < 5 AND pvp_ratio > 0 AND pvp_ratio < 1" "pl_ratio ASC" 20
run_backtest "pl8_pvp15" "pl_ratio > 0 AND pl_ratio < 8 AND pvp_ratio > 0 AND pvp_ratio < 1.5" "pl_ratio ASC" 10
run_backtest "pl8_pvp15_t20" "pl_ratio > 0 AND pl_ratio < 8 AND pvp_ratio > 0 AND pvp_ratio < 1.5" "pl_ratio ASC" 20
run_backtest "ev5_pvp1" "ev_ebit > 0 AND ev_ebit < 5 AND pvp_ratio > 0 AND pvp_ratio < 1" "ev_ebit ASC" 10
run_backtest "ev5_pvp1_t20" "ev_ebit > 0 AND ev_ebit < 5 AND pvp_ratio > 0 AND pvp_ratio < 1" "ev_ebit ASC" 20
run_backtest "ev8_pvp15" "ev_ebit > 0 AND ev_ebit < 8 AND pvp_ratio > 0 AND pvp_ratio < 1.5" "ev_ebit ASC" 10
run_backtest "ev8_pvp15_t20" "ev_ebit > 0 AND ev_ebit < 8 AND pvp_ratio > 0 AND pvp_ratio < 1.5" "ev_ebit ASC" 20
run_backtest "pl5_ps1" "pl_ratio > 0 AND pl_ratio < 5 AND price_to_sales > 0 AND price_to_sales < 1" "pl_ratio ASC" 10
run_backtest "pl5_ps1_t20" "pl_ratio > 0 AND pl_ratio < 5 AND price_to_sales > 0 AND price_to_sales < 1" "pl_ratio ASC" 20
run_backtest "ev5_ps1" "ev_ebit > 0 AND ev_ebit < 5 AND price_to_sales > 0 AND price_to_sales < 1" "ev_ebit ASC" 10
run_backtest "ev5_ps1_t20" "ev_ebit > 0 AND ev_ebit < 5 AND price_to_sales > 0 AND price_to_sales < 1" "ev_ebit ASC" 20

# ============================================================
write_category "3. Value + Quality (margins)"
# ============================================================

# Net margin
run_backtest "pl5_ev5_ml5" "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND margem_liquida > 0.05" "ev_ebit ASC" 10
run_backtest "pl5_ev5_ml5_t20" "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND margem_liquida > 0.05" "ev_ebit ASC" 20
run_backtest "pl5_ev5_ml10" "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND margem_liquida > 0.1" "ev_ebit ASC" 10
run_backtest "pl5_ev5_ml10_t20" "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND margem_liquida > 0.1" "ev_ebit ASC" 20
run_backtest "pl5_ev5_ml10_rankpl" "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND margem_liquida > 0.1" "pl_ratio ASC" 10
run_backtest "pl5_ev5_ml10_rankpl_t20" "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND margem_liquida > 0.1" "pl_ratio ASC" 20
run_backtest "pl5_ev5_ml15" "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND margem_liquida > 0.15" "ev_ebit ASC" 10
run_backtest "pl5_ev5_ml15_t20" "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND margem_liquida > 0.15" "ev_ebit ASC" 20
run_backtest "pl5_ev5_ml20" "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND margem_liquida > 0.2" "ev_ebit ASC" 10
run_backtest "pl5_ev5_ml20_t20" "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND margem_liquida > 0.2" "ev_ebit ASC" 20
run_backtest "pl5_ev8_ml10_rankpl" "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 8 AND margem_liquida > 0.1" "pl_ratio ASC" 10
run_backtest "pl5_ev8_ml10_rankpl_t20" "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 8 AND margem_liquida > 0.1" "pl_ratio ASC" 20
run_backtest "pl8_ev8_ml10" "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND margem_liquida > 0.1" "ev_ebit ASC" 10
run_backtest "pl8_ev8_ml10_t20" "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND margem_liquida > 0.1" "ev_ebit ASC" 20
run_backtest "pl10_ev10_ml10" "pl_ratio > 0 AND pl_ratio < 10 AND ev_ebit > 0 AND ev_ebit < 10 AND margem_liquida > 0.1" "ev_ebit ASC" 10
run_backtest "pl10_ev10_ml10_t20" "pl_ratio > 0 AND pl_ratio < 10 AND ev_ebit > 0 AND ev_ebit < 10 AND margem_liquida > 0.1" "ev_ebit ASC" 20

# Gross margin
run_backtest "pl8_ev8_mb30" "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND margem_bruta > 0.3" "ev_ebit ASC" 10
run_backtest "pl8_ev8_mb30_t20" "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND margem_bruta > 0.3" "ev_ebit ASC" 20
run_backtest "pl8_ev8_mb40" "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND margem_bruta > 0.4" "ev_ebit ASC" 10
run_backtest "pl8_ev8_mb40_t20" "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND margem_bruta > 0.4" "ev_ebit ASC" 20
run_backtest "ev8_mb30" "ev_ebit > 0 AND ev_ebit < 8 AND margem_bruta > 0.3" "ev_ebit ASC" 10
run_backtest "ev8_mb30_t20" "ev_ebit > 0 AND ev_ebit < 8 AND margem_bruta > 0.3" "ev_ebit ASC" 20

# EBIT margin
run_backtest "pl8_ev8_me15" "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND margem_ebit > 0.15" "ev_ebit ASC" 10
run_backtest "pl8_ev8_me15_t20" "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND margem_ebit > 0.15" "ev_ebit ASC" 20
run_backtest "pl10_ev10_me20" "pl_ratio > 0 AND pl_ratio < 10 AND ev_ebit > 0 AND ev_ebit < 10 AND margem_ebit > 0.2" "ev_ebit ASC" 10
run_backtest "pl10_ev10_me20_t20" "pl_ratio > 0 AND pl_ratio < 10 AND ev_ebit > 0 AND ev_ebit < 10 AND margem_ebit > 0.2" "ev_ebit ASC" 20
run_backtest "ev5_me15" "ev_ebit > 0 AND ev_ebit < 5 AND margem_ebit > 0.15" "ev_ebit ASC" 10
run_backtest "ev5_me15_t20" "ev_ebit > 0 AND ev_ebit < 5 AND margem_ebit > 0.15" "ev_ebit ASC" 20
run_backtest "ev8_me20" "ev_ebit > 0 AND ev_ebit < 8 AND margem_ebit > 0.2" "ev_ebit ASC" 10
run_backtest "ev8_me20_t20" "ev_ebit > 0 AND ev_ebit < 8 AND margem_ebit > 0.2" "ev_ebit ASC" 20

# Price/Sales + margins
run_backtest "ps1_ml10" "price_to_sales > 0 AND price_to_sales < 1 AND margem_liquida > 0.1" "price_to_sales ASC" 10
run_backtest "ps1_ml10_t20" "price_to_sales > 0 AND price_to_sales < 1 AND margem_liquida > 0.1" "price_to_sales ASC" 20
run_backtest "ps1_ml15" "price_to_sales > 0 AND price_to_sales < 1 AND margem_liquida > 0.15" "price_to_sales ASC" 10
run_backtest "ps1_ml15_t20" "price_to_sales > 0 AND price_to_sales < 1 AND margem_liquida > 0.15" "price_to_sales ASC" 20
run_backtest "ps05_ml10" "price_to_sales > 0 AND price_to_sales < 0.5 AND margem_liquida > 0.1" "price_to_sales ASC" 10
run_backtest "ps05_ml10_t20" "price_to_sales > 0 AND price_to_sales < 0.5 AND margem_liquida > 0.1" "price_to_sales ASC" 20
run_backtest "ps2_ml10" "price_to_sales > 0 AND price_to_sales < 2 AND margem_liquida > 0.1" "price_to_sales ASC" 10
run_backtest "ps2_ml10_t20" "price_to_sales > 0 AND price_to_sales < 2 AND margem_liquida > 0.1" "price_to_sales ASC" 20
run_backtest "ps1_mb30" "price_to_sales > 0 AND price_to_sales < 1 AND margem_bruta > 0.3" "price_to_sales ASC" 10
run_backtest "ps1_mb30_t20" "price_to_sales > 0 AND price_to_sales < 1 AND margem_bruta > 0.3" "price_to_sales ASC" 20
run_backtest "ps1_me15" "price_to_sales > 0 AND price_to_sales < 1 AND margem_ebit > 0.15" "price_to_sales ASC" 10
run_backtest "ps1_me15_t20" "price_to_sales > 0 AND price_to_sales < 1 AND margem_ebit > 0.15" "price_to_sales ASC" 20

# ============================================================
write_category "4. Value + ROE/ROA (Greenblatt style)"
# ============================================================

run_backtest "ev10_roe10" "ev_ebit > 0 AND ev_ebit < 10 AND roe > 0.1" "ev_ebit ASC" 10
run_backtest "ev10_roe10_t20" "ev_ebit > 0 AND ev_ebit < 10 AND roe > 0.1" "ev_ebit ASC" 20
run_backtest "ev15_roe10" "ev_ebit > 0 AND ev_ebit < 15 AND roe > 0.1" "ev_ebit ASC" 10
run_backtest "ev15_roe10_t20" "ev_ebit > 0 AND ev_ebit < 15 AND roe > 0.1" "ev_ebit ASC" 20
run_backtest "ev8_roe15" "ev_ebit > 0 AND ev_ebit < 8 AND roe > 0.15" "ev_ebit ASC" 10
run_backtest "ev8_roe15_t20" "ev_ebit > 0 AND ev_ebit < 8 AND roe > 0.15" "ev_ebit ASC" 20
run_backtest "ev5_roe20" "ev_ebit > 0 AND ev_ebit < 5 AND roe > 0.2" "ev_ebit ASC" 10
run_backtest "ev5_roe20_t20" "ev_ebit > 0 AND ev_ebit < 5 AND roe > 0.2" "ev_ebit ASC" 20
run_backtest "ev10_roe15_rankroe" "ev_ebit > 0 AND ev_ebit < 10 AND roe > 0.15" "roe DESC" 10
run_backtest "ev10_roe15_rankroe_t20" "ev_ebit > 0 AND ev_ebit < 10 AND roe > 0.15" "roe DESC" 20
run_backtest "pl10_roe10" "pl_ratio > 0 AND pl_ratio < 10 AND roe > 0.1" "pl_ratio ASC" 10
run_backtest "pl10_roe10_t20" "pl_ratio > 0 AND pl_ratio < 10 AND roe > 0.1" "pl_ratio ASC" 20
run_backtest "pl10_roe15" "pl_ratio > 0 AND pl_ratio < 10 AND roe > 0.15" "pl_ratio ASC" 10
run_backtest "pl10_roe15_t20" "pl_ratio > 0 AND pl_ratio < 10 AND roe > 0.15" "pl_ratio ASC" 20
run_backtest "pl5_roe15" "pl_ratio > 0 AND pl_ratio < 5 AND roe > 0.15" "pl_ratio ASC" 10
run_backtest "pl5_roe15_t20" "pl_ratio > 0 AND pl_ratio < 5 AND roe > 0.15" "pl_ratio ASC" 20
run_backtest "pl15_roe20" "pl_ratio > 0 AND pl_ratio < 15 AND roe > 0.2" "pl_ratio ASC" 10
run_backtest "pl15_roe20_t20" "pl_ratio > 0 AND pl_ratio < 15 AND roe > 0.2" "pl_ratio ASC" 20
run_backtest "pl15_roe25" "pl_ratio > 0 AND pl_ratio < 15 AND roe > 0.25" "pl_ratio ASC" 10
run_backtest "pl15_roe25_t20" "pl_ratio > 0 AND pl_ratio < 15 AND roe > 0.25" "pl_ratio ASC" 20

# ROA
run_backtest "ev10_roa10" "ev_ebit > 0 AND ev_ebit < 10 AND roa > 0.1" "ev_ebit ASC" 10
run_backtest "ev10_roa10_t20" "ev_ebit > 0 AND ev_ebit < 10 AND roa > 0.1" "ev_ebit ASC" 20
run_backtest "pl10_roa10" "pl_ratio > 0 AND pl_ratio < 10 AND roa > 0.1" "pl_ratio ASC" 10
run_backtest "pl10_roa10_t20" "pl_ratio > 0 AND pl_ratio < 10 AND roa > 0.1" "pl_ratio ASC" 20
run_backtest "ev8_roa15" "ev_ebit > 0 AND ev_ebit < 8 AND roa > 0.15" "ev_ebit ASC" 10
run_backtest "ev8_roa15_t20" "ev_ebit > 0 AND ev_ebit < 8 AND roa > 0.15" "ev_ebit ASC" 20

# P/VP + ROE
run_backtest "pvp15_roe10" "pvp_ratio > 0 AND pvp_ratio < 1.5 AND roe > 0.1" "pvp_ratio ASC" 10
run_backtest "pvp15_roe10_t20" "pvp_ratio > 0 AND pvp_ratio < 1.5 AND roe > 0.1" "pvp_ratio ASC" 20
run_backtest "pvp1_roe15" "pvp_ratio > 0 AND pvp_ratio < 1 AND roe > 0.15" "pvp_ratio ASC" 10
run_backtest "pvp1_roe15_t20" "pvp_ratio > 0 AND pvp_ratio < 1 AND roe > 0.15" "pvp_ratio ASC" 20
run_backtest "pvp2_roe20" "pvp_ratio > 0 AND pvp_ratio < 2 AND roe > 0.2" "pvp_ratio ASC" 10
run_backtest "pvp2_roe20_t20" "pvp_ratio > 0 AND pvp_ratio < 2 AND roe > 0.2" "pvp_ratio ASC" 20

# ============================================================
write_category "5. Value + Balance Sheet (debt, liquidity ratio)"
# ============================================================

run_backtest "pl10_lowdebt2" "pl_ratio > 0 AND pl_ratio < 10 AND divida_liquida_ebit > 0 AND divida_liquida_ebit < 2" "pl_ratio ASC" 10
run_backtest "pl10_lowdebt2_t20" "pl_ratio > 0 AND pl_ratio < 10 AND divida_liquida_ebit > 0 AND divida_liquida_ebit < 2" "pl_ratio ASC" 20
run_backtest "ev8_lowdebt2" "ev_ebit > 0 AND ev_ebit < 8 AND divida_liquida_ebit > 0 AND divida_liquida_ebit < 2" "ev_ebit ASC" 10
run_backtest "ev8_lowdebt2_t20" "ev_ebit > 0 AND ev_ebit < 8 AND divida_liquida_ebit > 0 AND divida_liquida_ebit < 2" "ev_ebit ASC" 20
run_backtest "ev8_lowdebt1" "ev_ebit > 0 AND ev_ebit < 8 AND divida_liquida_ebit > 0 AND divida_liquida_ebit < 1" "ev_ebit ASC" 10
run_backtest "ev8_lowdebt1_t20" "ev_ebit > 0 AND ev_ebit < 8 AND divida_liquida_ebit > 0 AND divida_liquida_ebit < 1" "ev_ebit ASC" 20
run_backtest "pl10_nodebt" "pl_ratio > 0 AND pl_ratio < 10 AND divida_liquida_ebit < 0" "pl_ratio ASC" 10
run_backtest "pl10_nodebt_t20" "pl_ratio > 0 AND pl_ratio < 10 AND divida_liquida_ebit < 0" "pl_ratio ASC" 20
run_backtest "ev10_nodebt" "ev_ebit > 0 AND ev_ebit < 10 AND divida_liquida_ebit < 0" "ev_ebit ASC" 10
run_backtest "ev10_nodebt_t20" "ev_ebit > 0 AND ev_ebit < 10 AND divida_liquida_ebit < 0" "ev_ebit ASC" 20
run_backtest "pl8_nodebt_roe10" "pl_ratio > 0 AND pl_ratio < 8 AND divida_liquida_ebit < 0 AND roe > 0.1" "pl_ratio ASC" 10
run_backtest "pl8_nodebt_roe10_t20" "pl_ratio > 0 AND pl_ratio < 8 AND divida_liquida_ebit < 0 AND roe > 0.1" "pl_ratio ASC" 20

# Current ratio
run_backtest "pl10_liq15" "pl_ratio > 0 AND pl_ratio < 10 AND liquidez_corrente > 1.5" "pl_ratio ASC" 10
run_backtest "pl10_liq15_t20" "pl_ratio > 0 AND pl_ratio < 10 AND liquidez_corrente > 1.5" "pl_ratio ASC" 20
run_backtest "pl10_liq2" "pl_ratio > 0 AND pl_ratio < 10 AND liquidez_corrente > 2" "pl_ratio ASC" 10
run_backtest "pl10_liq2_t20" "pl_ratio > 0 AND pl_ratio < 10 AND liquidez_corrente > 2" "pl_ratio ASC" 20
run_backtest "ev8_liq15" "ev_ebit > 0 AND ev_ebit < 8 AND liquidez_corrente > 1.5" "ev_ebit ASC" 10
run_backtest "ev8_liq15_t20" "ev_ebit > 0 AND ev_ebit < 8 AND liquidez_corrente > 1.5" "ev_ebit ASC" 20
run_backtest "ev8_liq2" "ev_ebit > 0 AND ev_ebit < 8 AND liquidez_corrente > 2" "ev_ebit ASC" 10
run_backtest "ev8_liq2_t20" "ev_ebit > 0 AND ev_ebit < 8 AND liquidez_corrente > 2" "ev_ebit ASC" 20

# Cash flow positive
run_backtest "pl8_ev8_cf" "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND fluxo_caixa_op_ttm > 0" "ev_ebit ASC" 10
run_backtest "pl8_ev8_cf_t20" "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND fluxo_caixa_op_ttm > 0" "ev_ebit ASC" 20
run_backtest "ev10_cf" "ev_ebit > 0 AND ev_ebit < 10 AND fluxo_caixa_op_ttm > 0" "ev_ebit ASC" 10
run_backtest "ev10_cf_t20" "ev_ebit > 0 AND ev_ebit < 10 AND fluxo_caixa_op_ttm > 0" "ev_ebit ASC" 20

# ============================================================
write_category "6. Multi-factor (3+ filters)"
# ============================================================

run_backtest "mf_val_qual1" "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND roe > 0.15 AND margem_liquida > 0.1" "ev_ebit ASC" 10
run_backtest "mf_val_qual1_t20" "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND roe > 0.15 AND margem_liquida > 0.1" "ev_ebit ASC" 20
run_backtest "mf_val_qual2" "pl_ratio > 0 AND pl_ratio < 10 AND ev_ebit > 0 AND ev_ebit < 10 AND roe > 0.1 AND margem_liquida > 0.05" "ev_ebit ASC" 10
run_backtest "mf_val_qual2_t20" "pl_ratio > 0 AND pl_ratio < 10 AND ev_ebit > 0 AND ev_ebit < 10 AND roe > 0.1 AND margem_liquida > 0.05" "ev_ebit ASC" 20
run_backtest "mf_val_qual_liq" "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND roe > 0.1 AND margem_liquida > 0.1 AND liquidez_corrente > 1" "ev_ebit ASC" 10
run_backtest "mf_val_qual_liq_t20" "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND roe > 0.1 AND margem_liquida > 0.1 AND liquidez_corrente > 1" "ev_ebit ASC" 20
run_backtest "mf_val_qual_liq_pl" "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND roe > 0.1 AND margem_liquida > 0.1 AND liquidez_corrente > 1" "pl_ratio ASC" 10
run_backtest "mf_val_qual_liq_pl_t20" "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND roe > 0.1 AND margem_liquida > 0.1 AND liquidez_corrente > 1" "pl_ratio ASC" 20
run_backtest "mf_kitchen_sink" "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND roe > 0.1 AND margem_liquida > 0.05 AND liquidez_corrente > 1 AND divida_liquida_ebit < 3" "ev_ebit ASC" 10
run_backtest "mf_kitchen_sink_t20" "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND roe > 0.1 AND margem_liquida > 0.05 AND liquidez_corrente > 1 AND divida_liquida_ebit < 3" "ev_ebit ASC" 20
run_backtest "mf_val_qual_pvp" "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND roe > 0.1 AND margem_liquida > 0.1 AND pvp_ratio > 0 AND pvp_ratio < 2" "pl_ratio ASC" 10
run_backtest "mf_val_qual_pvp_t20" "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND roe > 0.1 AND margem_liquida > 0.1 AND pvp_ratio > 0 AND pvp_ratio < 2" "pl_ratio ASC" 20
run_backtest "mf_mb_ml_roe" "pl_ratio > 0 AND pl_ratio < 10 AND ev_ebit > 0 AND ev_ebit < 10 AND margem_bruta > 0.3 AND margem_liquida > 0.1 AND roe > 0.1" "ev_ebit ASC" 10
run_backtest "mf_mb_ml_roe_t20" "pl_ratio > 0 AND pl_ratio < 10 AND ev_ebit > 0 AND ev_ebit < 10 AND margem_bruta > 0.3 AND margem_liquida > 0.1 AND roe > 0.1" "ev_ebit ASC" 20
run_backtest "mf_val_roe_debt" "pl_ratio > 0 AND pl_ratio < 8 AND roe > 0.2 AND margem_liquida > 0.15 AND divida_liquida_ebit < 3" "pl_ratio ASC" 10
run_backtest "mf_val_roe_debt_t20" "pl_ratio > 0 AND pl_ratio < 8 AND roe > 0.2 AND margem_liquida > 0.15 AND divida_liquida_ebit < 3" "pl_ratio ASC" 20
run_backtest "mf_ev_roe_mb_liq" "ev_ebit > 0 AND ev_ebit < 8 AND roe > 0.15 AND margem_bruta > 0.3 AND liquidez_corrente > 1" "ev_ebit ASC" 10
run_backtest "mf_ev_roe_mb_liq_t20" "ev_ebit > 0 AND ev_ebit < 8 AND roe > 0.15 AND margem_bruta > 0.3 AND liquidez_corrente > 1" "ev_ebit ASC" 20
run_backtest "mf_val_roe20_ml10" "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND roe > 0.2 AND margem_liquida > 0.1" "ev_ebit ASC" 10
run_backtest "mf_val_roe20_ml10_t20" "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND roe > 0.2 AND margem_liquida > 0.1" "ev_ebit ASC" 20

# ============================================================
write_category "7. Alternative rankings"
# ============================================================

run_backtest "pl10_ev10_rank_roe" "pl_ratio > 0 AND pl_ratio < 10 AND ev_ebit > 0 AND ev_ebit < 10 AND roe > 0" "roe DESC" 10
run_backtest "pl10_ev10_rank_roe_t20" "pl_ratio > 0 AND pl_ratio < 10 AND ev_ebit > 0 AND ev_ebit < 10 AND roe > 0" "roe DESC" 20
run_backtest "pl10_ev10_rank_ml" "pl_ratio > 0 AND pl_ratio < 10 AND ev_ebit > 0 AND ev_ebit < 10 AND margem_liquida > 0" "margem_liquida DESC" 10
run_backtest "pl10_ev10_rank_ml_t20" "pl_ratio > 0 AND pl_ratio < 10 AND ev_ebit > 0 AND ev_ebit < 10 AND margem_liquida > 0" "margem_liquida DESC" 20
run_backtest "pl10_ev10_rank_pvp" "pl_ratio > 0 AND pl_ratio < 10 AND pvp_ratio > 0" "pvp_ratio ASC" 10
run_backtest "pl10_ev10_rank_pvp_t20" "pl_ratio > 0 AND pl_ratio < 10 AND pvp_ratio > 0" "pvp_ratio ASC" 20
run_backtest "pl10_ev10_rank_ps" "pl_ratio > 0 AND pl_ratio < 10 AND price_to_sales > 0" "price_to_sales ASC" 10
run_backtest "pl10_ev10_rank_ps_t20" "pl_ratio > 0 AND pl_ratio < 10 AND price_to_sales > 0" "price_to_sales ASC" 20
run_backtest "pl10_ev10_rank_roa" "ev_ebit > 0 AND ev_ebit < 10 AND roa > 0" "roa DESC" 10
run_backtest "pl10_ev10_rank_roa_t20" "ev_ebit > 0 AND ev_ebit < 10 AND roa > 0" "roa DESC" 20
run_backtest "ev8_me_rank_me" "ev_ebit > 0 AND ev_ebit < 8 AND margem_ebit > 0.1" "margem_ebit DESC" 10
run_backtest "ev8_me_rank_me_t20" "ev_ebit > 0 AND ev_ebit < 8 AND margem_ebit > 0.1" "margem_ebit DESC" 20
run_backtest "ev8_mb_rank_mb" "ev_ebit > 0 AND ev_ebit < 8 AND margem_bruta > 0.2" "margem_bruta DESC" 10
run_backtest "ev8_mb_rank_mb_t20" "ev_ebit > 0 AND ev_ebit < 8 AND margem_bruta > 0.2" "margem_bruta DESC" 20

# Rank by ev on PL filter and vice versa
run_backtest "pl5_rank_ev" "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0" "ev_ebit ASC" 10
run_backtest "pl5_rank_ev_t20" "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0" "ev_ebit ASC" 20
run_backtest "ev5_rank_pl" "ev_ebit > 0 AND ev_ebit < 5 AND pl_ratio > 0" "pl_ratio ASC" 10
run_backtest "ev5_rank_pl_t20" "ev_ebit > 0 AND ev_ebit < 5 AND pl_ratio > 0" "pl_ratio ASC" 20
run_backtest "pl5_rank_roe" "pl_ratio > 0 AND pl_ratio < 5 AND roe > 0" "roe DESC" 10
run_backtest "pl5_rank_roe_t20" "pl_ratio > 0 AND pl_ratio < 5 AND roe > 0" "roe DESC" 20
run_backtest "pl5_rank_ml" "pl_ratio > 0 AND pl_ratio < 5 AND margem_liquida > 0" "margem_liquida DESC" 10
run_backtest "pl5_rank_ml_t20" "pl_ratio > 0 AND pl_ratio < 5 AND margem_liquida > 0" "margem_liquida DESC" 20
run_backtest "pl5_rank_pvp" "pl_ratio > 0 AND pl_ratio < 5 AND pvp_ratio > 0" "pvp_ratio ASC" 10
run_backtest "pl5_rank_pvp_t20" "pl_ratio > 0 AND pl_ratio < 5 AND pvp_ratio > 0" "pvp_ratio ASC" 20

# ============================================================
write_category "8. Size-constrained strategies"
# ============================================================

# Mid cap only (likely more liquid and still better than large)
run_backtest "mid_pl8_ev8" "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND market_cap > 1e9 AND market_cap < 1e10" "ev_ebit ASC" 10
run_backtest "mid_pl8_ev8_t20" "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND market_cap > 1e9 AND market_cap < 1e10" "ev_ebit ASC" 20
run_backtest "mid_ev10_roe10" "ev_ebit > 0 AND ev_ebit < 10 AND roe > 0.1 AND market_cap > 1e9 AND market_cap < 1e10" "ev_ebit ASC" 10
run_backtest "mid_ev10_roe10_t20" "ev_ebit > 0 AND ev_ebit < 10 AND roe > 0.1 AND market_cap > 1e9 AND market_cap < 1e10" "ev_ebit ASC" 20

# Small + mid (exclude large)
run_backtest "notlarge_ev8" "ev_ebit > 0 AND ev_ebit < 8 AND market_cap < 1e10" "ev_ebit ASC" 10
run_backtest "notlarge_ev8_t20" "ev_ebit > 0 AND ev_ebit < 8 AND market_cap < 1e10" "ev_ebit ASC" 20
run_backtest "notlarge_pl8_ev8" "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND market_cap < 1e10" "ev_ebit ASC" 10
run_backtest "notlarge_pl8_ev8_t20" "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8 AND market_cap < 1e10" "ev_ebit ASC" 20

# Large cap only
run_backtest "large_ev10" "ev_ebit > 0 AND ev_ebit < 10 AND market_cap > 1e10" "ev_ebit ASC" 10
run_backtest "large_ev10_t20" "ev_ebit > 0 AND ev_ebit < 10 AND market_cap > 1e10" "ev_ebit ASC" 20
run_backtest "large_pl10_roe10" "pl_ratio > 0 AND pl_ratio < 10 AND roe > 0.1 AND market_cap > 1e10" "pl_ratio ASC" 10
run_backtest "large_pl10_roe10_t20" "pl_ratio > 0 AND pl_ratio < 10 AND roe > 0.1 AND market_cap > 1e10" "pl_ratio ASC" 20

# ============================================================
write_category "9. Yield / income oriented"
# ============================================================

# High earnings yield (low P/L) + high margins = dividend-like
run_backtest "yield_pl5_ml15" "pl_ratio > 0 AND pl_ratio < 5 AND margem_liquida > 0.15" "pl_ratio ASC" 10
run_backtest "yield_pl5_ml15_t20" "pl_ratio > 0 AND pl_ratio < 5 AND margem_liquida > 0.15" "pl_ratio ASC" 20
run_backtest "yield_pl5_ml20" "pl_ratio > 0 AND pl_ratio < 5 AND margem_liquida > 0.2" "pl_ratio ASC" 10
run_backtest "yield_pl5_ml20_t20" "pl_ratio > 0 AND pl_ratio < 5 AND margem_liquida > 0.2" "pl_ratio ASC" 20
run_backtest "yield_pl5_roe20_ml10" "pl_ratio > 0 AND pl_ratio < 5 AND roe > 0.2 AND margem_liquida > 0.1" "pl_ratio ASC" 10
run_backtest "yield_pl5_roe20_ml10_t20" "pl_ratio > 0 AND pl_ratio < 5 AND roe > 0.2 AND margem_liquida > 0.1" "pl_ratio ASC" 20
run_backtest "yield_pl8_roe15_ml10_debt2" "pl_ratio > 0 AND pl_ratio < 8 AND roe > 0.15 AND margem_liquida > 0.1 AND divida_liquida_ebit > 0 AND divida_liquida_ebit < 2" "pl_ratio ASC" 10
run_backtest "yield_pl8_roe15_ml10_debt2_t20" "pl_ratio > 0 AND pl_ratio < 8 AND roe > 0.15 AND margem_liquida > 0.1 AND divida_liquida_ebit > 0 AND divida_liquida_ebit < 2" "pl_ratio ASC" 20

# ============================================================
write_category "10. Wide value + high quality (GARP)"
# ============================================================

run_backtest "garp_pl15_roe25_ml15" "pl_ratio > 0 AND pl_ratio < 15 AND roe > 0.25 AND margem_liquida > 0.15" "pl_ratio ASC" 10
run_backtest "garp_pl15_roe25_ml15_t20" "pl_ratio > 0 AND pl_ratio < 15 AND roe > 0.25 AND margem_liquida > 0.15" "pl_ratio ASC" 20
run_backtest "garp_ev15_roe20_me20" "ev_ebit > 0 AND ev_ebit < 15 AND roe > 0.2 AND margem_ebit > 0.2" "ev_ebit ASC" 10
run_backtest "garp_ev15_roe20_me20_t20" "ev_ebit > 0 AND ev_ebit < 15 AND roe > 0.2 AND margem_ebit > 0.2" "ev_ebit ASC" 20
run_backtest "garp_pl12_roe20_mb40_liq15" "pl_ratio > 0 AND pl_ratio < 12 AND roe > 0.2 AND margem_bruta > 0.4 AND liquidez_corrente > 1.5" "pl_ratio ASC" 10
run_backtest "garp_pl12_roe20_mb40_liq15_t20" "pl_ratio > 0 AND pl_ratio < 12 AND roe > 0.2 AND margem_bruta > 0.4 AND liquidez_corrente > 1.5" "pl_ratio ASC" 20
run_backtest "garp_ev10_roe15_ml10_liq1" "ev_ebit > 0 AND ev_ebit < 10 AND roe > 0.15 AND margem_liquida > 0.1 AND liquidez_corrente > 1" "ev_ebit ASC" 10
run_backtest "garp_ev10_roe15_ml10_liq1_t20" "ev_ebit > 0 AND ev_ebit < 10 AND roe > 0.15 AND margem_liquida > 0.1 AND liquidez_corrente > 1" "ev_ebit ASC" 20
run_backtest "garp_pl10_roe15_ml10_cf" "pl_ratio > 0 AND pl_ratio < 10 AND roe > 0.15 AND margem_liquida > 0.1 AND fluxo_caixa_op_ttm > 0" "pl_ratio ASC" 10
run_backtest "garp_pl10_roe15_ml10_cf_t20" "pl_ratio > 0 AND pl_ratio < 10 AND roe > 0.15 AND margem_liquida > 0.1 AND fluxo_caixa_op_ttm > 0" "pl_ratio ASC" 20

# ============================================================
write_category "11. Top N sweep (best filters from above)"
# ============================================================

run_backtest "best_ps_ml_t5" "price_to_sales > 0 AND price_to_sales < 1 AND margem_liquida > 0.1" "price_to_sales ASC" 5
run_backtest "best_ps_ml_t10" "price_to_sales > 0 AND price_to_sales < 1 AND margem_liquida > 0.1" "price_to_sales ASC" 10
run_backtest "best_ps_ml_t15" "price_to_sales > 0 AND price_to_sales < 1 AND margem_liquida > 0.1" "price_to_sales ASC" 15
run_backtest "best_ps_ml_t20" "price_to_sales > 0 AND price_to_sales < 1 AND margem_liquida > 0.1" "price_to_sales ASC" 20
run_backtest "best_ps_ml_t30" "price_to_sales > 0 AND price_to_sales < 1 AND margem_liquida > 0.1" "price_to_sales ASC" 30

run_backtest "best_mf_t5" "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND roe > 0.1 AND margem_liquida > 0.1 AND liquidez_corrente > 1" "ev_ebit ASC" 5
run_backtest "best_mf_t10" "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND roe > 0.1 AND margem_liquida > 0.1 AND liquidez_corrente > 1" "ev_ebit ASC" 10
run_backtest "best_mf_t15" "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND roe > 0.1 AND margem_liquida > 0.1 AND liquidez_corrente > 1" "ev_ebit ASC" 15
run_backtest "best_mf_t20" "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND roe > 0.1 AND margem_liquida > 0.1 AND liquidez_corrente > 1" "ev_ebit ASC" 20
run_backtest "best_mf_t30" "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND roe > 0.1 AND margem_liquida > 0.1 AND liquidez_corrente > 1" "ev_ebit ASC" 30

run_backtest "best_ev8_t5" "ev_ebit > 0 AND ev_ebit < 8" "ev_ebit ASC" 5
run_backtest "best_ev8_t10" "ev_ebit > 0 AND ev_ebit < 8" "ev_ebit ASC" 10
run_backtest "best_ev8_t15" "ev_ebit > 0 AND ev_ebit < 8" "ev_ebit ASC" 15
run_backtest "best_ev8_t20" "ev_ebit > 0 AND ev_ebit < 8" "ev_ebit ASC" 20
run_backtest "best_ev8_t30" "ev_ebit > 0 AND ev_ebit < 8" "ev_ebit ASC" 30

# ============================================================
write_category "12. Contrarian / deep value"
# ============================================================

run_backtest "deep_pl2" "pl_ratio > 0 AND pl_ratio < 2" "pl_ratio ASC" 10
run_backtest "deep_pl2_t20" "pl_ratio > 0 AND pl_ratio < 2" "pl_ratio ASC" 20
run_backtest "deep_ev2" "ev_ebit > 0 AND ev_ebit < 2" "ev_ebit ASC" 10
run_backtest "deep_ev2_t20" "ev_ebit > 0 AND ev_ebit < 2" "ev_ebit ASC" 20
run_backtest "deep_pvp03" "pvp_ratio > 0 AND pvp_ratio < 0.3" "pvp_ratio ASC" 10
run_backtest "deep_pvp03_t20" "pvp_ratio > 0 AND pvp_ratio < 0.3" "pvp_ratio ASC" 20
run_backtest "deep_pl3_pvp05" "pl_ratio > 0 AND pl_ratio < 3 AND pvp_ratio > 0 AND pvp_ratio < 0.5" "pl_ratio ASC" 10
run_backtest "deep_pl3_pvp05_t20" "pl_ratio > 0 AND pl_ratio < 3 AND pvp_ratio > 0 AND pvp_ratio < 0.5" "pl_ratio ASC" 20
run_backtest "deep_ev3_pvp1" "ev_ebit > 0 AND ev_ebit < 3 AND pvp_ratio > 0 AND pvp_ratio < 1" "ev_ebit ASC" 10
run_backtest "deep_ev3_pvp1_t20" "ev_ebit > 0 AND ev_ebit < 3 AND pvp_ratio > 0 AND pvp_ratio < 1" "ev_ebit ASC" 20
run_backtest "deep_pl3_ev3_ml5" "pl_ratio > 0 AND pl_ratio < 3 AND ev_ebit > 0 AND ev_ebit < 3 AND margem_liquida > 0.05" "pl_ratio ASC" 10
run_backtest "deep_pl3_ev3_ml5_t20" "pl_ratio > 0 AND pl_ratio < 3 AND ev_ebit > 0 AND ev_ebit < 3 AND margem_liquida > 0.05" "pl_ratio ASC" 20
run_backtest "deep_pl3_ev3_roe10" "pl_ratio > 0 AND pl_ratio < 3 AND ev_ebit > 0 AND ev_ebit < 3 AND roe > 0.1" "ev_ebit ASC" 10
run_backtest "deep_pl3_ev3_roe10_t20" "pl_ratio > 0 AND pl_ratio < 3 AND ev_ebit > 0 AND ev_ebit < 3 AND roe > 0.1" "ev_ebit ASC" 20

# ============================================================
write_category "13. Sector-agnostic quality screens"
# ============================================================

# Pure quality ranked by value
run_backtest "quality_roe20_ml15_rankpl" "roe > 0.2 AND margem_liquida > 0.15 AND pl_ratio > 0" "pl_ratio ASC" 10
run_backtest "quality_roe20_ml15_rankpl_t20" "roe > 0.2 AND margem_liquida > 0.15 AND pl_ratio > 0" "pl_ratio ASC" 20
run_backtest "quality_roe15_mb30_rankev" "roe > 0.15 AND margem_bruta > 0.3 AND ev_ebit > 0" "ev_ebit ASC" 10
run_backtest "quality_roe15_mb30_rankev_t20" "roe > 0.15 AND margem_bruta > 0.3 AND ev_ebit > 0" "ev_ebit ASC" 20
run_backtest "quality_roa10_ml10_rankpl" "roa > 0.1 AND margem_liquida > 0.1 AND pl_ratio > 0" "pl_ratio ASC" 10
run_backtest "quality_roa10_ml10_rankpl_t20" "roa > 0.1 AND margem_liquida > 0.1 AND pl_ratio > 0" "pl_ratio ASC" 20
run_backtest "quality_roe15_liq15_rankev" "roe > 0.15 AND liquidez_corrente > 1.5 AND ev_ebit > 0" "ev_ebit ASC" 10
run_backtest "quality_roe15_liq15_rankev_t20" "roe > 0.15 AND liquidez_corrente > 1.5 AND ev_ebit > 0" "ev_ebit ASC" 20
run_backtest "quality_roe25_rankpl" "roe > 0.25 AND pl_ratio > 0" "pl_ratio ASC" 10
run_backtest "quality_roe25_rankpl_t20" "roe > 0.25 AND pl_ratio > 0" "pl_ratio ASC" 20

# ============================================================
write_category "14. Higher liquidity threshold (5M+/day)"
# ============================================================

# Re-test best strategies with stricter liquidity
LIQ_OLD="$LIQ"
LIQ="AND avg_daily_liquidity > 5e6"

run_backtest "hiq_ps1_ml10" "price_to_sales > 0 AND price_to_sales < 1 AND margem_liquida > 0.1" "price_to_sales ASC" 10
run_backtest "hiq_ps1_ml10_t20" "price_to_sales > 0 AND price_to_sales < 1 AND margem_liquida > 0.1" "price_to_sales ASC" 20
run_backtest "hiq_ev8" "ev_ebit > 0 AND ev_ebit < 8" "ev_ebit ASC" 10
run_backtest "hiq_ev8_t20" "ev_ebit > 0 AND ev_ebit < 8" "ev_ebit ASC" 20
run_backtest "hiq_pl8_ev8" "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8" "ev_ebit ASC" 10
run_backtest "hiq_pl8_ev8_t20" "pl_ratio > 0 AND pl_ratio < 8 AND ev_ebit > 0 AND ev_ebit < 8" "ev_ebit ASC" 20
run_backtest "hiq_ev15_roe10" "ev_ebit > 0 AND ev_ebit < 15 AND roe > 0.1" "ev_ebit ASC" 10
run_backtest "hiq_ev15_roe10_t20" "ev_ebit > 0 AND ev_ebit < 15 AND roe > 0.1" "ev_ebit ASC" 20
run_backtest "hiq_pl10_liq15" "pl_ratio > 0 AND pl_ratio < 10 AND liquidez_corrente > 1.5" "pl_ratio ASC" 10
run_backtest "hiq_pl10_liq15_t20" "pl_ratio > 0 AND pl_ratio < 10 AND liquidez_corrente > 1.5" "pl_ratio ASC" 20
run_backtest "hiq_mf_val_qual_liq" "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND roe > 0.1 AND margem_liquida > 0.1 AND liquidez_corrente > 1" "ev_ebit ASC" 10
run_backtest "hiq_mf_val_qual_liq_t20" "pl_ratio > 0 AND pl_ratio < 5 AND ev_ebit > 0 AND ev_ebit < 5 AND roe > 0.1 AND margem_liquida > 0.1 AND liquidez_corrente > 1" "ev_ebit ASC" 20

LIQ="$LIQ_OLD"

# ============================================================
# Build the top results summary at the end
# ============================================================

echo "" >> "$OUTFILE"
echo "---" >> "$OUTFILE"
echo "## TOP 25 BY TOTAL RETURN" >> "$OUTFILE"
echo "" >> "$OUTFILE"
echo "| # | Strategy | Return | CAGR | Sharpe | MaxDD | Win% | Command |" >> "$OUTFILE"
echo "|---|----------|--------|------|--------|-------|------|---------|" >> "$OUTFILE"

tail -n +2 "$CSVFILE" | sort -t',' -k2 -rn | head -25 | nl -w2 -s'|' | while IFS=',' read -r id ret cagr mdd sharpe wr qtrs filter rank top; do
  num=$(echo "$id" | cut -d'|' -f1 | tr -d ' ')
  name=$(echo "$id" | cut -d'|' -f2 | tr -d '"')
  filter_clean=$(echo "$filter" | tr -d '"')
  rank_clean=$(echo "$rank" | tr -d '"')
  echo "| $num | $name | ${ret}% | ${cagr}% | $sharpe | ${mdd}% | ${wr}% | \`bun backtest --filter \"$filter_clean\" --rank \"$rank_clean\" --top $top\` |" >> "$OUTFILE"
done

echo "" >> "$OUTFILE"
echo "---" >> "$OUTFILE"
echo "## TOP 15 BY SHARPE RATIO" >> "$OUTFILE"
echo "" >> "$OUTFILE"
echo "| # | Strategy | Return | CAGR | Sharpe | MaxDD | Win% | Command |" >> "$OUTFILE"
echo "|---|----------|--------|------|--------|-------|------|---------|" >> "$OUTFILE"

tail -n +2 "$CSVFILE" | sort -t',' -k5 -rn | head -15 | nl -w2 -s'|' | while IFS=',' read -r id ret cagr mdd sharpe wr qtrs filter rank top; do
  num=$(echo "$id" | cut -d'|' -f1 | tr -d ' ')
  name=$(echo "$id" | cut -d'|' -f2 | tr -d '"')
  filter_clean=$(echo "$filter" | tr -d '"')
  rank_clean=$(echo "$rank" | tr -d '"')
  echo "| $num | $name | ${ret}% | ${cagr}% | $sharpe | ${mdd}% | ${wr}% | \`bun backtest --filter \"$filter_clean\" --rank \"$rank_clean\" --top $top\` |" >> "$OUTFILE"
done

echo ""
echo "=== ALL EXPERIMENTS COMPLETE ==="
echo "Results saved to: experiments/results.md and experiments/results.csv"
echo "Total strategies tested: $(tail -n +2 "$CSVFILE" | wc -l)"
