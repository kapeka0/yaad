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
import { eq } from "drizzle-orm";
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
  scopeId: number | null;
  depth: number;
  rootDomain: string;
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
  if (!asset) return null;

  let rootDomain = asset.domain;
  if (asset.scopeId) {
    const [scope] = await db
      .select({ asset: scopes.asset })
      .from(scopes)
      .where(eq(scopes.id, asset.scopeId));
    if (scope) rootDomain = scope.asset.replace(/^\*\./, "").toLowerCase();
  }

  return { assetId: asset.id, scopeId: asset.scopeId, depth: asset.depth ?? 0, rootDomain };
}

export async function processCollectJs(job: { data: CollectJsJob }, deps: JsWorkerDeps): Promise<void> {
  const { url, serviceId } = job.data;
  const { db } = deps;

  console.log(JSON.stringify({ level: "info", msg: `Collecting JS from ${url}` }));

  const ctx = await loadServiceContext(db, serviceId);
  const jsUrls = await runGetJS(url);

  for (const jsUrl of jsUrls) {
    try {
      const [jsFile] = await db
        .insert(javascriptFiles)
        .values({ serviceId, url: jsUrl })
        .onConflictDoNothing()
        .returning();

      if (!jsFile) continue; // already collected elsewhere

      // Endpoint extraction (linkfinder) happens in the endpoint-worker.
      await deps.analyzeJsQueue.add(
        "analyze_js",
        { jsUrl: jsFile.url, jsId: jsFile.id },
        DEFAULT_JOB_OPTIONS
      );

      await analyzeBody(deps, ctx, jsFile.id, jsUrl);
    } catch (err) {
      console.error(
        JSON.stringify({ level: "warn", msg: `Failed to process JS ${jsUrl}`, error: String(err) })
      );
    }
  }
}

/** Download the JS, store it (deduped), fingerprint libraries, mine subdomains. */
async function analyzeBody(
  deps: JsWorkerDeps,
  ctx: ServiceContext | null,
  jsId: number,
  jsUrl: string
): Promise<void> {
  const { db } = deps;
  const fetched = await fetchJs(jsUrl, deps.jsMaxBytes);
  if (!fetched) return;

  const body = fetched.body;
  const text = body.toString("utf-8");

  let sha256: string | undefined;
  if (deps.storeJsBlobs && deps.store) {
    try {
      sha256 = await storeBlob(db, deps.store, body);
    } catch (err) {
      console.error(JSON.stringify({ level: "warn", msg: `Blob store failed for ${jsUrl}`, error: String(err) }));
    }
  }

  await db
    .update(javascriptFiles)
    .set({
      sha256: sha256 ?? null,
      sizeBytes: body.length,
      httpStatus: fetched.status,
      hasSourcemap: fetched.hasSourcemap,
      fetchedAt: new Date(),
    })
    .where(eq(javascriptFiles.id, jsId));

  // Library fingerprinting: retire.js (with CVEs) + inline banners.
  // Skipped entirely in light mode (retire.js is the CPU-heaviest step).
  const libs = deps.detectJsLibraries
    ? dedupeLibraries([...(await runRetire(body)), ...extractInlineLibraries(text)])
    : [];
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
    await mineSubdomains(deps, ctx, text);
  }
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

  for (const host of found) {
    try {
      const [inserted] = await db
        .insert(assets)
        .values({ scopeId: ctx.scopeId, domain: host, source: "js", depth: nextDepth })
        .onConflictDoNothing()
        .returning();

      if (!inserted) continue;

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
