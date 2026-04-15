import { openDatabase } from "../db/connection";
import { createTables } from "../db/schema";
import { downloadCvm } from "./download-cvm";
import { extractCvm } from "./extract-cvm";
import { importCvm } from "./import-cvm";
import { syncTickers } from "./sync-tickers";
import { syncPrices } from "./sync-prices";
import { computeMetrics } from "./compute-metrics";

async function main() {
  const start = Date.now();
  console.log("=== AlphaBR Backfill ===\n");

  await downloadCvm();
  await extractCvm();

  const db = openDatabase();
  createTables(db);

  try {
    await importCvm(db);
    await syncTickers(db);
    await syncPrices(db);
    await computeMetrics(db);
  } finally {
    db.close();
  }

  const elapsed = ((Date.now() - start) / 1000).toFixed(0);
  console.log(`=== Backfill complete (${elapsed}s) ===`);
}

main().catch((err) => {
  console.error("Backfill failed:", err);
  process.exit(1);
});
