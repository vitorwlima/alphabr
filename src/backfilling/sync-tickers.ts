import type { Database } from "bun:sqlite";
import ky from "ky";

const B3_API_URL =
  "https://sistemaswebb3-listados.b3.com.br/listedCompaniesProxy/CompanyCall/GetInitialCompanies";
const PAGE_SIZE = 120;
const SHARE_SUFFIXES = ["3", "4", "11"];

interface B3Company {
  codeCVM: string;
  issuingCompany: string;
  companyName: string;
  tradingName: string;
  cnpj: string;
  typeBDR: string;
  market: string;
}

interface B3Response {
  page: { totalPages: number };
  results: B3Company[];
}

function formatCnpj(digits: string): string {
  const d = digits.padStart(14, "0");
  return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8, 12)}-${d.slice(12, 14)}`;
}

async function fetchPage(pageNumber: number): Promise<B3Response> {
  const params = btoa(
    JSON.stringify({ language: "pt-br", pageNumber, pageSize: PAGE_SIZE })
  );
  return ky.get(`${B3_API_URL}/${params}`).json<B3Response>();
}

export async function syncTickers(db: Database) {
  console.log("[4/6] Syncing tickers from B3...");

  const allCompanies: B3Company[] = [];
  let pageNumber = 1;
  let totalPages = 1;

  while (pageNumber <= totalPages) {
    const response = await fetchPage(pageNumber);
    totalPages = response.page.totalPages;
    allCompanies.push(...response.results);
    pageNumber++;
  }

  const validCompanies = allCompanies.filter(
    (c) => c.cnpj && c.cnpj !== "0" && !c.typeBDR && c.market !== "DRE"
  );

  const now = new Date().toISOString().slice(0, 10);
  const insert = db.prepare(`
    INSERT OR REPLACE INTO tickers (ticker, cnpj, denom_cia, ticker_yahoo, updated_at)
    VALUES ($ticker, $cnpj, $denom_cia, $ticker_yahoo, $updated_at)
  `);

  const count = db.transaction(() => {
    db.exec("DELETE FROM tickers");
    let count = 0;
    for (const company of validCompanies) {
      const cnpj = formatCnpj(company.cnpj);
      const base = company.issuingCompany.trim();
      if (!base) continue;
      for (const suffix of SHARE_SUFFIXES) {
        const ticker = `${base}${suffix}`;
        insert.run({
          $ticker: ticker,
          $cnpj: cnpj,
          $denom_cia: company.companyName || company.tradingName,
          $ticker_yahoo: `${ticker}.SA`,
          $updated_at: now,
        });
        count++;
      }
    }
    return count;
  })();

  const matched = db
    .query(
      `SELECT COUNT(DISTINCT t.cnpj) as cnt
       FROM tickers t JOIN company_quarters cq ON t.cnpj = cq.cnpj`
    )
    .get() as { cnt: number };

  console.log(`  ${count} tickers, ${matched.cnt} matched to CVM data.\n`);
}
