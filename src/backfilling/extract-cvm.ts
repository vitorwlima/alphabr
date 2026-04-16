import { mkdirSync, readdirSync } from "fs";
import path from "path";
import { CVM_EXTRACTED_DIR, CVM_RAW_DIR } from "../paths";

const ZIP_GLOB = new Bun.Glob("*.zip");

async function zipEntryCount(zipPath: string): Promise<number> {
  const proc = Bun.spawn(["unzip", "-l", zipPath], { stdout: "pipe" });
  const output = await new Response(proc.stdout).text();
  // Last line before the dashes is "N files", parse it
  const match = output.match(/(\d+)\s+files?/);
  return match ? parseInt(match[1]!) : 0;
}

function dirFileCount(dirPath: string): number {
  try {
    return readdirSync(dirPath).length;
  } catch {
    return 0;
  }
}

export async function extractCvm() {
  console.log("[2/6] Extracting CVM archives...");
  mkdirSync(CVM_EXTRACTED_DIR, { recursive: true });

  const zipPaths: string[] = [];
  for await (const match of ZIP_GLOB.scan(CVM_RAW_DIR)) {
    zipPaths.push(path.join(CVM_RAW_DIR, match));
  }

  let extracted = 0;
  for (const zipPath of zipPaths) {
    const outputDir = path.join(CVM_EXTRACTED_DIR, path.basename(zipPath, ".zip"));

    const expected = await zipEntryCount(zipPath);
    if (expected > 0 && dirFileCount(outputDir) >= expected) continue;

    mkdirSync(outputDir, { recursive: true });
    await Bun.spawn(["unzip", "-o", "-q", zipPath, "-d", outputDir], {}).exited;
    extracted++;
  }
  console.log(`  Extracted ${extracted}/${zipPaths.length} archives (${zipPaths.length - extracted} up to date).\n`);
}
