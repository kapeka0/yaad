import assert from "node:assert/strict";
import test from "node:test";
import type { Queue } from "bullmq";
import type { Db } from "@yaad/db";
import type { EnumerateSubdomainsJob, ScanHttpJob } from "@yaad/queue";
import {
  processEnumerateSubdomains,
  type EnumerationDependencies,
} from "../src/processor.js";

const opts = {
  pdcpApiKey: "test-key",
  crtShEnabled: true,
  gauEnabled: true,
  subfinderDeep: false,
  maxScanQueueDepth: 100,
};

type Scope = Awaited<ReturnType<EnumerationDependencies["loadScope"]>>;

function guardedDependencies(scope: Scope) {
  let scopeLoads = 0;
  let externalCalls = 0;
  const unexpectedExternalCall = async (): Promise<string[]> => {
    externalCalls += 1;
    throw new Error("external enumeration must not run for a rejected job");
  };

  const deps: EnumerationDependencies = {
    loadScope: async () => {
      scopeLoads += 1;
      return scope;
    },
    runSubfinder: unexpectedExternalCall,
    getCrtSh: unexpectedExternalCall,
    runGau: unexpectedExternalCall,
    resolveHosts: async () => {
      externalCalls += 1;
      throw new Error("DNS resolution must not run for a rejected job");
    },
    getSubdomainsFromPDCP: unexpectedExternalCall,
  };

  return {
    deps,
    counts: () => ({ scopeLoads, externalCalls }),
  };
}

const inertDb = {} as Db;
const inertScanQueue = {} as Queue<ScanHttpJob>;

const cases: Array<{
  name: string;
  job: EnumerateSubdomainsJob;
  scope: Scope;
  expectedScopeLoads: number;
}> = [
  {
    name: "rejects an unscoped historical job",
    job: { domain: "example.com", scopeId: null },
    scope: null,
    expectedScopeLoads: 0,
  },
  {
    name: "rejects a job whose scope no longer exists",
    job: { domain: "example.com", scopeId: 41 },
    scope: null,
    expectedScopeLoads: 1,
  },
  {
    name: "rejects an out-of-scope scope",
    job: { domain: "example.com", scopeId: 42 },
    scope: { asset: "*.example.com", wildcard: true, inScope: false },
    expectedScopeLoads: 1,
  },
  {
    name: "rejects a scope that is no longer wildcard",
    job: { domain: "example.com", scopeId: 43 },
    scope: { asset: "example.com", wildcard: false, inScope: true },
    expectedScopeLoads: 1,
  },
  {
    name: "rejects a malformed wildcard scope",
    job: { domain: "example.com", scopeId: 44 },
    scope: { asset: "*.example.(com|net)", wildcard: true, inScope: true },
    expectedScopeLoads: 1,
  },
  {
    name: "rejects a target outside the active scope",
    job: { domain: "unrelated.test", scopeId: 45, depth: 1 },
    scope: { asset: "*.example.com", wildcard: true, inScope: true },
    expectedScopeLoads: 1,
  },
  {
    name: "rejects a malformed target hostname",
    job: { domain: "example.com/path", scopeId: 46 },
    scope: { asset: "*.example.com", wildcard: true, inScope: true },
    expectedScopeLoads: 1,
  },
];

for (const entry of cases) {
  test(entry.name, async () => {
    const { deps, counts } = guardedDependencies(entry.scope);

    await processEnumerateSubdomains(
      { data: entry.job },
      inertDb,
      inertScanQueue,
      opts,
      deps
    );

    assert.deepEqual(counts(), {
      scopeLoads: entry.expectedScopeLoads,
      externalCalls: 0,
    });
  });
}
