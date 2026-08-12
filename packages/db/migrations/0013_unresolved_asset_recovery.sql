-- Make the bounded unresolved/never-successful scheduler lane cheap even with
-- hundreds of thousands of historical assets.
CREATE INDEX IF NOT EXISTS "assets_unresolved_recovery_idx"
  ON "assets" ("last_scan_attempt_at", "id")
  WHERE "scope_id" IS NOT NULL
    AND "resolved" = false
    AND "last_scanned_at" IS NULL;

-- Explicit user imports are latency-sensitive and extremely sparse compared
-- with passive discoveries, so keep their priority lookup independent.
CREATE INDEX IF NOT EXISTS "assets_unresolved_manual_recovery_idx"
  ON "assets" ("last_scan_attempt_at", "id")
  WHERE "scope_id" IS NOT NULL
    AND "resolved" = false
    AND "last_scanned_at" IS NULL
    AND "source" = 'manual';

-- A historical manual import stored this malformed hostname as an asset and
-- scope. It cannot be scanned or matched as a valid wildcard (`*.v0.app`).
DELETE FROM "asset_technologies"
WHERE "asset_id" IN (
  SELECT a."id" FROM "assets" a
  WHERE a."domain" = '*v0.app'
    AND a."source" = 'manual'
    AND NOT a."resolved"
    AND NOT EXISTS (SELECT 1 FROM "web_services" ws WHERE ws."asset_id" = a."id")
);

DELETE FROM "assets" AS a
WHERE a."domain" = '*v0.app'
  AND a."source" = 'manual'
  AND NOT a."resolved"
  AND NOT EXISTS (SELECT 1 FROM "web_services" ws WHERE ws."asset_id" = a."id");

DELETE FROM "scopes" AS s
WHERE s."asset" = '*v0.app'
  AND NOT EXISTS (SELECT 1 FROM "assets" a WHERE a."scope_id" = s."id");

ANALYZE "assets" ("resolved", "last_scanned_at", "last_scan_attempt_at");
