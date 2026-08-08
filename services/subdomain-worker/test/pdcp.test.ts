import assert from "node:assert/strict";
import test from "node:test";
import { getSubdomainsFromPDCP } from "../src/pdcp.js";

test("PDCP requests carry a timeout signal", async () => {
  const originalFetch = globalThis.fetch;
  let receivedSignal: AbortSignal | null | undefined;

  globalThis.fetch = async (_input, init) => {
    receivedSignal = init?.signal;
    return new Response(JSON.stringify({ domains: [] }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  };

  try {
    assert.deepEqual(await getSubdomainsFromPDCP("example.com", "secret"), []);
    assert.ok(receivedSignal instanceof AbortSignal);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
