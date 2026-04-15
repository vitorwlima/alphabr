import { mkdirSync } from "fs";
import path from "path";
import { CVM_EXTRACTED_DIR, CVM_RAW_DIR } from "../paths";

const ZIP_GLOB = new Bun.Glob("*.zip");

export async function extractCvm() {
  console.log("[2/6] Extracting CVM archives...");
  mkdirSync(CVM_EXTRACTED_DIR, { recursive: true });

  const zipPaths: string[] = [];
  for await (const match of ZIP_GLOB.scan(CVM_RAW_DIR)) {
    zipPaths.push(path.join(CVM_RAW_DIR, match));
  }

  for (const zipPath of zipPaths) {
    const outputDir = path.join(CVM_EXTRACTED_DIR, path.basename(zipPath, ".zip"));
    mkdirSync(outputDir, { recursive: true });
    await Bun.spawn(["unzip", "-o", "-q", zipPath, "-d", outputDir], {}).exited;
  }
  console.log(`  Extracted ${zipPaths.length} archives.\n`);
}
