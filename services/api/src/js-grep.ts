import { randomUUID } from "node:crypto";
import { setTimeout as delay } from "node:timers/promises";
import type { Compression } from "@yaad/storage";
import type { Db } from "@yaad/db";
import { sql } from "drizzle-orm";
import RE2 from "re2";

const DEFAULT_PAGE_SIZE = 50;
const MAX_PAGE_SIZE = 200;
const DEFAULT_CACHE_TTL_MS = 30 * 60 * 1000;
const DEFAULT_MAX_SESSIONS = 4;
const DEFAULT_SCAN_CONCURRENCY = 4;
const DEFAULT_BLOB_READ_TIMEOUT_MS = 30_000;
const MAX_PATTERN_LENGTH = 256;
const DEFAULT_SNIPPET_LENGTH = 500;

export interface GrepBlob {
  sha256: string;
  storageKey: string;
  compression: Compression;
}

export interface GrepCounts {
  totalResults: number;
  totalHosts: number;
  unassignedResults: number;
  unassignedHosts: number;
}

export interface GrepOccurrence {
  jsId: number;
  sha256: string;
  jsUrl: string;
  assetId: number;
  domain: string;
  scopeId: number | null;
  scopeAsset: string | null;
  scopeInScope: boolean | null;
  programId: number | null;
  programName: string | null;
  programUrl: string | null;
  programPlatform: string | null;
}

export interface GrepResolution extends GrepCounts {
  occurrenceIds: Uint32Array;
}

export interface GrepRepository {
  getSnapshotMaxJsId(): Promise<number>;
  listReferencedBlobs(snapshotMaxJsId: number): Promise<GrepBlob[]>;
  resolveOccurrences(
    matchedHashesJson: string,
    snapshotMaxJsId: number
  ): Promise<GrepResolution>;
  listOccurrencesByIds(
    jsIdsJson: string
  ): Promise<GrepOccurrence[]>;
}

export interface GrepBlobReader {
  get(storageKey: string, compression: Compression, signal?: AbortSignal): Promise<Buffer>;
}

export interface MatchSnippet {
  /** A bounded fragment of the matching source line. */
  snippet: string;
  /** Backwards-friendly alias for snippet; it is never the unbounded full line. */
  line: string;
  /** One-based line and column in the original JavaScript body. */
  lineNumber: number;
  columnNumber: number;
  /** Zero-based, half-open offsets relative to snippet/line. */
  matchStart: number;
  matchEnd: number;
  matchText: string;
  lineTruncated: boolean;
  /** One-based source column represented by snippet[0]. */
  snippetStartColumn: number;
}

export interface GrepResult extends GrepOccurrence, MatchSnippet {
  attribution: "scope" | "unassigned";
}

interface GrepSession {
  id: string;
  pattern: string;
  status: "queued" | "scanning" | "complete" | "failed";
  snapshotMaxJsId: number;
  createdAt: number;
  lastAccessedAt: number;
  totalBlobs: number;
  scannedBlobs: number;
  failedBlobs: number;
  matchesByHash: Map<string, MatchSnippet>;
  occurrenceIds: Uint32Array;
  counts: GrepCounts;
  error?: string;
}

export class JsGrepError extends Error {
  constructor(
    message: string,
    readonly status: 400 | 410 | 429 | 503
  ) {
    super(message);
    this.name = "JsGrepError";
  }
}

export interface JsGrepServiceOptions {
  cacheTtlMs?: number;
  maxSessions?: number;
  scanConcurrency?: number;
  snippetLength?: number;
  blobReadTimeoutMs?: number;
  now?: () => number;
}

interface CursorPayload {
  v: 1;
  sessionId: string;
  afterJsId: number;
}

export interface JsGrepRequest {
  pattern: string;
  searchId?: string;
  cursor?: string;
  limit?: number;
}

export interface JsGrepProgressResponse {
  status: "scanning";
  phase: "queued" | "scanning";
  searchId: string;
  scannedBlobs: number;
  failedBlobs: number;
  totalBlobs: number;
  matchedBlobs: number;
  progress: number;
  snapshotMaxJsId: number;
}

export interface JsGrepCompleteResponse extends GrepCounts {
  status: "complete";
  searchId: string;
  scannedBlobs: number;
  failedBlobs: number;
  scanned: number;
  totalBlobs: number;
  matchedBlobs: number;
  snapshotMaxJsId: number;
  total: number;
  results: GrepResult[];
  nextCursor: string | null;
  hasMore: boolean;
}

export interface JsGrepFailedResponse {
  status: "failed";
  searchId: string;
  scannedBlobs: number;
  failedBlobs: number;
  totalBlobs: number;
  error: string;
  retryable: true;
}

export type JsGrepResponse =
  | { statusCode: 202; body: JsGrepProgressResponse }
  | { statusCode: 200; body: JsGrepCompleteResponse }
  | { statusCode: 503; body: JsGrepFailedResponse };

/** Compile hunts with RE2 so runtime stays linear on multi-megabyte bundles. */
export function compileSafePattern(pattern: string): RE2 {
  if (!pattern || pattern.length > MAX_PATTERN_LENGTH) {
    throw new JsGrepError(`q must contain between 1 and ${MAX_PATTERN_LENGTH} characters`, 400);
  }

  try {
    // RE2 intentionally rejects backreferences and lookarounds, the
    // constructs that cannot be bounded by its linear-time execution model.
    return new RE2(pattern, "iu");
  } catch {
    throw new JsGrepError("invalid or unsupported regex", 400);
  }
}

function countNewlinesBefore(source: string, offset: number): number {
  let count = 0;
  let cursor = source.indexOf("\n");
  while (cursor !== -1 && cursor < offset) {
    count += 1;
    cursor = source.indexOf("\n", cursor + 1);
  }
  return count;
}

export function findMatchSnippet(
  source: string,
  regex: RE2,
  maxLength = DEFAULT_SNIPPET_LENGTH
): MatchSnippet | null {
  regex.lastIndex = 0;
  const match = regex.exec(source);
  if (!match || match.index === undefined) return null;

  const matchAbsoluteStart = match.index;
  const matchedText = match[0] ?? "";
  const matchAbsoluteEnd = match.index + matchedText.length;
  const lineStart = source.lastIndexOf("\n", matchAbsoluteStart - 1) + 1;
  const newline = source.indexOf("\n", matchAbsoluteStart);
  let lineEnd = newline === -1 ? source.length : newline;
  if (lineEnd > lineStart && source[lineEnd - 1] === "\r") lineEnd -= 1;

  const matchStartInLine = Math.max(0, matchAbsoluteStart - lineStart);
  const matchEndInLine = Math.max(matchStartInLine, Math.min(lineEnd, matchAbsoluteEnd) - lineStart);
  const rawLineLength = Math.max(0, lineEnd - lineStart);
  const boundedLength = Math.max(80, maxLength);
  const contextBefore = Math.min(160, Math.floor(boundedLength / 3));

  let snippetStartInLine = Math.max(0, matchStartInLine - contextBefore);
  if (snippetStartInLine + boundedLength > rawLineLength) {
    snippetStartInLine = Math.max(0, rawLineLength - boundedLength);
  }
  const snippetEndInLine = Math.min(rawLineLength, snippetStartInLine + boundedLength);
  const snippet = source.slice(lineStart + snippetStartInLine, lineStart + snippetEndInLine);

  return {
    snippet,
    line: snippet,
    lineNumber: countNewlinesBefore(source, matchAbsoluteStart) + 1,
    columnNumber: matchStartInLine + 1,
    matchStart: Math.max(0, Math.min(snippet.length, matchStartInLine - snippetStartInLine)),
    matchEnd: Math.max(
      0,
      Math.min(snippet.length, matchEndInLine - snippetStartInLine)
    ),
    matchText: matchedText.slice(0, 256),
    lineTruncated: snippetStartInLine > 0 || snippetEndInLine < rawLineLength,
    snippetStartColumn: snippetStartInLine + 1,
  };
}

export function encodeGrepCursor(sessionId: string, afterJsId: number): string {
  const payload: CursorPayload = { v: 1, sessionId, afterJsId };
  return Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
}

export function decodeGrepCursor(cursor: string): CursorPayload {
  if (!cursor || cursor.length > 512 || !/^[A-Za-z0-9_-]+$/.test(cursor)) {
    throw new JsGrepError("invalid cursor", 400);
  }
  try {
    const value = JSON.parse(Buffer.from(cursor, "base64url").toString("utf8")) as Partial<CursorPayload>;
    if (
      value.v !== 1 ||
      typeof value.sessionId !== "string" ||
      !/^[0-9a-f-]{36}$/i.test(value.sessionId) ||
      !Number.isSafeInteger(value.afterJsId) ||
      (value.afterJsId ?? -1) < 0
    ) {
      throw new Error("bad payload");
    }
    return value as CursorPayload;
  } catch {
    throw new JsGrepError("invalid cursor", 400);
  }
}

export class GrepSessionCache {
  private readonly sessions = new Map<string, GrepSession>();
  private readonly byPattern = new Map<string, string>();

  constructor(
    private readonly ttlMs = DEFAULT_CACHE_TTL_MS,
    private readonly maxSessions = DEFAULT_MAX_SESSIONS,
    private readonly now: () => number = Date.now
  ) {}

  private remove(session: GrepSession): void {
    this.sessions.delete(session.id);
    if (this.byPattern.get(session.pattern) === session.id) this.byPattern.delete(session.pattern);
  }

  private purgeExpired(): void {
    const now = this.now();
    for (const session of this.sessions.values()) {
      if (
        session.status !== "queued" &&
        session.status !== "scanning" &&
        now - session.lastAccessedAt >= this.ttlMs
      ) {
        this.remove(session);
      }
    }
  }

  private touch(session: GrepSession): GrepSession {
    session.lastAccessedAt = this.now();
    this.sessions.delete(session.id);
    this.sessions.set(session.id, session);
    return session;
  }

  get(id: string): GrepSession | undefined {
    this.purgeExpired();
    const session = this.sessions.get(id);
    return session ? this.touch(session) : undefined;
  }

  getByPattern(pattern: string): GrepSession | undefined {
    this.purgeExpired();
    const id = this.byPattern.get(pattern);
    if (!id) return undefined;
    const session = this.sessions.get(id);
    return session ? this.touch(session) : undefined;
  }

  delete(id: string): void {
    const session = this.sessions.get(id);
    if (session) this.remove(session);
  }

  add(session: GrepSession): void {
    this.purgeExpired();
    const previousId = this.byPattern.get(session.pattern);
    if (previousId) {
      const previous = this.sessions.get(previousId);
      if (previous && previous.status !== "queued" && previous.status !== "scanning") {
        this.remove(previous);
      }
    }

    while (this.sessions.size >= this.maxSessions) {
      const evictable = [...this.sessions.values()].find(
        (candidate) => candidate.status !== "queued" && candidate.status !== "scanning"
      );
      if (!evictable) {
        throw new JsGrepError("grep capacity is busy; retry after a running search finishes", 429);
      }
      this.remove(evictable);
    }
    this.sessions.set(session.id, session);
    this.byPattern.set(session.pattern, session.id);
  }
}

export class DrizzleGrepRepository implements GrepRepository {
  constructor(private readonly db: Db) {}

  async getSnapshotMaxJsId(): Promise<number> {
    const rows = await this.db.execute(sql<{ maxJsId: number | string | null }>`
      SELECT coalesce(max(id), 0) AS "maxJsId"
      FROM javascript_files
    `);
    return Number(rows[0]?.maxJsId ?? 0);
  }

  async listReferencedBlobs(snapshotMaxJsId: number): Promise<GrepBlob[]> {
    const rows = await this.db.execute(sql<{
      sha256: string;
      storageKey: string;
      compression: string;
    }>`
      SELECT
        jb.sha256 AS "sha256",
        jb.storage_key AS "storageKey",
        jb.compression AS "compression"
      FROM js_blobs AS jb
      WHERE EXISTS (
        SELECT 1
        FROM javascript_files AS jf
        WHERE jf.sha256 = jb.sha256
          AND jf.id <= ${snapshotMaxJsId}
      )
      ORDER BY jb.sha256
    `);
    return [...rows].map((raw) => {
      const row = raw as unknown as {
        sha256: string;
        storageKey: string;
        compression: string;
      };
      return {
        sha256: row.sha256,
        storageKey: row.storageKey,
        compression: row.compression as Compression,
      };
    });
  }

  async resolveOccurrences(
    matchedHashesJson: string,
    snapshotMaxJsId: number
  ): Promise<GrepResolution> {
    if (matchedHashesJson === "[]") {
      return {
        occurrenceIds: new Uint32Array(),
        totalResults: 0,
        totalHosts: 0,
        unassignedResults: 0,
        unassignedHosts: 0,
      };
    }
    const rows = await this.db.execute(sql<{
      occurrenceIds: number[];
      totalResults: number | string;
      totalHosts: number | string;
      unassignedResults: number | string;
      unassignedHosts: number | string;
    }>`
      WITH matched_hashes AS MATERIALIZED (
        SELECT value AS sha256
        FROM jsonb_array_elements_text(${matchedHashesJson}::jsonb) AS hashes(value)
      ),
      matching_files AS MATERIALIZED (
        SELECT jf.id, jf.service_id
        FROM matched_hashes AS mh
        CROSS JOIN LATERAL (
          -- OFFSET 0 intentionally keeps this as an indexed lookup per hash.
          -- PostgreSQL otherwise estimates jsonb_array_elements_text at 100
          -- rows and may scan the 1M+ row javascript_files table instead.
          SELECT id, service_id
          FROM javascript_files
          WHERE sha256 = mh.sha256
            AND id <= ${snapshotMaxJsId}
          OFFSET 0
        ) AS jf
      )
      SELECT
        coalesce(array_agg(jf.id ORDER BY jf.id), '{}') AS "occurrenceIds",
        count(jf.id) AS "totalResults",
        count(DISTINCT a.id) AS "totalHosts",
        count(jf.id) FILTER (WHERE a.scope_id IS NULL) AS "unassignedResults",
        count(DISTINCT a.id) FILTER (WHERE a.scope_id IS NULL) AS "unassignedHosts"
      FROM matching_files AS jf
      CROSS JOIN LATERAL (
        SELECT asset_id
        FROM web_services
        WHERE id = jf.service_id
        OFFSET 0
      ) AS ws
      CROSS JOIN LATERAL (
        SELECT id, scope_id
        FROM assets
        WHERE id = ws.asset_id
        OFFSET 0
      ) AS a
    `);
    const row = rows[0] as unknown as {
      occurrenceIds?: number[];
      totalResults?: number | string;
      totalHosts?: number | string;
      unassignedResults?: number | string;
      unassignedHosts?: number | string;
    };
    return {
      occurrenceIds: Uint32Array.from(row?.occurrenceIds ?? [], Number),
      totalResults: Number(row?.totalResults ?? 0),
      totalHosts: Number(row?.totalHosts ?? 0),
      unassignedResults: Number(row?.unassignedResults ?? 0),
      unassignedHosts: Number(row?.unassignedHosts ?? 0),
    };
  }

  async listOccurrencesByIds(jsIdsJson: string): Promise<GrepOccurrence[]> {
    if (jsIdsJson === "[]") return [];
    const rows = await this.db.execute(sql<GrepOccurrence>`
      WITH selected_ids AS MATERIALIZED (
        SELECT value::integer AS id
        FROM jsonb_array_elements_text(${jsIdsJson}::jsonb) AS ids(value)
      )
      SELECT
        jf.id AS "jsId",
        jf.sha256 AS "sha256",
        jf.url AS "jsUrl",
        a.id AS "assetId",
        a.domain AS "domain",
        s.id AS "scopeId",
        s.asset AS "scopeAsset",
        s.in_scope AS "scopeInScope",
        p.id AS "programId",
        p.name AS "programName",
        p.url AS "programUrl",
        p.platform AS "programPlatform"
      FROM selected_ids AS selected
      CROSS JOIN LATERAL (
        SELECT id, sha256, url, service_id
        FROM javascript_files
        WHERE id = selected.id
        OFFSET 0
      ) AS jf
      CROSS JOIN LATERAL (
        SELECT id, asset_id
        FROM web_services
        WHERE id = jf.service_id
        OFFSET 0
      ) AS ws
      CROSS JOIN LATERAL (
        SELECT id, domain, scope_id
        FROM assets
        WHERE id = ws.asset_id
        OFFSET 0
      ) AS a
      LEFT JOIN scopes AS s ON s.id = a.scope_id
      LEFT JOIN programs AS p ON p.id = s.program_id
      ORDER BY jf.id ASC
    `);
    return [...rows] as unknown as GrepOccurrence[];
  }
}

function normalizePageSize(limit: number | undefined): number {
  if (!Number.isFinite(limit)) return DEFAULT_PAGE_SIZE;
  return Math.min(MAX_PAGE_SIZE, Math.max(1, Math.trunc(limit ?? DEFAULT_PAGE_SIZE)));
}

async function readBlobWithRetry(
  reader: GrepBlobReader,
  blob: GrepBlob,
  timeoutMs: number
): Promise<Buffer> {
  let lastError: unknown;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const controller = new AbortController();
    let timeoutHandle: ReturnType<typeof setTimeout> | undefined;
    try {
      const timeout = new Promise<never>((_resolve, reject) => {
        timeoutHandle = setTimeout(() => {
          const error = new Error(`Blob read timed out after ${timeoutMs}ms`);
          controller.abort(error);
          reject(error);
        }, timeoutMs);
      });
      return await Promise.race([
        reader.get(blob.storageKey, blob.compression, controller.signal),
        timeout,
      ]);
    } catch (error) {
      lastError = error;
      if (attempt < 2) await delay(100 * 2 ** attempt);
    } finally {
      if (timeoutHandle !== undefined) clearTimeout(timeoutHandle);
    }
  }
  throw lastError;
}

export class JsGrepService {
  private readonly cache: GrepSessionCache;
  private readonly scanConcurrency: number;
  private readonly snippetLength: number;
  private readonly blobReadTimeoutMs: number;
  private readonly now: () => number;
  private readonly initializing = new Map<string, Promise<GrepSession>>();
  /** Serializing full-corpus scans prevents several hunts from saturating the RPi. */
  private scanTail: Promise<void> = Promise.resolve();

  constructor(
    private readonly repository: GrepRepository,
    private readonly reader: GrepBlobReader,
    options: JsGrepServiceOptions = {}
  ) {
    this.now = options.now ?? Date.now;
    this.scanConcurrency = Math.min(8, Math.max(1, options.scanConcurrency ?? DEFAULT_SCAN_CONCURRENCY));
    this.snippetLength = Math.min(2000, Math.max(80, options.snippetLength ?? DEFAULT_SNIPPET_LENGTH));
    this.blobReadTimeoutMs = Math.min(
      120_000,
      Math.max(10, options.blobReadTimeoutMs ?? DEFAULT_BLOB_READ_TIMEOUT_MS)
    );
    this.cache = new GrepSessionCache(
      options.cacheTtlMs ?? DEFAULT_CACHE_TTL_MS,
      options.maxSessions ?? DEFAULT_MAX_SESSIONS,
      this.now
    );
  }

  private progress(session: GrepSession): JsGrepResponse {
    return {
      statusCode: 202,
      body: {
        status: "scanning",
        phase: session.status === "queued" ? "queued" : "scanning",
        searchId: session.id,
        scannedBlobs: session.scannedBlobs,
        failedBlobs: session.failedBlobs,
        totalBlobs: session.totalBlobs,
        matchedBlobs: session.matchesByHash.size,
        progress:
          session.totalBlobs === 0
            ? session.status === "queued" ? 0 : 1
            : session.scannedBlobs / session.totalBlobs,
        snapshotMaxJsId: session.snapshotMaxJsId,
      },
    };
  }

  private async createSession(pattern: string, regex: RE2): Promise<GrepSession> {
    const snapshotMaxJsId = await this.repository.getSnapshotMaxJsId();
    const blobs = await this.repository.listReferencedBlobs(snapshotMaxJsId);
    const now = this.now();
    const session: GrepSession = {
      id: randomUUID(),
      pattern,
      status: "queued",
      snapshotMaxJsId,
      createdAt: now,
      lastAccessedAt: now,
      totalBlobs: blobs.length,
      scannedBlobs: 0,
      failedBlobs: 0,
      matchesByHash: new Map(),
      occurrenceIds: new Uint32Array(),
      counts: { totalResults: 0, totalHosts: 0, unassignedResults: 0, unassignedHosts: 0 },
    };
    this.cache.add(session);

    const run = this.scanTail.catch(() => undefined).then(() => this.scan(session, blobs, regex));
    this.scanTail = run.catch(() => undefined);
    return session;
  }

  private async scan(session: GrepSession, blobs: GrepBlob[], regex: RE2): Promise<void> {
    session.status = "scanning";
    let cursor = 0;
    let fatalError: unknown;
    const worker = async () => {
      while (!fatalError) {
        const index = cursor;
        cursor += 1;
        if (index >= blobs.length) return;
        const blob = blobs[index];
        try {
          const body = await readBlobWithRetry(this.reader, blob, this.blobReadTimeoutMs);
          const match = findMatchSnippet(body.toString("utf8"), regex, this.snippetLength);
          if (match) session.matchesByHash.set(blob.sha256, match);
          session.scannedBlobs += 1;
        } catch (error) {
          session.failedBlobs += 1;
          fatalError = error;
        }
      }
    };

    try {
      await Promise.all(
        Array.from({ length: Math.min(this.scanConcurrency, Math.max(1, blobs.length)) }, worker)
      );
      if (fatalError) throw fatalError;

      const matchedHashesJson = JSON.stringify([...session.matchesByHash.keys()]);
      const resolution = await this.repository.resolveOccurrences(
        matchedHashesJson,
        session.snapshotMaxJsId
      );
      session.occurrenceIds = resolution.occurrenceIds;
      // Keep the compact ID index private to the session. Spreading the full
      // resolution into an API response would serialize every Uint32Array
      // entry and make otherwise small pages grow with the entire result set.
      session.counts = {
        totalResults: resolution.totalResults,
        totalHosts: resolution.totalHosts,
        unassignedResults: resolution.unassignedResults,
        unassignedHosts: resolution.unassignedHosts,
      };
      session.status = "complete";
      session.lastAccessedAt = this.now();
    } catch (error) {
      session.status = "failed";
      session.error = error instanceof Error ? error.message : String(error);
      console.error(
        JSON.stringify({
          level: "error",
          msg: "JS grep scan failed; refusing to return partial totals",
          searchId: session.id,
          scannedBlobs: session.scannedBlobs,
          failedBlobs: session.failedBlobs,
          error: session.error,
        })
      );
      session.matchesByHash.clear();
      session.occurrenceIds = new Uint32Array();
      session.lastAccessedAt = this.now();
    }
  }

  private failed(session: GrepSession): JsGrepResponse {
    return {
      statusCode: 503,
      body: {
        status: "failed",
        searchId: session.id,
        scannedBlobs: session.scannedBlobs,
        failedBlobs: session.failedBlobs,
        totalBlobs: session.totalBlobs,
        error: "One or more stored JS blobs could not be read after retries. Start a new search.",
        retryable: true,
      },
    };
  }

  private async page(
    session: GrepSession,
    afterJsId: number,
    requestedLimit: number | undefined
  ): Promise<JsGrepResponse> {
    const limit = normalizePageSize(requestedLimit);
    let low = 0;
    let high = session.occurrenceIds.length;
    while (low < high) {
      const middle = (low + high) >>> 1;
      if (session.occurrenceIds[middle] <= afterJsId) low = middle + 1;
      else high = middle;
    }
    const pageIds = session.occurrenceIds.slice(low, low + limit);
    const hasMore = low + pageIds.length < session.occurrenceIds.length;
    const rows = await this.repository.listOccurrencesByIds(JSON.stringify(Array.from(pageIds)));
    const results = rows.map((row): GrepResult => {
      const match = session.matchesByHash.get(row.sha256);
      if (!match) {
        throw new JsGrepError("grep session is inconsistent; start a new search", 503);
      }
      return {
        ...row,
        programName: row.programName ?? null,
        attribution: row.scopeId === null ? "unassigned" : "scope",
        ...match,
      };
    });
    const lastId = pageIds.at(-1);
    const nextCursor = hasMore && lastId !== undefined ? encodeGrepCursor(session.id, lastId) : null;

    return {
      statusCode: 200,
      body: {
        status: "complete",
        searchId: session.id,
        scannedBlobs: session.scannedBlobs,
        failedBlobs: session.failedBlobs,
        scanned: session.scannedBlobs,
        totalBlobs: session.totalBlobs,
        matchedBlobs: session.matchesByHash.size,
        snapshotMaxJsId: session.snapshotMaxJsId,
        ...session.counts,
        total: session.counts.totalResults,
        results,
        nextCursor,
        hasMore,
      },
    };
  }

  async search(request: JsGrepRequest): Promise<JsGrepResponse> {
    const pattern = request.pattern;
    if (!pattern.trim()) throw new JsGrepError("q (pattern) is required", 400);
    const regex = compileSafePattern(pattern);

    let cursorPayload: CursorPayload | undefined;
    if (request.cursor) cursorPayload = decodeGrepCursor(request.cursor);
    if (
      request.searchId &&
      cursorPayload &&
      request.searchId !== cursorPayload.sessionId
    ) {
      throw new JsGrepError("cursor does not belong to searchId", 400);
    }

    const requestedSessionId = cursorPayload?.sessionId ?? request.searchId;
    let session = requestedSessionId
      ? this.cache.get(requestedSessionId)
      : this.cache.getByPattern(pattern);

    if (!session && requestedSessionId) {
      throw new JsGrepError("grep search expired; start a new search", 410);
    }
    if (session && session.pattern !== pattern) {
      throw new JsGrepError("searchId/cursor belongs to a different query", 400);
    }
    if (session?.status === "failed") {
      if (requestedSessionId) {
        return this.failed(session);
      }
      this.cache.delete(session.id);
      session = undefined;
    }

    if (!session) {
      let initialization = this.initializing.get(pattern);
      if (!initialization) {
        initialization = this.createSession(pattern, regex).finally(() => {
          this.initializing.delete(pattern);
        });
        this.initializing.set(pattern, initialization);
      }
      session = await initialization;
    }

    if (session.status === "queued" || session.status === "scanning") {
      return this.progress(session);
    }
    if (session.status === "failed") {
      return this.failed(session);
    }

    return this.page(session, cursorPayload?.afterJsId ?? 0, request.limit);
  }
}
