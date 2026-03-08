import { getDb } from "@yaad/db";
import type { Db } from "@yaad/db";

let _db: Db | null = null;

export function db(): Db {
  if (!_db) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("DATABASE_URL is required");
    _db = getDb(url);
  }
  return _db;
}
