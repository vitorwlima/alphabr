// @ts-expect-error: iso-8859-1 is valid at runtime but not in Bun's TS types
const decoder = new TextDecoder("iso-8859-1");

export interface CsvData {
  headers: string[];
  rows: string[][];
}

export async function parseCsv(filePath: string): Promise<CsvData> {
  const buffer = await Bun.file(filePath).arrayBuffer();
  const text = decoder.decode(buffer);
  const lines = text.split(/\r?\n/).filter((line) => line.length > 0);

  if (lines.length === 0) return { headers: [], rows: [] };

  const headers = lines[0]!.split(";");
  const rows = lines.slice(1).map((line) => line.split(";"));
  return { headers, rows };
}
