import assert from "node:assert/strict";
import test from "node:test";
import {
  ENDPOINT_INSERT_BATCH_SIZE,
  MAX_ENDPOINT_BYTES,
  MAX_ENDPOINTS_PER_JS,
  buildScopedFanOutJobs,
  extractHostname,
  isHostnameInScope,
  persistEndpointBatches,
  runEndpointAnalysisAttempt,
  sanitizeEndpointCandidates,
} from "../src/processor.js";

test("scope matching is label-delimited", () => {
  assert.equal(isHostnameInScope("example.com", "example.com"), true);
  assert.equal(isHostnameInScope("api.dev.example.com", "example.com"), true);
  assert.equal(isHostnameInScope("notexample.com", "example.com"), false);
  assert.equal(isHostnameInScope("example.com.evil.test", "example.com"), false);
});

test("endpoint candidates are normalized, deduplicated and index-safe", () => {
  const tooLong = `https://example.com/${"a".repeat(MAX_ENDPOINT_BYTES)}`;
  const candidates = sanitizeEndpointCandidates([
    " https://api.example.com/v1 ",
    "https://api.example.com/v1",
    "relative/path",
    "bad\0value",
    tooLong,
  ]);

  assert.deepEqual(candidates, [
    { endpoint: "https://api.example.com/v1", hostname: "api.example.com" },
    { endpoint: "relative/path", hostname: null },
  ]);
});

test("endpoint output has a hard per-file cap", () => {
  const candidates = sanitizeEndpointCandidates(
    Array.from({ length: MAX_ENDPOINTS_PER_JS + 20 }, (_, index) =>
      `https://example.com/${index}`
    )
  );

  assert.equal(candidates.length, MAX_ENDPOINTS_PER_JS);
  assert.equal(extractHostname("ftp://example.com/file"), null);
});

test("fan-out jobs use global stable asset IDs", () => {
  const hosts = new Map([["api.example.com", "https://api.example.com/v1"]]);
  const first = buildScopedFanOutJobs(
    [{ id: 7, domain: "api.example.com" }],
    [{ id: 7, domain: "api.example.com" }],
    hosts
  );
  const retry = buildScopedFanOutJobs(
    [{ id: 7, domain: "api.example.com" }],
    [{ id: 7, domain: "api.example.com" }],
    hosts
  );

  assert.equal(first.scanJobs[0]?.opts.jobId, "endpoint-scan-7");
  assert.equal(first.techJobs[0]?.opts.jobId, "endpoint-tech-7");
  assert.deepEqual(retry, first);
});

test("retries finish partial endpoint batches and missing fan-out before checkpointing", async () => {
  const jsId = 99;
  const foundEndpoints = Array.from(
    { length: ENDPOINT_INSERT_BATCH_SIZE + 50 },
    (_, index) => `https://api-${index}.example.com/v1`
  );
  const persistedEndpoints = new Set<string>();
  const assetIds = new Map<string, number>();
  const scanJobIds = new Set<string>();
  const techJobIds = new Set<string>();
  let failSecondBatch = true;
  let findAttempts = 0;
  let fanOutAttempts = 0;
  let completed = 0;
  const changedEndpoints = Array.from(
    { length: MAX_ENDPOINTS_PER_JS },
    (_, index) => `https://changed-${index}.example.com/v2`
  );

  const operations = {
    findEndpoints: async () => {
      findAttempts += 1;
      // The source can change between attempts. Persisted candidates must
      // still recover assets created before the queue failure.
      return findAttempts === 3 ? changedEndpoints : foundEndpoints;
    },
    persistEndpoints: async (
      analysisJsId: number,
      candidates: ReturnType<typeof sanitizeEndpointCandidates>
    ) => {
      let batchNumber = 0;
      await persistEndpointBatches(analysisJsId, candidates, async (rows) => {
        batchNumber += 1;
        if (failSecondBatch && batchNumber === 2) {
          failSecondBatch = false;
          throw new Error("second endpoint batch failed");
        }
        for (const row of rows) persistedEndpoints.add(row.endpoint);
      });
    },
    loadPersistedEndpoints: async () => [...persistedEndpoints],
    fanOut: async (
      _analysisJsId: number,
      candidates: ReturnType<typeof sanitizeEndpointCandidates>
    ) => {
      fanOutAttempts += 1;
      const scopedHosts = new Map<string, string>();
      for (const candidate of candidates) {
        if (!candidate.hostname) continue;
        scopedHosts.set(candidate.hostname, candidate.endpoint);
        if (!assetIds.has(candidate.hostname)) {
          assetIds.set(candidate.hostname, assetIds.size + 1);
        }
      }

      // Every retry receives all upserted rows, not only rows that were new in
      // this attempt. This mirrors PostgreSQL INSERT .. ON CONFLICT .. RETURNING.
      const discovered = [...scopedHosts.keys()].map((domain) => ({
        id: assetIds.get(domain)!,
        domain,
      }));
      const jobs = buildScopedFanOutJobs(discovered, discovered, scopedHosts);
      for (const queued of jobs.scanJobs) scanJobIds.add(queued.opts.jobId!);

      if (fanOutAttempts === 1) {
        throw new Error("technology queue unavailable");
      }
      for (const queued of jobs.techJobs) techJobIds.add(queued.opts.jobId!);
    },
    markComplete: async () => {
      completed += 1;
    },
  };

  await assert.rejects(
    runEndpointAnalysisAttempt(jsId, "https://example.com/app.js", operations),
    /second endpoint batch failed/
  );
  assert.equal(persistedEndpoints.size, ENDPOINT_INSERT_BATCH_SIZE);
  assert.equal(fanOutAttempts, 0);
  assert.equal(completed, 0);

  await assert.rejects(
    runEndpointAnalysisAttempt(jsId, "https://example.com/app.js", operations),
    /technology queue unavailable/
  );
  assert.equal(persistedEndpoints.size, foundEndpoints.length);
  assert.equal(assetIds.size, foundEndpoints.length);
  assert.equal(scanJobIds.size, foundEndpoints.length);
  assert.equal(techJobIds.size, 0);
  assert.equal(completed, 0);
  const partiallyPersistedAssetIds = [...assetIds.values()];

  await runEndpointAnalysisAttempt(jsId, "https://example.com/app.js", operations);
  assert.equal(persistedEndpoints.size, MAX_ENDPOINTS_PER_JS);
  assert.equal(scanJobIds.size, MAX_ENDPOINTS_PER_JS);
  assert.equal(techJobIds.size, MAX_ENDPOINTS_PER_JS);
  for (const assetId of partiallyPersistedAssetIds) {
    assert.equal(techJobIds.has(`endpoint-tech-${assetId}`), true);
  }
  assert.equal(findAttempts, 3);
  assert.equal(completed, 1);
});
