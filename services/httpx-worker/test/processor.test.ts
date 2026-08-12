import assert from "node:assert/strict";
import test from "node:test";
import { requireLiveHttpResults } from "../src/processor.js";

test("an empty httpx result remains retryable", () => {
  assert.throws(
    () => requireLiveHttpResults([], "v0.app"),
    /No live HTTP service found for v0[.]app/
  );
});

test("a live HTTP response is accepted even when no IP was reported", () => {
  assert.doesNotThrow(() =>
    requireLiveHttpResults(
      [{ url: "https://v0.app", input: "v0.app", statusCode: 200 }],
      "v0.app"
    )
  );
});
