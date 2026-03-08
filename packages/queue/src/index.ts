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
};
