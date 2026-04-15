import type { Database } from "bun:sqlite";

export function createTables(db: Database): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS company_quarters (
      cnpj              TEXT NOT NULL,
      cd_cvm            TEXT NOT NULL,
      denom_cia         TEXT NOT NULL,
      dt_refer          TEXT NOT NULL,
      dt_fim_exerc      TEXT NOT NULL,
      dt_ini_exerc      TEXT,
      source_type       TEXT NOT NULL,
      scope             TEXT NOT NULL,
      source_year       INTEGER NOT NULL,

      -- BPA (Balance Sheet - Assets)
      ativo_total             REAL,
      ativo_circulante        REAL,
      caixa_equivalentes      REAL,

      -- BPP (Balance Sheet - Liabilities)
      passivo_total           REAL,
      passivo_circulante      REAL,
      passivo_nao_circulante  REAL,
      patrimonio_liquido      REAL,

      -- DRE (Income Statement)
      receita_liquida         REAL,
      custo_bens_servicos     REAL,
      resultado_bruto         REAL,
      ebit                    REAL,
      resultado_financeiro    REAL,
      resultado_antes_tributos REAL,
      lucro_liquido           REAL,
      lpa                     REAL,

      -- DFC (Cash Flow)
      fluxo_caixa_operacional    REAL,
      fluxo_caixa_investimento   REAL,
      fluxo_caixa_financiamento  REAL,

      -- Capital composition
      shares_outstanding         REAL,

      PRIMARY KEY (cnpj, dt_fim_exerc, source_type, scope)
    );

    CREATE INDEX IF NOT EXISTS idx_cq_cvm
      ON company_quarters (cd_cvm);

    CREATE INDEX IF NOT EXISTS idx_cq_company_time
      ON company_quarters (cnpj, dt_fim_exerc);

    CREATE INDEX IF NOT EXISTS idx_cq_time
      ON company_quarters (dt_fim_exerc, scope);

    CREATE TABLE IF NOT EXISTS tickers (
      ticker        TEXT NOT NULL PRIMARY KEY,
      cnpj          TEXT NOT NULL,
      denom_cia     TEXT,
      ticker_yahoo  TEXT NOT NULL,
      updated_at    TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_tickers_cnpj ON tickers (cnpj);

    CREATE TABLE IF NOT EXISTS daily_prices (
      ticker_yahoo    TEXT NOT NULL,
      date            TEXT NOT NULL,
      open            REAL,
      high            REAL,
      low             REAL,
      close           REAL,
      adjusted_close  REAL,
      volume          INTEGER,
      PRIMARY KEY (ticker_yahoo, date)
    );

    CREATE INDEX IF NOT EXISTS idx_dp_date ON daily_prices (date);

    CREATE TABLE IF NOT EXISTS company_metrics (
      cnpj              TEXT NOT NULL,
      dt_fim_exerc      TEXT NOT NULL,
      scope             TEXT NOT NULL,
      ticker_yahoo      TEXT,

      -- Price data (quarter-end)
      price_close       REAL,
      price_date        TEXT,

      -- Shares & market
      shares_outstanding  REAL,
      market_cap          REAL,
      enterprise_value    REAL,

      -- TTM income statement
      receita_liquida_ttm     REAL,
      resultado_bruto_ttm     REAL,
      ebit_ttm                REAL,
      lucro_liquido_ttm       REAL,

      -- TTM cash flow
      fluxo_caixa_op_ttm      REAL,

      -- Valuation ratios
      pl_ratio          REAL,  -- P/L (P/E)
      pvp_ratio         REAL,  -- P/VP (P/B)
      ev_ebit           REAL,  -- EV/EBIT
      price_to_sales    REAL,  -- P/Receita

      -- Profitability ratios
      roe               REAL,  -- Return on Equity
      roa               REAL,  -- Return on Assets
      margem_liquida    REAL,  -- Net margin
      margem_bruta      REAL,  -- Gross margin
      margem_ebit       REAL,  -- EBIT margin

      -- Balance sheet ratios
      liquidez_corrente REAL,  -- Current ratio
      divida_liquida_ebit REAL, -- Net debt / EBIT

      -- Return (next quarter forward return for backtesting)
      return_1q         REAL,
      return_date_start TEXT,
      return_date_end   TEXT,

      PRIMARY KEY (cnpj, dt_fim_exerc, scope)
    );

    CREATE INDEX IF NOT EXISTS idx_cm_date ON company_metrics (dt_fim_exerc);
    CREATE INDEX IF NOT EXISTS idx_cm_ticker ON company_metrics (ticker_yahoo);
  `);
}
