-- Endpoint extraction is a property of the JavaScript body, not of every URL
-- occurrence that serves it. Store the output once per content hash.
ALTER TABLE "js_blobs"
  ADD COLUMN IF NOT EXISTS "endpoint_analysis_started_at" timestamp,
  ADD COLUMN IF NOT EXISTS "endpoint_analyzed_at" timestamp;

CREATE TABLE IF NOT EXISTS "blob_endpoints" (
  "sha256" text NOT NULL REFERENCES "js_blobs"("sha256") ON DELETE CASCADE,
  "endpoint" text NOT NULL,
  "first_seen" timestamp DEFAULT now() NOT NULL,
  CONSTRAINT "blob_endpoints_pkey" PRIMARY KEY ("sha256", "endpoint")
);

-- Existing occurrence checkpoints refer to the old per-occurrence index.
-- Reset only stored blobs so the bounded scheduler can rebuild the new index
-- from exact MinIO content and repeat each occurrence's scoped fan-out.
UPDATE "javascript_files"
SET "endpoint_analyzed_at" = NULL,
    "endpoint_analysis_started_at" = NULL
WHERE "sha256" IS NOT NULL
  AND "fetched_at" IS NOT NULL;

CREATE INDEX IF NOT EXISTS "javascript_files_endpoint_pending_idx"
  ON "javascript_files" ("endpoint_analysis_started_at", "id")
  WHERE "endpoint_analyzed_at" IS NULL
    AND "sha256" IS NOT NULL
    AND "fetched_at" IS NOT NULL;

-- No production read path consumes the legacy rows. Keeping the empty table
-- preserves compatibility with older asset-deletion code while immediately
-- reclaiming its heap and 13 GB of indexes. Reindexing noisy legacy output
-- would defeat the content-addressed model and retain false positives.
TRUNCATE TABLE "endpoints";

ANALYZE "javascript_files" ("sha256", "endpoint_analyzed_at");
ANALYZE "js_blobs";
ANALYZE "blob_endpoints";
