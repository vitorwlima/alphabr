import ky from "ky";
import path from "path";
import { CVM_RAW_DIR } from "./paths";

const BASE_URLS = {
  ITR: "https://dados.cvm.gov.br/dados/CIA_ABERTA/DOC/ITR/DADOS",
  DFP: "https://dados.cvm.gov.br/dados/CIA_ABERTA/DOC/DFP/DADOS",
};

const START_YEAR = 2010;
const CURRENT_YEAR = new Date().getFullYear();

const downloadFile = async (url: string, outputPath: string) => {
  const response = await ky.get(url, {
    timeout: 1000 * 60 * 10, // 10min (big files)
  });
  const fileBuffer = await response.arrayBuffer();

  await Bun.write(outputPath, new Uint8Array(fileBuffer));
};

const processYear = async (type: "ITR" | "DFP", year: number) => {
  const fileName = `${type.toLowerCase()}_cia_aberta_${year}.zip`;
  const baseUrl = BASE_URLS[type];

  const url = `${baseUrl}/${fileName}`;
  const outputPath = path.join(CVM_RAW_DIR, fileName);

  const isCurrentYear = year === CURRENT_YEAR;
  const exists = await Bun.file(outputPath).exists();

  if (exists) {
    if (isCurrentYear) {
      console.log(`🔄 Atualizando ano atual: ${fileName}`);
      await Bun.file(outputPath).delete();
    } else {
      console.log(`⏭️  Já existe (ano fechado): ${fileName}`);
      return;
    }
  }

  console.log(`⬇️  Baixando: ${fileName}`);

  try {
    await downloadFile(url, outputPath);
    console.log(`✅ Baixado: ${fileName}`);
  } catch (err: any) {
    if (err?.response?.status === 404) {
      console.log(`⚠️  Ainda não disponível: ${fileName}`);
      return;
    }

    console.error(`❌ Erro ao baixar ${fileName}`, err.message);
  }
};

const main = async () => {
  for (let year = START_YEAR; year <= CURRENT_YEAR; year++) {
    await Promise.all([processYear("ITR", year), processYear("DFP", year)]);
  }

  console.log("🎉 Download finalizado");
};

main();
