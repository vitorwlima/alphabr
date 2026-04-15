import { mkdirSync } from "fs";
import ky from "ky";
import path from "path";
import { CVM_RAW_DIR } from "../paths";

const BASE_URLS = {
  ITR: "https://dados.cvm.gov.br/dados/CIA_ABERTA/DOC/ITR/DADOS",
  DFP: "https://dados.cvm.gov.br/dados/CIA_ABERTA/DOC/DFP/DADOS",
};

const START_YEAR = 2010;

async function downloadFile(url: string, outputPath: string) {
  const response = await ky.get(url, { timeout: 1000 * 60 * 10 });
  await Bun.write(outputPath, new Uint8Array(await response.arrayBuffer()));
}

async function processYear(type: "ITR" | "DFP", year: number, currentYear: number) {
  const fileName = `${type.toLowerCase()}_cia_aberta_${year}.zip`;
  const url = `${BASE_URLS[type]}/${fileName}`;
  const outputPath = path.join(CVM_RAW_DIR, fileName);

  const exists = await Bun.file(outputPath).exists();

  if (exists) {
    if (year === currentYear) {
      console.log(`  Updating current year: ${fileName}`);
      await Bun.file(outputPath).delete();
    } else {
      return;
    }
  }

  console.log(`  Downloading: ${fileName}`);
  try {
    await downloadFile(url, outputPath);
  } catch (err: any) {
    if (err?.response?.status === 404) {
      console.log(`  Not yet available: ${fileName}`);
      return;
    }
    console.error(`  Error downloading ${fileName}:`, err.message);
  }
}

export async function downloadCvm() {
  console.log("[1/6] Downloading CVM data...");
  mkdirSync(CVM_RAW_DIR, { recursive: true });

  const currentYear = new Date().getFullYear();
  for (let year = START_YEAR; year <= currentYear; year++) {
    await Promise.all([
      processYear("ITR", year, currentYear),
      processYear("DFP", year, currentYear),
    ]);
  }
  console.log("  Download complete.\n");
}
