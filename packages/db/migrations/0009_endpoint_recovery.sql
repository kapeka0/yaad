-- Existing assets already passed through the legacy discovery pipeline. A
-- temporary constant default backfills them without a table rewrite on modern
-- PostgreSQL; dropping it makes newly discovered assets start pending.
ALTER TABLE "assets"
  ADD COLUMN IF NOT EXISTS "endpoint_scan_enqueued_at" timestamp DEFAULT now(),
  ADD COLUMN IF NOT EXISTS "endpoint_tech_enqueued_at" timestamp DEFAULT now(),
  ADD COLUMN IF NOT EXISTS "endpoint_fanout_managed_at" timestamp,
  ADD COLUMN IF NOT EXISTS "endpoint_tech_url" text,
  ADD COLUMN IF NOT EXISTS "last_technology_scanned_at" timestamp;

ALTER TABLE "assets"
  ALTER COLUMN "endpoint_scan_enqueued_at" DROP DEFAULT,
  ALTER COLUMN "endpoint_tech_enqueued_at" DROP DEFAULT;

-- Existing scoped JS discoveries are the only ambiguous historical rows and
-- are a small subset. Keep them pending and scheduler-managed instead of
-- incorrectly declaring a partial endpoint attempt done.
UPDATE "assets"
SET "endpoint_scan_enqueued_at" = NULL,
    "endpoint_tech_enqueued_at" = NULL,
    "endpoint_fanout_managed_at" = now()
WHERE "source" = 'js'
  AND "scope_id" IS NOT NULL;

CREATE INDEX IF NOT EXISTS "assets_endpoint_scan_recovery_idx"
  ON "assets" ("last_scanned_at", "endpoint_scan_enqueued_at")
  WHERE "endpoint_fanout_managed_at" IS NOT NULL;

CREATE INDEX IF NOT EXISTS "assets_endpoint_tech_recovery_idx"
  ON "assets" ("last_technology_scanned_at", "endpoint_tech_enqueued_at")
  WHERE "endpoint_fanout_managed_at" IS NOT NULL
    AND "endpoint_tech_url" IS NOT NULL;

-- New and legacy pending jobs set this before producing endpoints. It is an
-- audit/retry marker; existing output is still reloaded and recovered rather
-- than being mistaken for a successful checkpoint.
ALTER TABLE "javascript_files"
  ADD COLUMN IF NOT EXISTS "endpoint_analysis_started_at" timestamp;
