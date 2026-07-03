import type { Db } from "@yaad/db";
import { jsBlobs } from "@yaad/db";
import { BlobStore } from "@yaad/storage";
import { sql } from "drizzle-orm";

/**
 * Store a JS body in object storage (content-addressable, deduped) and record
 * the blob in the DB. Returns the sha256 used to link javascript_files.
 */
export async function storeBlob(
  db: Db,
  store: BlobStore,
  body: Buffer
): Promise<string> {
  const res = await store.put(body);

  await db
    .insert(jsBlobs)
    .values({
      sha256: res.sha256,
      storageKey: res.storageKey,
      compression: res.compression,
      sizeBytes: res.sizeBytes,
      storedBytes: res.storedBytes,
      refCount: 1,
    })
    .onConflictDoUpdate({
      target: jsBlobs.sha256,
      set: { refCount: sql`${jsBlobs.refCount} + 1` },
    });

  return res.sha256;
}
