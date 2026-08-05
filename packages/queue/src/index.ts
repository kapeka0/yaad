export * from "./queues.js";
export * from "./jobs.js";
export * from "./connection.js";

import type { JobsOptions } from "bullmq";

export const DEFAULT_JOB_OPTIONS: JobsOptions = {
  attempts: 3,
  backoff: {
    type: "exponential",
    delay: 5000,
  },
  // BullMQ keeps job hashes forever unless retention is explicit. On a
  // long-running scanner that grows Redis by millions of keys and several GB.
  removeOnComplete: {
    age: 24 * 60 * 60,
    count: 1_000,
  },
  removeOnFail: {
    age: 7 * 24 * 60 * 60,
    count: 5_000,
  },
};
