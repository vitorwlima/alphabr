import path from "path";
import { CVM_EXTRACTED_DIR, CVM_RAW_DIR } from "./paths";

const ZIP_FILES = new Bun.Glob("*.zip");

const main = async () => {
  const zipPaths: string[] = [];

  for await (const match of ZIP_FILES.scan(CVM_RAW_DIR)) {
    zipPaths.push(path.join(CVM_RAW_DIR, match));
  }

  await Bun.spawn(["mkdir", "-p", CVM_EXTRACTED_DIR], {}).exited;

  for (const zipPath of zipPaths) {
    const fileName = path.basename(zipPath);
    const outputDir = path.join(
      CVM_EXTRACTED_DIR,
      path.basename(zipPath, ".zip")
    );

    console.log(`📦 Extraindo: ${fileName}`);

    await Bun.spawn(["mkdir", "-p", outputDir], {}).exited;
    await Bun.spawn(["unzip", "-o", "-q", zipPath, "-d", outputDir], {}).exited;

    console.log(`✅ Extraído: ${fileName}`);
  }

  console.log("🎉 Extração finalizada");
};

await main();
