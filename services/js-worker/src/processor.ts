import { Queue } from "bullmq";
import type { Db } from "@yaad/db";
import { javascriptFiles, jsLibraries, assets, webServices, scopes } from "@yaad/db";
import { BlobStore } from "@yaad/storage";
import { DEFAULT_JOB_OPTIONS } from "@yaad/queue";
import type {
  CollectJsJob,
  AnalyzeJsJob,
  ScanHttpJob,
  EnumerateSubdomainsJob,
} from "@yaad/queue";
import { and, eq, sql } from "drizzle-orm";
import { normalizeAssetDomain } from "@yaad/types";
import { runGetJS } from "./runner.js";
import { fetchJs } from "./fetch.js";
import { runRetire, type DetectedLibrary } from "./retire.js";
import { extractSubdomains, extractInlineLibraries } from "./extract.js";
import { storeBlob } from "./store.js";

export interface JsWorkerDeps {
  db: Db;
  store: BlobStore | null;
  analyzeJsQueue: Queue<AnalyzeJsJob>;
  scanQueue: Queue<ScanHttpJob>;
  enumerateQueue: Queue<EnumerateSubdomainsJob>;
  jsMaxBytes: number;
  storeJsBlobs: boolean;
  detectJsLibraries: boolean;
  maxRecursionDepth: number;
}

interface ServiceContext {
  assetId: number;
  scopeId: number;
  depth: number;
  rootDomain: string;
}

interface JsFileState {
  id: number;
  url: string;
  sha256: string | null;
  fetchedAt: Date | null;
  endpointAnalyzedAt: Date | null;
}

async function loadServiceContext(db: Db, serviceId: number): Promise<ServiceContext | null> {
  const [svc] = await db
    .select({ assetId: webServices.assetId })
    .from(webServices)
    .where(eq(webServices.id, serviceId));
  if (!svc) return null;

  const [asset] = await db
    .select({ id: assets.id, domain: assets.domain, scopeId: assets.scopeId, depth: assets.depth })
    .from(assets)
    .where(eq(assets.id, svc.assetId));
  if (!asset || asset.scopeId == null) return null;

  const [scope] = await db
    .select({ asset: scopes.asset, inScope: scopes.inScope })
    .from(scopes)
    .where(eq(scopes.id, asset.scopeId));
  const rootDomain = scope?.inScope ? normalizeAssetDomain(scope.asset) : null;
  if (!rootDomain) return null;

  return { assetId: asset.id, scopeId: asset.scopeId, depth: asset.depth ?? 0, rootDomain };
}

async function getOrCreateJsFile(
  db: Db,
  serviceId: number,
  url: string
): Promise<JsFileState | null> {
  const [inserted] = await db
    .insert(javascriptFiles)
    .values({ serviceId, url })
    .onConflictDoNothing()
    .returning({
      id: javascriptFiles.id,
      url: javascriptFiles.url,
      sha256: javascriptFiles.sha256,
      fetchedAt: javascriptFiles.fetchedAt,
      endpointAnalyzedAt: javascriptFiles.endpointAnalyzedAt,
    });

  if (inserted) return inserted;

  // A previous attempt may have inserted the URL and then failed before the
  // body/blob update. Those rows used to be skipped forever.
  const [existing] = await db
    .select({
      id: javascriptFiles.id,
      url: javascriptFiles.url,
      sha256: javascriptFiles.sha256,
      fetchedAt: javascriptFiles.fetchedAt,
      endpointAnalyzedAt: javascriptFiles.endpointAnalyzedAt,
    })
    .from(javascriptFiles)
    .where(and(eq(javascriptFiles.serviceId, serviceId), eq(javascriptFiles.url, url)))
    .limit(1);

  return existing ?? null;
}

export function isJavascriptFetchComplete(
  jsFile: Pick<JsFileState, "fetchedAt" | "sha256">,
  storeJsBlobs: boolean
): boolean {
  if (!jsFile.fetchedAt) return false;
  return !storeJsBlobs || jsFile.sha256 != null;
}

export function getEndpointAnalysisJobId(jsId: number, now = new Date()): string {
  const dayBucket = now.toISOString().slice(0, 10).replaceAll("-", "");
  return `analyze-js-${jsId}-${dayBucket}`;
}

export async function processCollectJs(
  job: { data: CollectJsJob },
  deps: JsWorkerDeps
): Promise<void> {
  const { url, serviceId } = job.data;
  const { db } = deps;
  const analysisJobDate = new Date();

  console.log(JSON.stringify({ level: "info", msg: `Collecting JS from ${url}` }));

  const ctx = await loadServiceContext(db, serviceId);
  if (!ctx) {
    console.log(
      JSON.stringify({
        level: "info",
        msg: "Skipping JS collection outside an active scope",
        serviceId,
      })
    );
    return;
  }
  const jsUrls = await runGetJS(url);
  const readyForEndpointAnalysis = new Map<number, string>();
  const failedJsUrls: string[] = [];

  for (const jsUrl of new Set(jsUrls)) {
    try {
      const jsFile = await getOrCreateJsFile(db, serviceId, jsUrl);
      if (!jsFile) continue;
      if (isJavascriptFetchComplete(jsFile, deps.storeJsBlobs)) {
        // Persistence and endpoint analysis are independent checkpoints. This
        // recovers rows whose fetch succeeded before a Redis/worker failure.
        if (!jsFile.endpointAnalyzedAt) {
          readyForEndpointAnalysis.set(jsFile.id, jsFile.url);
        }
        continue;
      }

      const persisted = await analyzeBody(deps, ctx, jsFile.id, jsUrl);
      if (persisted) readyForEndpointAnalysis.set(jsFile.id, jsFile.url);
      else failedJsUrls.push(jsUrl);
    } catch (err) {
      failedJsUrls.push(jsUrl);
      console.error(
        JSON.stringify({ level: "warn", msg: `Failed to process JS ${jsUrl}`, error: String(err) })
      );
    }
  }

  if (readyForEndpointAnalysis.size > 0) {
    await deps.analyzeJsQueue.addBulk(
      [...readyForEndpointAnalysis].map(([jsId, jsUrl]) => ({
        name: "analyze_js",
        data: { jsUrl, jsId },
        opts: {
          ...DEFAULT_JOB_OPTIONS,
          // Failed Bull jobs are retained for days. A daily bucket lets a
          // still-unprocessed DB row heal on a later collection pass.
          jobId: getEndpointAnalysisJobId(jsId, analysisJobDate),
        },
      }))
    );
  }

  // Complete bodies are skipped cheaply on the next BullMQ attempt, while
  // incomplete rows are selected again and retried. Throw only after the
  // successful subset has been enqueued so partial progress is durable.
  if (failedJsUrls.length > 0) {
    const examples = failedJsUrls.slice(0, 3).join(", ");
    throw new Error(
      `Failed to persist ${failedJsUrls.length}/${new Set(jsUrls).size} JavaScript file(s); examples: ${examples}`
    );
  }
}

/** Download the JS, store it (deduped), fingerprint libraries, mine subdomains. */
async function analyzeBody(
  deps: JsWorkerDeps,
  ctx: ServiceContext | null,
  jsId: number,
  jsUrl: string
): Promise<boolean> {
  const { db } = deps;
  const fetched = await fetchJs(jsUrl, deps.jsMaxBytes);
  if (!fetched) return false;

  const body = fetched.body;
  const text = body.toString("utf-8");

  let sha256: string | undefined;
  if (deps.storeJsBlobs) {
    if (!deps.store) throw new Error("JS blob storage is enabled but unavailable");
    // Do not mark the row fetched, or enqueue endpoint analysis, until object
    // storage and the js_blobs index have both accepted the body.
    sha256 = await storeBlob(db, deps.store, body);
  }

  const [persisted] = await db
    .update(javascriptFiles)
    .set({
      sha256: sha256 ?? null,
      sizeBytes: body.length,
      httpStatus: fetched.status,
      hasSourcemap: fetched.hasSourcemap,
      fetchedAt: new Date(),
    })
    .where(eq(javascriptFiles.id, jsId))
    .returning({ id: javascriptFiles.id });

  if (!persisted) throw new Error(`JavaScript row ${jsId} disappeared before persistence`);

  // Library fingerprinting: retire.js (with CVEs) + inline banners.
  // Skipped entirely in light mode (retire.js is the CPU-heaviest step).
  let libs: DetectedLibrary[] = [];
  if (deps.detectJsLibraries) {
    try {
      libs = dedupeLibraries([...(await runRetire(body)), ...extractInlineLibraries(text)]);
    } catch (err) {
      console.error(
        JSON.stringify({ level: "warn", msg: `Library detection failed for ${jsUrl}`, error: String(err) })
      );
    }
  }
  for (const lib of libs) {
    try {
      await db
        .insert(jsLibraries)
        .values({
          jsId,
          name: lib.name,
          version: lib.version,
          source: lib.vulnerabilities.length > 0 || lib.severity ? "retirejs" : "regex",
          vulnerabilities: lib.vulnerabilities.length > 0 ? lib.vulnerabilities : null,
          severity: lib.severity ?? null,
        })
        .onConflictDoNothing();
    } catch {
      /* ignore */
    }
  }

  // Subdomain mining + bounded recursion.
  if (ctx) {
    try {
      await mineSubdomains(deps, ctx, text);
    } catch (err) {
      console.error(
        JSON.stringify({ level: "warn", msg: `Subdomain mining failed for ${jsUrl}`, error: String(err) })
      );
    }
  }

  return true;
}

function dedupeLibraries(libs: DetectedLibrary[]): DetectedLibrary[] {
  const map = new Map<string, DetectedLibrary>();
  for (const lib of libs) {
    const key = `${lib.name}@${lib.version}`;
    const existing = map.get(key);
    if (existing) {
      existing.vulnerabilities = [...new Set([...existing.vulnerabilities, ...lib.vulnerabilities])];
      existing.severity = existing.severity ?? lib.severity;
    } else {
      map.set(key, { ...lib, vulnerabilities: [...lib.vulnerabilities] });
    }
  }
  return [...map.values()];
}

async function mineSubdomains(deps: JsWorkerDeps, ctx: ServiceContext, text: string): Promise<void> {
  const { db } = deps;
  const nextDepth = ctx.depth + 1;
  const found = extractSubdomains(text, [ctx.rootDomain]);

  for (const rawHost of found) {
    // Wildcards and fragments extracted from JavaScript are not concrete
    // scan targets. Keep them out of the global assets table.
    if (rawHost.includes("*")) continue;
    const host = normalizeAssetDomain(rawHost);
    if (!host) continue;

    try {
      const [inserted] = await db
        .insert(assets)
        .values({ scopeId: ctx.scopeId, domain: host, source: "js", depth: nextDepth })
        .onConflictDoUpdate({
          target: assets.domain,
          set: {
            scopeId: sql`coalesce(${assets.scopeId}, ${ctx.scopeId})`,
            lastSeen: new Date(),
          },
        })
        .returning({ id: assets.id, isNew: sql<boolean>`(xmax = 0)` });

      if (!inserted?.isNew) continue;

      await deps.scanQueue.add(
        "scan_http",
        { domain: host, assetId: inserted.id },
        DEFAULT_JOB_OPTIONS
      );

      // Recurse enumeration only while under the depth budget.
      if (nextDepth < deps.maxRecursionDepth) {
        await deps.enumerateQueue.add(
          "enumerate_subdomains",
          { domain: host, scopeId: ctx.scopeId, depth: nextDepth },
          DEFAULT_JOB_OPTIONS
        );
      }
    } catch {
      /* ignore */
    }
  }
}
