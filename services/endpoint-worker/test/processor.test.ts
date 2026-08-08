import assert from "node:assert/strict";
import test from "node:test";
import {
  MAX_ENDPOINT_BYTES,
  MAX_ENDPOINTS_PER_JS,
  extractHostname,
  isHostnameInScope,
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
