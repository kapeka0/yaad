import assert from "node:assert/strict";
import test from "node:test";
import {
  ENDPOINT_INSERT_BATCH_SIZE,
  MAX_ENDPOINT_BYTES,
  MAX_ENDPOINTS_PER_BLOB,
  buildScopedFanOutJobs,
  extractHostname,
  isHighSignalEndpoint,
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

test("endpoint candidates keep useful routes and reject static/tool noise", () => {
  const tooLong = `https://example.com/${"a".repeat(MAX_ENDPOINT_BYTES)}`;
  const candidates = sanitizeEndpointCandidates([
    " https://api.example.com/v1 ",
    "https://api.example.com/v1",
    "'/relative/users/{id}'",
    "/relative/users/{id}\\",
    "/relative/users/{id}\\\\\\",
    "api/v1/users",
    "graphql",
    "image/png",
    "text/javascript; charset=utf-8",
    "http://www.w3.org/2000/svg",
    "https://example.com/_next/static/chunks/app.js",
    "/_next/",
    "/_next/image?url=%2Flogo.png&w=640&q=75",
    "/_next/image?url=%2Flogo.png&w=640&q=75 640w, /_next/image?url=%2Flogo.png&w=750&q=75 750w",
    "https://example.com/assets/font.woff2?v=1",
    "/favicon.ico\\",
    "data:text/plain,hello",
    "Usage: python /opt/linkfinder/linkfinder.py [Options] use -h for help",
    "unrelatedIdentifier",
    "bad\0value",
    tooLong,
  ]);

  assert.deepEqual(candidates, [
    { endpoint: "https://api.example.com/v1", hostname: "api.example.com" },
    { endpoint: "/relative/users/{id}", hostname: null },
    { endpoint: "api/v1/users", hostname: null },
    { endpoint: "graphql", hostname: null },
  ]);
  assert.equal(isHighSignalEndpoint("/api/v2/users?active=1"), true);
  assert.equal(isHighSignalEndpoint("application/json"), false);
});

test("endpoint output has a hard per-blob cap", () => {
  const candidates = sanitizeEndpointCandidates(
    Array.from({ length: MAX_ENDPOINTS_PER_BLOB + 20 }, (_, index) =>
      `https://example.com/api/${index}`
    )
  );

  assert.equal(candidates.length, MAX_ENDPOINTS_PER_BLOB);
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

test("shared blob retries recover partial persistence and fan-out without reanalysis", async () => {
  const jsId = 99;
  const sha256 = "a".repeat(64);
  const foundEndpoints = Array.from(
    { length: ENDPOINT_INSERT_BATCH_SIZE + 50 },
    (_, index) => `https://api-${index}.example.com/v1`
  );
  const persistedEndpoints = new Set<string>();
  let claimed = false;
  let blobComplete = false;
  let failSecondBatch = true;
  let failFirstFanOut = true;
  let reads = 0;
  let findAttempts = 0;
  let releases = 0;
  let fanOutAttempts = 0;
  let completedOccurrences = 0;

  const operations = {
    claimBlobAnalysis: async () => {
      if (blobComplete) return "complete" as const;
      if (claimed) return "busy" as const;
      claimed = true;
      return "claimed" as const;
    },
    readBlob: async () => {
      reads += 1;
      return Buffer.from("const endpoint = '/api/v1';");
    },
    findEndpoints: async () => {
      findAttempts += 1;
      return foundEndpoints;
    },
    persistEndpoints: async (
      analysisSha: string,
      candidates: ReturnType<typeof sanitizeEndpointCandidates>
    ) => {
      let batchNumber = 0;
      await persistEndpointBatches(analysisSha, candidates, async (rows) => {
        batchNumber += 1;
        if (failSecondBatch && batchNumber === 2) {
          failSecondBatch = false;
          throw new Error("second endpoint batch failed");
        }
        for (const row of rows) {
          assert.equal(row.sha256, sha256);
          persistedEndpoints.add(row.endpoint);
        }
      });
    },
    loadPersistedEndpoints: async () => [...persistedEndpoints],
    markBlobComplete: async () => {
      blobComplete = true;
      claimed = false;
    },
    releaseBlobClaim: async () => {
      releases += 1;
      claimed = false;
    },
    fanOut: async () => {
      fanOutAttempts += 1;
      if (failFirstFanOut) {
        failFirstFanOut = false;
        throw new Error("fan-out queue unavailable");
      }
    },
    markComplete: async () => {
      completedOccurrences += 1;
    },
  };

  await assert.rejects(
    runEndpointAnalysisAttempt(jsId, sha256, operations),
    /second endpoint batch failed/
  );
  assert.equal(persistedEndpoints.size, ENDPOINT_INSERT_BATCH_SIZE);
  assert.equal(blobComplete, false);
  assert.equal(releases, 1);

  await assert.rejects(
    runEndpointAnalysisAttempt(jsId, sha256, operations),
    /fan-out queue unavailable/
  );
  assert.equal(persistedEndpoints.size, foundEndpoints.length);
  assert.equal(blobComplete, true);
  assert.equal(completedOccurrences, 0);

  const recovered = await runEndpointAnalysisAttempt(jsId, sha256, operations);
  assert.equal(recovered.deferred, false);
  assert.equal(fanOutAttempts, 2);
  assert.equal(completedOccurrences, 1);
  assert.equal(reads, 2);
  assert.equal(findAttempts, 2);
});

test("an occurrence defers while another worker owns the shared blob", async () => {
  let sideEffects = 0;
  const result = await runEndpointAnalysisAttempt(7, "b".repeat(64), {
    claimBlobAnalysis: async () => "busy",
    readBlob: async () => { sideEffects += 1; return Buffer.alloc(0); },
    findEndpoints: async () => { sideEffects += 1; return []; },
    persistEndpoints: async () => { sideEffects += 1; },
    loadPersistedEndpoints: async () => { sideEffects += 1; return []; },
    markBlobComplete: async () => { sideEffects += 1; },
    releaseBlobClaim: async () => { sideEffects += 1; },
    fanOut: async () => { sideEffects += 1; },
    markComplete: async () => { sideEffects += 1; },
  });

  assert.deepEqual(result, { found: 0, accepted: 0, deferred: true });
  assert.equal(sideEffects, 0);
});
