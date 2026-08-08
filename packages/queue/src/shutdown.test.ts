import assert from "node:assert/strict";
import test from "node:test";
import { closeResourcesInOrder } from "./shutdown.js";

test("closes workers before their producer queues", async () => {
  const events: string[] = [];
  const failures = await closeResourcesInOrder([
    {
      async close() {
        events.push("worker:start");
        await new Promise((resolve) => setTimeout(resolve, 5));
        events.push("worker:end");
      },
    },
    {
      async close() {
        events.push("queue:start");
        events.push("queue:end");
      },
    },
  ]);

  assert.deepEqual(events, ["worker:start", "worker:end", "queue:start", "queue:end"]);
  assert.deepEqual(failures, []);
});

test("attempts later closes after an earlier failure", async () => {
  const expected = new Error("worker close failed");
  let queueClosed = false;
  const failures = await closeResourcesInOrder([
    { async close() { throw expected; } },
    { async close() { queueClosed = true; } },
  ]);

  assert.equal(queueClosed, true);
  assert.deepEqual(failures, [expected]);
});
