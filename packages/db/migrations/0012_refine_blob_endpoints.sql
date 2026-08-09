-- The first live reindex exposed escaped path variants and Next.js image
-- srcsets that are not useful endpoints. Rebuild the still-small shared index
-- once with the stricter canonicalizer rather than retaining noisy rows.
TRUNCATE TABLE "blob_endpoints";

UPDATE "js_blobs"
SET "endpoint_analysis_started_at" = NULL,
    "endpoint_analyzed_at" = NULL;

UPDATE "javascript_files"
SET "endpoint_analysis_started_at" = NULL,
    "endpoint_analyzed_at" = NULL
WHERE "sha256" IS NOT NULL
  AND "fetched_at" IS NOT NULL;

ANALYZE "javascript_files" ("sha256", "endpoint_analyzed_at");
ANALYZE "js_blobs";
ANALYZE "blob_endpoints";
