export * from "./queues.js";
export * from "./jobs.js";
export * from "./connection.js";
export * from "./shutdown.js";

import type { JobsOptions, WorkerOptions } from "bullmq";

const JOB_RETENTION = {
  removeOnComplete: {
    age: 24 * 60 * 60,
    count: 1_000,
  },
  removeOnFail: {
    age: 7 * 24 * 60 * 60,
    count: 5_000,
  },
} satisfies Pick<WorkerOptions, "removeOnComplete" | "removeOnFail">;

// Worker-level retention also covers jobs that were queued before the current
// producer defaults were deployed.
export const DEFAULT_WORKER_OPTIONS: Pick<
  WorkerOptions,
  "removeOnComplete" | "removeOnFail"
> = JOB_RETENTION;

export const DEFAULT_JOB_OPTIONS: JobsOptions = {
  attempts: 3,
  backoff: {
    type: "exponential",
    delay: 5000,
  },
  // BullMQ keeps job hashes forever unless retention is explicit. On a
  // long-running scanner that grows Redis by millions of keys and several GB.
  ...JOB_RETENTION,
};
