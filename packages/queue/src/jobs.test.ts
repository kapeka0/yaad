import assert from "node:assert/strict";
import test from "node:test";
import { getAssetScanJobId, shouldQueueAssetScan } from "./jobs.js";

test("unresolved and never-successful assets remain eligible for scanning", () => {
  assert.equal(shouldQueueAssetScan({ resolved: false, lastScannedAt: null }), true);
  assert.equal(shouldQueueAssetScan({ resolved: false, lastScannedAt: new Date() }), true);
  assert.equal(shouldQueueAssetScan({ resolved: true, lastScannedAt: null }), true);
  assert.equal(shouldQueueAssetScan({ resolved: true, lastScannedAt: new Date() }), false);
});

test("asset scan job IDs deduplicate within a retry window and rotate later", () => {
  const first = getAssetScanJobId(42, new Date("2026-08-12T00:00:00Z"), 6);
  const duplicate = getAssetScanJobId(42, new Date("2026-08-12T05:59:59Z"), 6);
  const later = getAssetScanJobId(42, new Date("2026-08-12T06:00:00Z"), 6);

  assert.equal(duplicate, first);
  assert.notEqual(later, first);
});
