import { readdirSync } from "fs";
import path from "path";
import { CVM_EXTRACTED_DIR } from "./paths";
import { openDatabase } from "./db/connection";
import { createTables } from "./db/schema";
import {
  parseFinancialFilename,
  parseFinancialCsv,
  type AccountEntry,
} from "./parsers/financial-data";
import { parseCsv } from "./parsers/csv";

const COMPOSICAO_RE =
  /^(dfp|itr)_cia_aberta_composicao_capital_(\d{4})\.csv$/;

const DIR_RE = /^(dfp|itr)_cia_aberta_(\d{4})$/;

// Key for grouping accounts into one row per company/quarter/scope
function quarterKey(e: AccountEntry): string {
  return `${e.cnpj}|${e.dt_fim_exerc}|${e.scope}`;
}

// Key for version dedup: per company/dt_refer/source
function versionKey(e: AccountEntry): string {
  return `${e.cnpj}|${e.dt_refer}`;
}

interface CompanyQuarter {
  cnpj: string;
  cd_cvm: string;
  denom_cia: string;
  dt_refer: string;
  dt_fim_exerc: string;
  dt_ini_exerc: string | null;
  scope: string;
  // accounts indexed by "STATEMENT:CD_CONTA"
  accounts: Map<string, { value: number; desc: string }>;
}

/**
 * Extract a pivoted value from the accounts map.
 * Tries each key in order, returns the first match.
 */
function extract(
  accounts: Map<string, { value: number; desc: string }>,
  ...keys: string[]
): number | null {
  for (const key of keys) {
    const entry = accounts.get(key);
    if (entry !== undefined) return entry.value;
  }
  return null;
}

/**
 * Find patrimônio líquido — account code varies between regular companies (2.03)
 * and banks (2.07, 2.08). We look for the one whose description contains "Patrimônio".
 */
function extractPatrimonioLiquido(
  accounts: Map<string, { value: number; desc: string }>
): number | null {
  // Try common codes in order of likelihood
  for (const code of ["2.03", "2.07", "2.08"]) {
    const entry = accounts.get(`BPP:${code}`);
    if (entry && entry.desc.includes("Patrim")) return entry.value;
  }
  return null;
}

/**
 * Find lucro líquido — usually 3.11, but for companies with discontinued operations
 * it can be 3.13. We find the highest 3.XX (excluding 3.99 which is LPA) whose
 * description contains "Lucro" or "Prejuízo" and "Período" or "Consolidado".
 */
function extractLucroLiquido(
  accounts: Map<string, { value: number; desc: string }>
): number | null {
  let best: { code: string; value: number } | null = null;

  for (const [key, entry] of accounts) {
    if (!key.startsWith("DRE:3.")) continue;
    const code = key.slice(4); // remove "DRE:"
    if (code === "3.99") continue;
    if (code.includes(".")) {
      const parts = code.split(".");
      // Only top-level 3.XX codes
      if (parts.length !== 2) continue;
    }
    const desc = entry.desc;
    if (
      (desc.includes("Lucro") || desc.includes("Prejuízo")) &&
      (desc.includes("Período") || desc.includes("Consolidado"))
    ) {
      if (!best || code > best.code) {
        best = { code, value: entry.value };
      }
    }
  }

  return best?.value ?? null;
}

/**
 * Find EBIT — for regular companies it's 3.05 "Resultado Antes do Resultado Financeiro".
 * Banks don't have a traditional EBIT (their 3.05 means something else).
 */
function extractEbit(
  accounts: Map<string, { value: number; desc: string }>
): number | null {
  const entry = accounts.get("DRE:3.05");
  if (!entry) return null;
  // Only count as EBIT if description mentions "Financeiro" (i.e., "before financial result")
  if (entry.desc.includes("Financeiro")) return entry.value;
  return null;
}

async function main() {
  const db = openDatabase();
  createTables(db);

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

  const dirs = readdirSync(CVM_EXTRACTED_DIR)
    .filter((d) => DIR_RE.test(d))
    .sort();

  let totalQuarters = 0;

  for (const dir of dirs) {
    const match = dir.match(DIR_RE)!;
    const sourceType = match[1];
    const year = parseInt(match[2]);
    const dirPath = path.join(CVM_EXTRACTED_DIR, dir);

    const files = readdirSync(dirPath).filter((f) => f.endsWith(".csv"));
    console.log(`Importing ${dir} (${files.length} files)...`);

    // Parse composicao de capital files for shares outstanding
    // Key: cnpj|dt_refer -> { version, shares }
    const sharesMap = new Map<string, { version: number; shares: number }>();
    for (const file of files) {
      if (!COMPOSICAO_RE.test(file)) continue;
      const filePath = path.join(dirPath, file);
      const { headers, rows } = await parseCsv(filePath);
      const col = Object.fromEntries(headers.map((h, i) => [h, i]));

      for (const row of rows) {
        const cnpj = row[col["CNPJ_CIA"]];
        const dtRefer = row[col["DT_REFER"]];
        const version = parseInt(row[col["VERSAO"]]);
        const totalIntegr = parseFloat(row[col["QT_ACAO_TOTAL_CAP_INTEGR"]] || "0");
        const totalTesouro = parseFloat(row[col["QT_ACAO_TOTAL_TESOURO"]] || "0");
        const shares = totalIntegr - totalTesouro;

        const key = `${cnpj}|${dtRefer}`;
        const existing = sharesMap.get(key);
        if (!existing || version > existing.version) {
          sharesMap.set(key, { version, shares });
        }
      }
    }

    // Phase 1: Collect all account entries and track max versions
    const maxVersions = new Map<string, number>(); // versionKey -> max version
    const allEntries: AccountEntry[] = [];
    for (const file of files) {
      const filePath = path.join(dirPath, file);

      const parsed = parseFinancialFilename(file);
      if (parsed) {
        const entries = await parseFinancialCsv(
          filePath,
          parsed.statement,
          parsed.scope
        );
        for (const entry of entries) {
          const vk = versionKey(entry);
          const cur = maxVersions.get(vk) ?? 0;
          if (entry.versao > cur) maxVersions.set(vk, entry.versao);
        }
        allEntries.push(...entries);
        continue;
      }

    }

    // Phase 2: Filter to max version only, then group by company/quarter/scope
    const quarters = new Map<string, CompanyQuarter>();

    for (const entry of allEntries) {
      const vk = versionKey(entry);
      if (entry.versao < maxVersions.get(vk)!) continue;

      const qk = quarterKey(entry);
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

      // Update dt_ini_exerc if this entry has it (DRE/DFC files have it, BPA/BPP don't)
      if (entry.dt_ini_exerc && !q.dt_ini_exerc) {
        q.dt_ini_exerc = entry.dt_ini_exerc;
      }

      const accountKey = `${entry.statement}:${entry.cd_conta}`;
      q.accounts.set(accountKey, {
        value: entry.vl_conta,
        desc: entry.ds_conta,
      });
    }

    // Phase 3: Pivot and insert within a transaction
    const tx = db.transaction(() => {
      deleteQuarters.run(year, sourceType);

      for (const q of quarters.values()) {
        const a = q.accounts;

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

          // BPA
          $ativo_total: extract(a, "BPA:1"),
          $ativo_circulante: extract(a, "BPA:1.01"),
          $caixa_equivalentes: extract(a, "BPA:1.01.01"),

          // BPP
          $passivo_total: extract(a, "BPP:2"),
          $passivo_circulante: extract(a, "BPP:2.01"),
          $passivo_nao_circulante: extract(a, "BPP:2.02"),
          $patrimonio_liquido: extractPatrimonioLiquido(a),

          // DRE
          $receita_liquida: extract(a, "DRE:3.01"),
          $custo_bens_servicos: extract(a, "DRE:3.02"),
          $resultado_bruto: extract(a, "DRE:3.03"),
          $ebit: extractEbit(a),
          $resultado_financeiro: extract(a, "DRE:3.06"),
          $resultado_antes_tributos: extract(a, "DRE:3.07"),
          $lucro_liquido: extractLucroLiquido(a),
          $lpa: extract(a, "DRE:3.99"),

          // DFC (try indirect method first, fall back to direct)
          $fluxo_caixa_operacional:
            extract(a, "DFC_MI:6.01") ?? extract(a, "DFC_MD:6.01"),
          $fluxo_caixa_investimento:
            extract(a, "DFC_MI:6.02") ?? extract(a, "DFC_MD:6.02"),
          $fluxo_caixa_financiamento:
            extract(a, "DFC_MI:6.03") ?? extract(a, "DFC_MD:6.03"),

          // Shares outstanding from composicao de capital
          $shares_outstanding:
            sharesMap.get(`${q.cnpj}|${q.dt_refer}`)?.shares ?? null,
        });
      }

    });

    tx();

    totalQuarters += quarters.size;
    console.log(`  -> ${quarters.size} company-quarter rows`);
  }

  console.log("\nRunning ANALYZE...");
  db.exec("ANALYZE");

  console.log(`\nDone! Total: ${totalQuarters} company-quarter rows`);
  db.close();
}

main().catch((err) => {
  console.error("Import failed:", err);
  process.exit(1);
});
