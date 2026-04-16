import type { Database } from "bun:sqlite";
import { readdirSync } from "fs";
import path from "path";
import { CVM_EXTRACTED_DIR } from "../paths";
import {
  parseFinancialFilename,
  parseFinancialCsv,
  type AccountEntry,
} from "./parsers/financial-data";
import { parseCsv } from "./parsers/csv";

const COMPOSICAO_RE = /^(dfp|itr)_cia_aberta_composicao_capital_(\d{4})\.csv$/;
const DIR_RE = /^(dfp|itr)_cia_aberta_(\d{4})$/;

interface CompanyQuarter {
  cnpj: string;
  cd_cvm: string;
  denom_cia: string;
  dt_refer: string;
  dt_fim_exerc: string;
  dt_ini_exerc: string | null;
  scope: string;
  accounts: AccountMap;
}

type AccountMap = Map<string, { value: number; desc: string }>;

function extract(accounts: AccountMap, ...keys: string[]): number | null {
  for (const key of keys) {
    const entry = accounts.get(key);
    if (entry !== undefined) return entry.value;
  }
  return null;
}

function extractPatrimonioLiquido(accounts: AccountMap): number | null {
  for (const code of ["2.03", "2.07", "2.08"]) {
    const entry = accounts.get(`BPP:${code}`);
    if (entry && entry.desc.includes("Patrim")) return entry.value;
  }
  return null;
}

function extractLucroLiquido(accounts: AccountMap): number | null {
  let best: { code: string; value: number } | null = null;

  for (const [key, entry] of accounts) {
    if (!key.startsWith("DRE:3.")) continue;
    const code = key.slice(4);
    if (code === "3.99" || code.split(".").length !== 2) continue;
    if (
      (entry.desc.includes("Lucro") || entry.desc.includes("Prejuízo")) &&
      (entry.desc.includes("Período") || entry.desc.includes("Consolidado"))
    ) {
      if (!best || code > best.code) best = { code, value: entry.value };
    }
  }
  return best?.value ?? null;
}

function extractLPA(accounts: AccountMap): number | null {
  for (const [key, entry] of accounts) {
    if (key.startsWith("DRE:3.99.01.") && entry.desc === "ON") return entry.value;
  }
  const fallback = accounts.get("DRE:3.99.01.01");
  return fallback && fallback.value !== 0 ? fallback.value : null;
}

function extractEbit(accounts: AccountMap): number | null {
  const entry = accounts.get("DRE:3.05");
  return entry && entry.desc.includes("Financeiro") ? entry.value : null;
}

export async function importCvm(db: Database) {
  console.log("[3/6] Importing CVM data into database...");

  const insertQuarter = db.prepare(`
    INSERT OR REPLACE INTO company_quarters (
      cnpj, cd_cvm, denom_cia, dt_refer, dt_fim_exerc, dt_ini_exerc,
      source_type, scope, source_year,
      ativo_total, ativo_circulante, caixa_equivalentes,
      passivo_total, passivo_circulante, passivo_nao_circulante, patrimonio_liquido,
      receita_liquida, custo_bens_servicos, resultado_bruto, ebit,
      resultado_financeiro, resultado_antes_tributos, lucro_liquido, lpa,
      fluxo_caixa_operacional, fluxo_caixa_investimento, fluxo_caixa_financiamento,
      shares_outstanding
    ) VALUES (
      $cnpj, $cd_cvm, $denom_cia, $dt_refer, $dt_fim_exerc, $dt_ini_exerc,
      $source_type, $scope, $source_year,
      $ativo_total, $ativo_circulante, $caixa_equivalentes,
      $passivo_total, $passivo_circulante, $passivo_nao_circulante, $patrimonio_liquido,
      $receita_liquida, $custo_bens_servicos, $resultado_bruto, $ebit,
      $resultado_financeiro, $resultado_antes_tributos, $lucro_liquido, $lpa,
      $fluxo_caixa_operacional, $fluxo_caixa_investimento, $fluxo_caixa_financiamento,
      $shares_outstanding
    )
  `);

  const deleteQuarters = db.prepare(
    "DELETE FROM company_quarters WHERE source_year = ? AND source_type = ?"
  );

  // Check which source_year/source_type combos are already imported
  const imported = new Set<string>();
  const importedRows = db
    .query("SELECT DISTINCT source_year, source_type FROM company_quarters")
    .all() as { source_year: number; source_type: string }[];
  for (const r of importedRows) {
    imported.add(`${r.source_type}|${r.source_year}`);
  }

  const currentYear = new Date().getFullYear();

  const dirs = readdirSync(CVM_EXTRACTED_DIR)
    .filter((d) => DIR_RE.test(d))
    .sort();

  let totalQuarters = 0;
  let skipped = 0;

  for (const dir of dirs) {
    const match = dir.match(DIR_RE)!;
    const sourceType = match[1]!;
    const year = parseInt(match[2]!);

    // Skip closed years that are already imported
    if (year < currentYear && imported.has(`${sourceType}|${year}`)) {
      skipped++;
      continue;
    }
    const dirPath = path.join(CVM_EXTRACTED_DIR, dir);
    const files = readdirSync(dirPath).filter((f) => f.endsWith(".csv"));

    // Parse composicao de capital for shares outstanding
    const sharesMap = new Map<string, { version: number; shares: number }>();
    for (const file of files) {
      if (!COMPOSICAO_RE.test(file)) continue;
      const { headers, rows } = await parseCsv(path.join(dirPath, file));
      const col = Object.fromEntries(headers.map((h, i) => [h, i])) as Record<string, number>;

      for (const row of rows) {
        const cnpj = row[col["CNPJ_CIA"]!]!;
        const dtRefer = row[col["DT_REFER"]!]!;
        const version = parseInt(row[col["VERSAO"]!]!);
        const shares =
          parseFloat(row[col["QT_ACAO_TOTAL_CAP_INTEGR"]!] || "0") -
          parseFloat(row[col["QT_ACAO_TOTAL_TESOURO"]!] || "0");

        const key = `${cnpj}|${dtRefer}`;
        const existing = sharesMap.get(key);
        if (!existing || version > existing.version) {
          sharesMap.set(key, { version, shares });
        }
      }
    }

    // Phase 1: Collect entries and track max versions
    const maxVersions = new Map<string, number>();
    const allEntries: AccountEntry[] = [];
    for (const file of files) {
      const parsed = parseFinancialFilename(file);
      if (!parsed) continue;
      const entries = await parseFinancialCsv(
        path.join(dirPath, file),
        parsed.statement,
        parsed.scope
      );
      for (const entry of entries) {
        const vk = `${entry.cnpj}|${entry.dt_refer}`;
        const cur = maxVersions.get(vk) ?? 0;
        if (entry.versao > cur) maxVersions.set(vk, entry.versao);
      }
      allEntries.push(...entries);
    }

    // Phase 2: Filter to max version, group by company/quarter/scope
    const quarters = new Map<string, CompanyQuarter>();
    for (const entry of allEntries) {
      const vk = `${entry.cnpj}|${entry.dt_refer}`;
      if (entry.versao < maxVersions.get(vk)!) continue;

      const qk = `${entry.cnpj}|${entry.dt_fim_exerc}|${entry.scope}`;
      let q = quarters.get(qk);
      if (!q) {
        q = {
          cnpj: entry.cnpj,
          cd_cvm: entry.cd_cvm,
          denom_cia: entry.denom_cia,
          dt_refer: entry.dt_refer,
          dt_fim_exerc: entry.dt_fim_exerc,
          dt_ini_exerc: entry.dt_ini_exerc,
          scope: entry.scope,
          accounts: new Map(),
        };
        quarters.set(qk, q);
      }
      if (entry.dt_ini_exerc && !q.dt_ini_exerc) {
        q.dt_ini_exerc = entry.dt_ini_exerc;
      }
      q.accounts.set(`${entry.statement}:${entry.cd_conta}`, {
        value: entry.vl_conta,
        desc: entry.ds_conta,
      });
    }

    // Phase 3: Pivot and insert
    db.transaction(() => {
      deleteQuarters.run(year, sourceType);

      for (const q of quarters.values()) {
        const a = q.accounts;
        const lpa = extractLPA(a);
        const lucroLiquido = extractLucroLiquido(a);

        const fromComposicao = sharesMap.get(`${q.cnpj}|${q.dt_refer}`)?.shares;
        let sharesOutstanding: number | null = null;
        if (fromComposicao && fromComposicao > 0) {
          sharesOutstanding = fromComposicao;
        } else if (lpa && lpa !== 0 && lucroLiquido && lucroLiquido !== 0) {
          sharesOutstanding = Math.abs(lucroLiquido / lpa);
        }

        insertQuarter.run({
          $cnpj: q.cnpj,
          $cd_cvm: q.cd_cvm,
          $denom_cia: q.denom_cia,
          $dt_refer: q.dt_refer,
          $dt_fim_exerc: q.dt_fim_exerc,
          $dt_ini_exerc: q.dt_ini_exerc,
          $source_type: sourceType,
          $scope: q.scope,
          $source_year: year,
          $ativo_total: extract(a, "BPA:1"),
          $ativo_circulante: extract(a, "BPA:1.01"),
          $caixa_equivalentes: extract(a, "BPA:1.01.01"),
          $passivo_total: extract(a, "BPP:2"),
          $passivo_circulante: extract(a, "BPP:2.01"),
          $passivo_nao_circulante: extract(a, "BPP:2.02"),
          $patrimonio_liquido: extractPatrimonioLiquido(a),
          $receita_liquida: extract(a, "DRE:3.01"),
          $custo_bens_servicos: extract(a, "DRE:3.02"),
          $resultado_bruto: extract(a, "DRE:3.03"),
          $ebit: extractEbit(a),
          $resultado_financeiro: extract(a, "DRE:3.06"),
          $resultado_antes_tributos: extract(a, "DRE:3.07"),
          $lucro_liquido: lucroLiquido,
          $lpa: lpa,
          $fluxo_caixa_operacional:
            extract(a, "DFC_MI:6.01") ?? extract(a, "DFC_MD:6.01"),
          $fluxo_caixa_investimento:
            extract(a, "DFC_MI:6.02") ?? extract(a, "DFC_MD:6.02"),
          $fluxo_caixa_financiamento:
            extract(a, "DFC_MI:6.03") ?? extract(a, "DFC_MD:6.03"),
          $shares_outstanding: sharesOutstanding,
        });
      }
    })();

    totalQuarters += quarters.size;
    console.log(`  ${dir}: ${quarters.size} rows`);
  }

  if (totalQuarters > 0) db.exec("ANALYZE");
  console.log(`  Imported ${totalQuarters} rows (${skipped} dirs skipped, already up to date).\n`);
}
