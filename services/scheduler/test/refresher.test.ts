import assert from "node:assert/strict";
import test from "node:test";
import { buildEndpointRecoveryJobs } from "../src/refresher.js";

test("endpoint recovery IDs are stable within a retry bucket and rotate later", () => {
  const scanRows = [{ id: 7, domain: "api.example.com" }];
  const techRows = [{ id: 7, url: "https://api.example.com/v1" }];
  const first = buildEndpointRecoveryJobs(scanRows, techRows, 10);
  const duplicate = buildEndpointRecoveryJobs(scanRows, techRows, 10);
  const later = buildEndpointRecoveryJobs(scanRows, techRows, 11);

  assert.deepEqual(duplicate, first);
  assert.equal(first.scanJobs[0]?.opts.jobId, "endpoint-recovery-scan-7-10");
  assert.equal(first.techJobs[0]?.opts.jobId, "endpoint-recovery-tech-7-10");
  assert.equal(later.scanJobs[0]?.opts.jobId, "endpoint-recovery-scan-7-11");
  assert.equal(later.techJobs[0]?.opts.jobId, "endpoint-recovery-tech-7-11");
});
