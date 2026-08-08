-- Track queue attempts separately from successful worker completion. Previous
-- versions stamped the success fields while merely enqueueing, which hid
-- failed and stuck scans from freshness reporting.
ALTER TABLE "scopes"
  ADD COLUMN IF NOT EXISTS "last_enumeration_attempt_at" timestamp;

ALTER TABLE "assets"
  ADD COLUMN IF NOT EXISTS "last_scan_attempt_at" timestamp;

ALTER TABLE "javascript_files"
  ADD COLUMN IF NOT EXISTS "endpoint_analyzed_at" timestamp;

CREATE INDEX IF NOT EXISTS "assets_last_scan_attempt_at_idx"
  ON "assets" ("last_scan_attempt_at");

CREATE INDEX IF NOT EXISTS "assets_scheduler_ready_idx"
  ON "assets" ("last_scanned_at", "last_scan_attempt_at")
  WHERE "scope_id" IS NOT NULL AND "resolved" = true;

CREATE INDEX IF NOT EXISTS "scopes_scheduler_ready_idx"
  ON "scopes" ("last_enumerated_at", "last_enumeration_attempt_at")
  WHERE "wildcard" = true AND "in_scope" = true;

-- A URL is an occurrence on a web service, not a globally unique file. Build
-- the replacement before dropping the old constraint, so uniqueness is never
-- absent even if a deployment is interrupted.
CREATE UNIQUE INDEX IF NOT EXISTS "javascript_files_service_url_idx"
  ON "javascript_files" ("service_id", "url");

ALTER TABLE "javascript_files"
  DROP CONSTRAINT IF EXISTS "javascript_files_url_unique";
ALTER TABLE "javascript_files"
  DROP CONSTRAINT IF EXISTS "javascript_files_url_key";
DROP INDEX IF EXISTS "javascript_files_url_unique";

-- Reverse lookup indexes used by filters, cascade cleanup and worker context.
CREATE INDEX IF NOT EXISTS "asset_technologies_technology_asset_idx"
  ON "asset_technologies" ("technology_id", "asset_id");
CREATE INDEX IF NOT EXISTS "web_services_asset_id_idx"
  ON "web_services" ("asset_id");
