import { parseCsv } from "./csv";

const SCALE_FACTORS: Record<string, number> = {
  MIL: 1000,
  UNIDADE: 1,
};

const FINANCIAL_FILE_RE =
  /^(dfp|itr)_cia_aberta_([A-Z_]+)_(con|ind)_(\d{4})\.csv$/;

export function parseFinancialFilename(filename: string) {
  const match = filename.match(FINANCIAL_FILE_RE);
  if (!match) return null;
  return {
    sourceType: match[1],
    statement: match[2],
    scope: match[3],
    year: parseInt(match[4]),
  };
}

export interface AccountEntry {
  cnpj: string;
  cd_cvm: string;
  denom_cia: string;
  dt_refer: string;
  dt_fim_exerc: string;
  dt_ini_exerc: string | null;
  versao: number;
  scope: string;
  statement: string;
  cd_conta: string;
  ds_conta: string;
  vl_conta: number;
}

/**
 * Parse a financial CSV and return account entries,
 * already filtered (no PENÚLTIMO) and normalized (currency scaled).
 */
export async function parseFinancialCsv(
  filePath: string,
  statement: string,
  scope: string
): Promise<AccountEntry[]> {
  const { headers, rows } = await parseCsv(filePath);
  if (rows.length === 0) return [];

  const col = Object.fromEntries(headers.map((h, i) => [h, i]));
  const hasDtIni = "DT_INI_EXERC" in col;
  const ordemIdx = col["ORDEM_EXERC"];

  const result: AccountEntry[] = [];

  for (const row of rows) {
    if (row[ordemIdx].startsWith("PEN")) continue;

    const scale = SCALE_FACTORS[row[col["ESCALA_MOEDA"]]] ?? 1;

    result.push({
      cnpj: row[col["CNPJ_CIA"]],
      cd_cvm: row[col["CD_CVM"]],
      denom_cia: row[col["DENOM_CIA"]],
      dt_refer: row[col["DT_REFER"]],
      dt_fim_exerc: row[col["DT_FIM_EXERC"]],
      dt_ini_exerc: hasDtIni ? row[col["DT_INI_EXERC"]] || null : null,
      versao: parseInt(row[col["VERSAO"]]),
      scope,
      statement,
      cd_conta: row[col["CD_CONTA"]],
      ds_conta: row[col["DS_CONTA"]],
      vl_conta: parseFloat(row[col["VL_CONTA"]]) * scale,
    });
  }

  return result;
}
