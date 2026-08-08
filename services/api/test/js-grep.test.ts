import assert from "node:assert/strict";
import test from "node:test";
import { setTimeout as delay } from "node:timers/promises";
import type {
  GrepBlob,
  GrepBlobReader,
  GrepOccurrence,
  GrepRepository,
  JsGrepCompleteResponse,
} from "../src/js-grep.js";
import {
  compileSafePattern,
  decodeGrepCursor,
  findMatchSnippet,
  isProgramBackedOccurrence,
  JsGrepError,
  JsGrepService,
} from "../src/js-grep.js";

class FakeRepository implements GrepRepository {
  readonly snapshot = 42;
  readonly blobs: GrepBlob[] = [
    { sha256: "hash-a", storageKey: "a", compression: "gzip" },
    { sha256: "hash-b", storageKey: "b", compression: "gzip" },
  ];
  readonly occurrences: GrepOccurrence[] = [
    {
      jsId: 3,
      sha256: "hash-a",
      jsUrl: "https://one.example/a.js",
      assetId: 10,
      domain: "one.example",
      scopeId: 7,
      scopeAsset: "*.example",
      scopeInScope: true,
      programId: 5,
      programName: "Example Program",
      programUrl: "https://platform.example/program",
      programPlatform: "hackerone",
    },
    {
      jsId: 8,
      sha256: "hash-a",
      jsUrl: "https://two.example/a.js",
      assetId: 11,
      domain: "two.example",
      scopeId: 7,
      scopeAsset: "*.example",
      scopeInScope: true,
      programId: 5,
      programName: "Example Program",
      programUrl: null,
      programPlatform: "hackerone",
    },
    {
      jsId: 12,
      sha256: "hash-a",
      jsUrl: "https://historical.test/a.js",
      assetId: 12,
      domain: "historical.test",
      scopeId: null,
      scopeAsset: null,
      scopeInScope: null,
      programId: null,
      programName: null,
      programUrl: null,
      programPlatform: null,
    },
    {
      jsId: 13,
      sha256: "hash-a",
      jsUrl: "https://out-of-scope.example/a.js",
      assetId: 13,
      domain: "out-of-scope.example",
      scopeId: 8,
      scopeAsset: "*.out-of-scope.example",
      scopeInScope: false,
      programId: 6,
      programName: "Out-of-scope Program",
      programUrl: "https://platform.example/out-of-scope",
      programPlatform: "hackerone",
    },
    {
      jsId: 14,
      sha256: "hash-a",
      jsUrl: "https://unnamed.example/a.js",
      assetId: 14,
      domain: "unnamed.example",
      scopeId: 9,
      scopeAsset: "*.unnamed.example",
      scopeInScope: true,
      programId: 7,
      programName: "   ",
      programUrl: "https://platform.example/unnamed",
      programPlatform: "hackerone",
    },
  ];
  snapshotCalls = 0;
  listBlobSnapshots: number[] = [];
  resolveSnapshots: number[] = [];
  pageIdCalls: number[][] = [];

  async getSnapshotMaxJsId(): Promise<number> {
    this.snapshotCalls += 1;
    return this.snapshot;
  }

  async listReferencedBlobs(snapshotMaxJsId: number): Promise<GrepBlob[]> {
    this.listBlobSnapshots.push(snapshotMaxJsId);
    return this.blobs;
  }

  async resolveOccurrences(
    hashesJson: string,
    snapshotMaxJsId: number
  ) {
    this.resolveSnapshots.push(snapshotMaxJsId);
    assert.deepEqual(JSON.parse(hashesJson), ["hash-a"]);
    const matchedHashes = new Set(JSON.parse(hashesJson) as string[]);
    const visible = this.occurrences.filter(
      (row) => matchedHashes.has(row.sha256) && isProgramBackedOccurrence(row)
    );
    return {
      occurrenceIds: Uint32Array.from(visible.map((row) => row.jsId)),
      totalResults: visible.length,
      totalHosts: new Set(visible.map((row) => row.assetId)).size,
      unassignedResults: 0,
      unassignedHosts: 0,
    };
  }

  async listOccurrencesByIds(jsIdsJson: string): Promise<GrepOccurrence[]> {
    const ids = JSON.parse(jsIdsJson) as number[];
    this.pageIdCalls.push(ids);
    const wanted = new Set(ids);
    return this.occurrences.filter((row) => wanted.has(row.jsId));
  }
}

class FakeReader implements GrepBlobReader {
  readonly attempts = new Map<string, number>();

  constructor(
    private readonly bodies: Record<string, string>,
    private readonly transientFailureKey?: string,
    private readonly permanentFailureKey?: string
  ) {}

  async get(storageKey: string): Promise<Buffer> {
    const attempts = (this.attempts.get(storageKey) ?? 0) + 1;
    this.attempts.set(storageKey, attempts);
    if (storageKey === this.permanentFailureKey) throw new Error("MinIO unavailable");
    if (storageKey === this.transientFailureKey && attempts === 1) {
      throw new Error("transient MinIO read");
    }
    return Buffer.from(this.bodies[storageKey] ?? "", "utf8");
  }
}

class AdvancingSnapshotRepository extends FakeRepository {
  override async getSnapshotMaxJsId(): Promise<number> {
    this.snapshotCalls += 1;
    return 41 + this.snapshotCalls;
  }
}

class BlockingReader implements GrepBlobReader {
  private releaseGate!: () => void;
  private readonly gate = new Promise<void>((resolve) => {
    this.releaseGate = resolve;
  });

  release(): void {
    this.releaseGate();
  }

  async get(storageKey: string): Promise<Buffer> {
    await this.gate;
    return Buffer.from(storageKey === "a" ? "react" : "none", "utf8");
  }
}

class AttributionDriftRepository extends FakeRepository {
  private driftNextPage = true;

  override async listOccurrencesByIds(jsIdsJson: string): Promise<GrepOccurrence[]> {
    const rows = await super.listOccurrencesByIds(jsIdsJson);
    if (!this.driftNextPage) return rows;
    this.driftNextPage = false;
    return rows.map((row) => ({
      ...row,
      scopeId: null,
      scopeAsset: null,
      scopeInScope: null,
      programId: null,
      programName: null,
      programUrl: null,
      programPlatform: null,
    }));
  }
}

class HangingReader implements GrepBlobReader {
  attempts = 0;

  async get(
    _storageKey: string,
    _compression: GrepBlob["compression"],
    signal?: AbortSignal
  ): Promise<Buffer> {
    this.attempts += 1;
    return new Promise((_resolve, reject) => {
      const abort = () => reject(signal?.reason ?? new Error("aborted"));
      if (signal?.aborted) abort();
      else signal?.addEventListener("abort", abort, { once: true });
    });
  }
}

async function pollComplete(
  service: JsGrepService,
  pattern: string,
  searchId: string,
  limit = 2
): Promise<JsGrepCompleteResponse> {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    const response = await service.search({ pattern, searchId, limit });
    if (response.statusCode === 200) return response.body;
    if (response.statusCode === 503) throw new Error(response.body.error);
    await delay(5);
  }
  throw new Error("grep did not complete in time");
}

test("RE2 validation rejects unsupported syntax and evaluates ambiguous patterns safely", () => {
  assert.throws(() => compileSafePattern("["), (error: unknown) => {
    return error instanceof JsGrepError && error.status === 400 && error.message === "invalid or unsupported regex";
  });
  assert.throws(() => compileSafePattern("a(?=b)"), /invalid or unsupported regex/);
  assert.throws(() => compileSafePattern("x".repeat(257)), /between 1 and 256/);
  assert.equal(compileSafePattern("react").test("React"), true);
  // The largest stored bundle is currently about 5.8 MB. Keep a regression
  // case above that size so the engine remains bounded and can handle it.
  assert.equal(compileSafePattern("(a|aa)+$").test(`${"a".repeat(6_000_000)}!`), false);
});

test("snippet reports original line/column and bounded relative highlight offsets", () => {
  const multiline = "first line\nconst token = React.createElement();\nthird line";
  const match = findMatchSnippet(multiline, compileSafePattern("react"), 120);
  assert.ok(match);
  assert.equal(match.lineNumber, 2);
  assert.equal(match.columnNumber, 15);
  assert.equal(match.snippet.slice(match.matchStart, match.matchEnd), "React");
  assert.equal(match.lineTruncated, false);

  const minified = `${"x".repeat(1_000)}React${"y".repeat(1_000)}`;
  const minifiedMatch = findMatchSnippet(minified, compileSafePattern("react"), 200);
  assert.ok(minifiedMatch);
  assert.equal(minifiedMatch.lineNumber, 1);
  assert.equal(minifiedMatch.columnNumber, 1_001);
  assert.equal(minifiedMatch.snippet.length, 200);
  assert.equal(
    minifiedMatch.snippet.slice(minifiedMatch.matchStart, minifiedMatch.matchEnd),
    "React"
  );
  assert.equal(minifiedMatch.lineTruncated, true);
  assert.ok(minifiedMatch.snippetStartColumn > 1);

  const unicode = "const café = '🚀 React';";
  const unicodeMatch = findMatchSnippet(unicode, compileSafePattern("react"), 120);
  assert.ok(unicodeMatch);
  assert.equal(unicodeMatch.columnNumber, unicode.indexOf("React") + 1);
  assert.equal(
    unicodeMatch.snippet.slice(unicodeMatch.matchStart, unicodeMatch.matchEnd),
    "React"
  );
});

test("program-backed eligibility requires a named program but not an in-scope flag or public URL", () => {
  const repository = new FakeRepository();
  assert.equal(isProgramBackedOccurrence(repository.occurrences[0]), true);
  assert.equal(isProgramBackedOccurrence(repository.occurrences[1]), true);
  assert.equal(repository.occurrences[1].programUrl, null);
  assert.equal(isProgramBackedOccurrence(repository.occurrences[2]), false);
  assert.equal(isProgramBackedOccurrence(repository.occurrences[3]), true);
  assert.equal(isProgramBackedOccurrence(repository.occurrences[4]), false);
});

test("full search excludes unassigned and unnamed hosts from totals and cursor pages", async () => {
  const repository = new FakeRepository();
  const reader = new FakeReader(
    { a: "header\nwindow.React = factory();\nfooter", b: "no signature here" },
    "a"
  );
  const service = new JsGrepService(repository, reader, {
    scanConcurrency: 2,
    cacheTtlMs: 30_000,
  });

  const started = await service.search({ pattern: "react", limit: 2 });
  assert.equal(started.statusCode, 202);
  assert.equal(started.body.status, "scanning");
  assert.equal(started.body.totalBlobs, 2);
  const first = await pollComplete(service, "react", started.body.searchId, 2);

  assert.equal(reader.attempts.get("a"), 2);
  assert.equal(first.snapshotMaxJsId, 42);
  assert.equal(first.scannedBlobs, 2);
  assert.equal(first.failedBlobs, 0);
  assert.equal(first.matchedBlobs, 1);
  assert.equal(first.totalResults, 3);
  assert.equal(first.totalHosts, 3);
  assert.equal(first.unassignedResults, 0);
  assert.equal(first.unassignedHosts, 0);
  assert.equal("occurrenceIds" in first, false);
  assert.equal("items" in first, false);
  assert.equal("matches" in first, false);
  assert.equal(first.results.length, 2);
  assert.equal(first.results[0].attribution, "scope");
  assert.equal(
    first.results[0].snippet.slice(first.results[0].matchStart, first.results[0].matchEnd),
    "React"
  );
  assert.ok(first.nextCursor);
  assert.equal(first.results[1].programUrl, null);
  assert.equal(decodeGrepCursor(first.nextCursor).afterJsId, 8);

  const next = await service.search({
    pattern: "react",
    cursor: first.nextCursor,
    limit: 2,
    force: true,
  });
  assert.equal(next.statusCode, 200);
  assert.equal(next.body.results.length, 1);
  assert.equal(next.body.results[0].domain, "out-of-scope.example");
  assert.equal(next.body.results[0].programName, "Out-of-scope Program");
  assert.equal(next.body.results[0].scopeInScope, false);
  assert.equal(next.body.results[0].attribution, "scope");
  assert.equal(next.body.nextCursor, null);
  assert.equal(
    [...first.results, ...next.body.results].some((row) => row.domain === "historical.test"),
    false
  );
  assert.deepEqual(repository.listBlobSnapshots, [42]);
  assert.deepEqual(repository.resolveSnapshots, [42]);
  assert.deepEqual(repository.pageIdCalls, [[3, 8], [13]]);
});

test("identical concurrent requests coalesce into one corpus scan", async () => {
  const repository = new FakeRepository();
  const reader = new FakeReader({ a: "react", b: "none" });
  const service = new JsGrepService(repository, reader, { scanConcurrency: 1 });

  const [one, two] = await Promise.all([
    service.search({ pattern: "react" }),
    service.search({ pattern: "react" }),
  ]);
  assert.equal(one.statusCode, 202);
  assert.equal(two.statusCode, 202);
  assert.equal(one.body.searchId, two.body.searchId);
  assert.equal(repository.snapshotCalls, 1);
});

test("force refresh replaces a completed pattern snapshot but not ID-based polling", async () => {
  const repository = new AdvancingSnapshotRepository();
  const service = new JsGrepService(
    repository,
    new FakeReader({ a: "react", b: "none" }),
    { scanConcurrency: 1 }
  );

  const firstStart = await service.search({ pattern: "react", force: true });
  assert.equal(firstStart.statusCode, 202);
  const first = await pollComplete(service, "react", firstStart.body.searchId, 1);
  assert.equal(first.snapshotMaxJsId, 42);

  const stablePoll = await service.search({
    pattern: "react",
    searchId: first.searchId,
    force: true,
    limit: 1,
  });
  assert.equal(stablePoll.statusCode, 200);
  assert.equal(stablePoll.body.searchId, first.searchId);
  assert.equal(stablePoll.body.snapshotMaxJsId, 42);
  assert.equal(repository.snapshotCalls, 1);

  const refreshedStart = await service.search({ pattern: "react", force: true });
  assert.equal(refreshedStart.statusCode, 202);
  assert.notEqual(refreshedStart.body.searchId, first.searchId);
  assert.equal(refreshedStart.body.snapshotMaxJsId, 43);
  assert.equal(repository.snapshotCalls, 2);

  const refreshed = await pollComplete(
    service,
    "react",
    refreshedStart.body.searchId,
    1
  );
  assert.equal(refreshed.snapshotMaxJsId, 43);
});

test("force refresh coalesces an already running same-pattern scan", async () => {
  const repository = new FakeRepository();
  const reader = new BlockingReader();
  const service = new JsGrepService(repository, reader, { scanConcurrency: 1 });

  const started = await service.search({ pattern: "react", force: true });
  assert.equal(started.statusCode, 202);

  const duplicateManualSearch = await service.search({ pattern: "react", force: true });
  assert.equal(duplicateManualSearch.statusCode, 202);
  assert.equal(duplicateManualSearch.body.searchId, started.body.searchId);

  const poll = await service.search({
    pattern: "react",
    searchId: started.body.searchId,
    force: true,
  });
  assert.equal(poll.statusCode, 202);
  assert.equal(poll.body.searchId, started.body.searchId);
  assert.equal(repository.snapshotCalls, 1);

  reader.release();
  const completed = await pollComplete(service, "react", started.body.searchId, 1);
  assert.equal(completed.searchId, started.body.searchId);
  assert.equal(repository.snapshotCalls, 1);
});

test("pagination refuses rows whose program attribution changed after resolution", async () => {
  const repository = new AttributionDriftRepository();
  const service = new JsGrepService(
    repository,
    new FakeReader({ a: "react", b: "none" }),
    { scanConcurrency: 1 }
  );
  const started = await service.search({ pattern: "react", limit: 1 });
  assert.equal(started.statusCode, 202);

  let caught: unknown;
  for (let attempt = 0; attempt < 100; attempt += 1) {
    try {
      await service.search({
        pattern: "react",
        searchId: started.body.searchId,
        limit: 1,
      });
    } catch (error) {
      caught = error;
      break;
    }
    await delay(5);
  }

  assert.ok(caught instanceof JsGrepError);
  assert.equal(caught.status, 503);
  assert.match(caught.message, /attribution changed/);

  const restarted = await service.search({ pattern: "react", limit: 1 });
  assert.equal(restarted.statusCode, 202);
  assert.notEqual(restarted.body.searchId, started.body.searchId);
  assert.equal(repository.snapshotCalls, 2);
  const recovered = await pollComplete(
    service,
    "react",
    restarted.body.searchId,
    1
  );
  assert.equal(recovered.results[0].domain, "one.example");
  assert.equal(recovered.results[0].attribution, "scope");
});

test("expired search IDs fail explicitly instead of silently changing snapshot", async () => {
  let now = 1_000;
  const repository = new FakeRepository();
  const service = new JsGrepService(
    repository,
    new FakeReader({ a: "react", b: "none" }),
    { cacheTtlMs: 1_000, now: () => now }
  );
  const started = await service.search({ pattern: "react" });
  assert.equal(started.statusCode, 202);
  await pollComplete(service, "react", started.body.searchId);

  now += 1_001;
  await assert.rejects(
    () => service.search({ pattern: "react", searchId: started.body.searchId }),
    (error: unknown) => error instanceof JsGrepError && error.status === 410
  );
});

test("a permanently unreadable blob fails the session after retries; no partial totals are returned", async () => {
  const repository = new FakeRepository();
  const reader = new FakeReader({ a: "react", b: "none" }, undefined, "b");
  const service = new JsGrepService(repository, reader, { scanConcurrency: 2 });
  const started = await service.search({ pattern: "react" });
  assert.equal(started.statusCode, 202);

  let failed = null;
  for (let attempt = 0; attempt < 100; attempt += 1) {
    const response = await service.search({ pattern: "react", searchId: started.body.searchId });
    if (response.statusCode === 503) {
      failed = response.body;
      break;
    }
    await delay(10);
  }
  assert.ok(failed);
  assert.equal(failed.status, "failed");
  assert.equal(failed.retryable, true);
  assert.equal(failed.failedBlobs, 1);
  assert.equal(reader.attempts.get("b"), 3);
  assert.equal(repository.resolveSnapshots.length, 0);
});

test("a stalled blob read is aborted and fails instead of hanging the API session", async () => {
  const repository = new FakeRepository();
  const reader = new HangingReader();
  const service = new JsGrepService(repository, reader, {
    scanConcurrency: 1,
    blobReadTimeoutMs: 10,
  });
  const started = await service.search({ pattern: "react" });
  assert.equal(started.statusCode, 202);

  let failed = null;
  for (let attempt = 0; attempt < 100; attempt += 1) {
    const response = await service.search({ pattern: "react", searchId: started.body.searchId });
    if (response.statusCode === 503) {
      failed = response.body;
      break;
    }
    await delay(10);
  }
  assert.ok(failed);
  assert.equal(failed.status, "failed");
  assert.equal(reader.attempts, 3);
  assert.equal(repository.resolveSnapshots.length, 0);
});
