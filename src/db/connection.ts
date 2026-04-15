import { Database } from "bun:sqlite";
import { DB_PATH } from "../paths";

export function openDatabase(): Database {
  const db = new Database(DB_PATH);
  db.exec("PRAGMA journal_mode = WAL");
  db.exec("PRAGMA synchronous = NORMAL");
  db.exec("PRAGMA cache_size = -64000");
  db.exec("PRAGMA foreign_keys = ON");
  return db;
}
