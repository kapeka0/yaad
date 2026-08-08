import assert from "node:assert/strict";
import test from "node:test";
import { getEndpointAnalysisJobId, isJavascriptFetchComplete } from "../src/processor.js";

test("blob-backed JavaScript is complete only after fetch and blob association", () => {
  assert.equal(
    isJavascriptFetchComplete({ fetchedAt: null, sha256: null }, true),
    false
  );
  assert.equal(
    isJavascriptFetchComplete({ fetchedAt: new Date(), sha256: null }, true),
    false
  );
  assert.equal(
    isJavascriptFetchComplete({ fetchedAt: new Date(), sha256: "abc" }, true),
    true
  );
});

test("light mode only requires successful fetch persistence", () => {
  assert.equal(
    isJavascriptFetchComplete({ fetchedAt: new Date(), sha256: null }, false),
    true
  );
});

test("analysis job IDs are stable within a day and rotate for recovery", () => {
  assert.equal(
    getEndpointAnalysisJobId(42, new Date("2026-08-08T23:59:59Z")),
    "analyze-js-42-20260808"
  );
  assert.equal(
    getEndpointAnalysisJobId(42, new Date("2026-08-09T00:00:00Z")),
    "analyze-js-42-20260809"
  );
});
