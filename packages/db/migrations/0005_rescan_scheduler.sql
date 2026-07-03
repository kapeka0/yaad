-- Continuous re-scan scheduler: staleness tracking columns.
-- The scheduler service re-enqueues enumeration/scan jobs for rows whose
-- timestamp below is NULL or older than the configured interval.

-- scopes: when the scheduler last (re-)enumerated subdomains for this scope
ALTER TABLE "scopes" ADD COLUMN IF NOT EXISTS "last_enumerated_at" timestamp;

-- assets: when the scheduler last (re-)enqueued an http scan for this asset
ALTER TABLE "assets" ADD COLUMN IF NOT EXISTS "last_scanned_at" timestamp;

-- Scheduler picks the oldest (or never-scanned) assets first.
CREATE INDEX IF NOT EXISTS "assets_last_scanned_at_idx" ON "assets" ("last_scanned_at");
