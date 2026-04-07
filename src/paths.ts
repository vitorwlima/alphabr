import path from "path";

const SRC_ROOT = path.resolve(import.meta.dir);

export const CVM_RAW_DIR = path.join(SRC_ROOT, "data", "cvm-raw");
export const CVM_EXTRACTED_DIR = path.join(SRC_ROOT, "data", "cvm-extracted");
