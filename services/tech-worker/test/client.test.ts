import assert from "node:assert/strict";
import test from "node:test";
import { detectTechnologies } from "../src/client.js";

const detectedResponse = () =>
  new Response(
    JSON.stringify({
      technologies: [
        { name: "React", version: "19", icon: "React.svg", confidence: 100 },
        { name: "Weak signal", confidence: 25 },
      ],
    }),
    { status: 200, headers: { "Content-Type": "application/json" } },
  );

test("backs off a network outage without consuming multiple queue jobs", async () => {
  let calls = 0;
  const delays: number[] = [];
  const result = await detectTechnologies("http://cultivate", "https://example.com", 50, {
    fetchImpl: async () => {
      calls += 1;
      if (calls < 3) throw new TypeError("fetch failed");
      return detectedResponse();
    },
    retryDelaysMs: [10, 20, 40],
    wait: async (delayMs) => {
      delays.push(delayMs);
    },
  });

  assert.equal(calls, 3);
  assert.deepEqual(delays, [10, 20]);
  assert.deepEqual(result, [{ name: "React", version: "19", icon: "React.svg" }]);
});

test("retries temporary service-unavailable responses", async () => {
  let calls = 0;
  const result = await detectTechnologies("http://cultivate", "https://example.com", 0, {
    fetchImpl: async () => {
      calls += 1;
      return calls === 1 ? new Response(null, { status: 503 }) : detectedResponse();
    },
    retryDelaysMs: [1],
    wait: async () => undefined,
  });

  assert.equal(calls, 2);
  assert.equal(result[0]?.name, "React");
});

test("does not hide permanent HTTP failures", async () => {
  let calls = 0;

  await assert.rejects(
    detectTechnologies("http://cultivate", "https://example.com", 0, {
      fetchImpl: async () => {
        calls += 1;
        return new Response(null, { status: 400, statusText: "Bad Request" });
      },
      retryDelaysMs: [1, 2],
      wait: async () => undefined,
    }),
    /cultivate-api error: 400 Bad Request/,
  );

  assert.equal(calls, 1);
});

test("leaves analysis timeouts to BullMQ's outer retry policy", async () => {
  let calls = 0;
  const timeout = new Error("timed out");
  timeout.name = "TimeoutError";

  await assert.rejects(
    detectTechnologies("http://cultivate", "https://example.com", 0, {
      fetchImpl: async () => {
        calls += 1;
        throw timeout;
      },
      retryDelaysMs: [1, 2],
      wait: async () => undefined,
    }),
    timeout,
  );

  assert.equal(calls, 1);
});
