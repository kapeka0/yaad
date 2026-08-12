import assert from "node:assert/strict";
import test from "node:test";
import {
  buildEndpointAnalysisJobs,
  buildEndpointRecoveryJobs,
  buildUnresolvedRecoveryJobs,
} from "../src/refresher.js";

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

test("unresolved recovery uses the shared six-hour asset scan ID", () => {
  const rows = [{ id: 42, domain: "v0.app" }];
  const first = buildUnresolvedRecoveryJobs(
    rows,
    new Date(0),
    6
  );
  const duplicate = buildUnresolvedRecoveryJobs(
    rows,
    new Date(5 * 60 * 60 * 1000),
    6
  );
  const later = buildUnresolvedRecoveryJobs(
    rows,
    new Date(6 * 60 * 60 * 1000),
    6
  );

  assert.equal(first[0]?.opts.jobId, duplicate[0]?.opts.jobId);
  assert.notEqual(first[0]?.opts.jobId, later[0]?.opts.jobId);
});

test("endpoint analysis IDs rotate by retry bucket", () => {
  const rows = [{ id: 42, url: "https://example.com/app.js" }];
  const first = buildEndpointAnalysisJobs(rows, 10);
  const duplicate = buildEndpointAnalysisJobs(rows, 10);
  const later = buildEndpointAnalysisJobs(rows, 11);

  assert.deepEqual(duplicate, first);
  assert.equal(first[0]?.opts.jobId, "scheduler-analyze-js-42-10");
  assert.equal(later[0]?.opts.jobId, "scheduler-analyze-js-42-11");
});
