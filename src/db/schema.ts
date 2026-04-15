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
  `);
}
