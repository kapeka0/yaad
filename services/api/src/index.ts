import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { loadConfig } from "@yaad/config";
import { getDb, runMigrations } from "@yaad/db";
import { BlobStore, type Compression } from "@yaad/storage";
import { sql, eq, ilike, count, gt, and, inArray, isNotNull, desc, type SQL } from "drizzle-orm";
import {
  programs,
  scopes,
  assets,
  technologies,
  assetTechnologies,
  webServices,
  javascriptFiles,
  jsLibraries,
  jsBlobs,
} from "@yaad/db";

const config = loadConfig();

function parsePagination(page: string | undefined, limit: string | undefined) {
  const p = Math.max(1, parseInt(page ?? "1", 10));
  const l = Math.min(100, Math.max(1, parseInt(limit ?? "20", 10)));
  return { page: p, limit: l, offset: (p - 1) * l };
}

async function bootstrap() {
  console.log(JSON.stringify({ level: "info", msg: "Running migrations..." }));
  await runMigrations(config.databaseUrl);
  console.log(JSON.stringify({ level: "info", msg: "Migrations complete" }));

  const db = getDb(config.databaseUrl);
  const app = new Hono();

  // Health check
  app.get("/health", (c) => c.json({ status: "ok" }));

  // GET /programs
  app.get("/programs", async (c) => {
    const rows = await db
      .select({
        id: programs.id,
        name: programs.name,
        platform: programs.platform,
        url: programs.url,
        createdAt: programs.createdAt,
        assetCount: count(assets.id),
      })
      .from(programs)
      .leftJoin(scopes, eq(scopes.programId, programs.id))
      .leftJoin(assets, eq(assets.scopeId, scopes.id))
      .groupBy(programs.id)
      .orderBy(programs.name);

    return c.json(rows);
  });

  // GET /programs/:id/assets
  app.get("/programs/:id/assets", async (c) => {
    const id = parseInt(c.req.param("id"), 10);
    const { page, limit, offset } = parsePagination(
      c.req.query("page"),
      c.req.query("limit")
    );

    const rows = await db
      .select({
        id: assets.id,
        domain: assets.domain,
        firstSeen: assets.firstSeen,
        lastSeen: assets.lastSeen,
      })
      .from(assets)
      .innerJoin(scopes, eq(assets.scopeId, scopes.id))
      .where(eq(scopes.programId, id))
      .limit(limit)
      .offset(offset);

    return c.json({ page, limit, data: rows });
  });

  // GET /assets?technology=X&page=1&limit=20
  app.get("/assets", async (c) => {
    const techName = c.req.query("technology");
    const { page, limit, offset } = parsePagination(
      c.req.query("page"),
      c.req.query("limit")
    );

    if (techName) {
      const rows = await db
        .selectDistinct({
          id: assets.id,
          domain: assets.domain,
          firstSeen: assets.firstSeen,
          lastSeen: assets.lastSeen,
        })
        .from(assets)
        .innerJoin(assetTechnologies, eq(assetTechnologies.assetId, assets.id))
        .innerJoin(technologies, eq(technologies.id, assetTechnologies.technologyId))
        .where(ilike(technologies.name, `%${techName}%`))
        .limit(limit)
        .offset(offset);

      return c.json({ page, limit, data: rows });
    }

    const rows = await db
      .select({
        id: assets.id,
        domain: assets.domain,
        firstSeen: assets.firstSeen,
        lastSeen: assets.lastSeen,
      })
      .from(assets)
      .limit(limit)
      .offset(offset);

    return c.json({ page, limit, data: rows });
  });

  // GET /assets/:id/technologies
  app.get("/assets/:id/technologies", async (c) => {
    const id = parseInt(c.req.param("id"), 10);

    const rows = await db
      .select({
        id: technologies.id,
        name: technologies.name,
        version: technologies.version,
      })
      .from(technologies)
      .innerJoin(assetTechnologies, eq(assetTechnologies.technologyId, technologies.id))
      .where(eq(assetTechnologies.assetId, id));

    return c.json(rows);
  });

  // GET /technologies/:name/assets
  app.get("/technologies/:name/assets", async (c) => {
    const name = c.req.param("name");
    const { page, limit, offset } = parsePagination(
      c.req.query("page"),
      c.req.query("limit")
    );

    const rows = await db
      .selectDistinct({
        id: assets.id,
        domain: assets.domain,
        firstSeen: assets.firstSeen,
        lastSeen: assets.lastSeen,
      })
      .from(assets)
      .innerJoin(assetTechnologies, eq(assetTechnologies.assetId, assets.id))
      .innerJoin(technologies, eq(technologies.id, assetTechnologies.technologyId))
      .where(ilike(technologies.name, `%${name}%`))
      .limit(limit)
      .offset(offset);

    return c.json({ page, limit, data: rows });
  });

  // GET /assets/search — enriched for frontend table
  app.get("/assets/search", async (c) => {
    const q = c.req.query("q");
    const technology = c.req.query("technology");
    const platform = c.req.query("platform");
    const cursorStr = c.req.query("cursor");
    const cursor = cursorStr ? parseInt(cursorStr, 10) : undefined;
    const limit = Math.min(100, Math.max(1, parseInt(c.req.query("limit") ?? "30", 10)));

    // Build conditions
    const conditions: SQL[] = [];
    if (cursor) conditions.push(gt(assets.id, cursor));
    if (q) conditions.push(ilike(assets.domain, `%${q}%`));
    if (platform) conditions.push(eq(programs.platform, platform));

    let query = db
      .select({
        id: assets.id,
        domain: assets.domain,
        firstSeen: assets.firstSeen,
        programId: programs.id,
        programName: programs.name,
        programPlatform: programs.platform,
      })
      .from(assets)
      .innerJoin(scopes, eq(assets.scopeId, scopes.id))
      .innerJoin(programs, eq(scopes.programId, programs.id))
      .$dynamic();

    if (technology) {
      query = query
        .innerJoin(assetTechnologies, eq(assetTechnologies.assetId, assets.id))
        .innerJoin(technologies, eq(technologies.id, assetTechnologies.technologyId))
        .where(and(...conditions, ilike(technologies.name, `%${technology}%`)));
    } else if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    const rows = await query.orderBy(assets.id).limit(limit);

    // Fetch technologies for these assets
    const assetIds = rows.map((r) => r.id);
    const techRows = assetIds.length > 0
      ? await db
          .select({
            assetId: assetTechnologies.assetId,
            techId: technologies.id,
            techName: technologies.name,
            techVersion: technologies.version,
            techIcon: technologies.icon,
          })
          .from(assetTechnologies)
          .innerJoin(technologies, eq(technologies.id, assetTechnologies.technologyId))
          .where(inArray(assetTechnologies.assetId, assetIds))
      : [];

    const techsByAsset = new Map<number, typeof techRows>();
    for (const t of techRows) {
      if (!techsByAsset.has(t.assetId)) techsByAsset.set(t.assetId, []);
      techsByAsset.get(t.assetId)!.push(t);
    }

    const data = rows.map((r) => ({
      id: r.id,
      domain: r.domain,
      firstSeen: r.firstSeen,
      program: { id: r.programId, name: r.programName, platform: r.programPlatform },
      technologies: (techsByAsset.get(r.id) ?? []).map((t) => ({
        id: t.techId,
        name: t.techName,
        version: t.techVersion,
        icon: t.techIcon,
      })),
    }));

    const nextCursor = rows.length === limit ? rows[rows.length - 1].id : null;
    return c.json({ nextCursor, data });
  });

  // GET /technologies — distinct tech names for filter combobox
  app.get("/technologies", async (c) => {
    const rows = await db
      .selectDistinct({ name: technologies.name })
      .from(technologies)
      .orderBy(technologies.name);
    return c.json(rows);
  });

  // GET /platforms — distinct platforms
  app.get("/platforms", async (c) => {
    const rows = await db
      .selectDistinct({ platform: programs.platform })
      .from(programs)
      .orderBy(programs.platform);
    return c.json(rows.map((r) => r.platform));
  });

  // GET /scopes?program=name
  app.get("/scopes", async (c) => {
    const programName = c.req.query("program");
    const { page, limit, offset } = parsePagination(
      c.req.query("page"),
      c.req.query("limit")
    );

    if (programName) {
      const prog = await db.query.programs.findFirst({
        where: (p, { ilike }) => ilike(p.name, `%${programName}%`),
      });

      if (!prog) return c.json({ page, limit, data: [] });

      const rows = await db
        .select()
        .from(scopes)
        .where(eq(scopes.programId, prog.id))
        .limit(limit)
        .offset(offset);

      return c.json({ page, limit, data: rows });
    }

    const rows = await db.select().from(scopes).limit(limit).offset(offset);
    return c.json({ page, limit, data: rows });
  });

  // GET /libraries — distinct detected JS libraries (optionally filter ?name=)
  app.get("/libraries", async (c) => {
    const name = c.req.query("name");
    const rows = await db
      .select({
        name: jsLibraries.name,
        version: jsLibraries.version,
        occurrences: count(jsLibraries.id),
      })
      .from(jsLibraries)
      .where(name ? ilike(jsLibraries.name, `%${name}%`) : undefined)
      .groupBy(jsLibraries.name, jsLibraries.version)
      .orderBy(jsLibraries.name, jsLibraries.version);
    return c.json(rows);
  });

  // GET /libraries/vulnerable — libraries with known CVEs (CVE hunting entrypoint)
  app.get("/libraries/vulnerable", async (c) => {
    const rows = await db
      .selectDistinct({
        name: jsLibraries.name,
        version: jsLibraries.version,
        severity: jsLibraries.severity,
        vulnerabilities: jsLibraries.vulnerabilities,
      })
      .from(jsLibraries)
      .where(isNotNull(jsLibraries.vulnerabilities))
      .orderBy(jsLibraries.name, jsLibraries.version);
    return c.json(rows);
  });

  // GET /libraries/:name/assets?version=X — assets/programs using a library.
  // This is the core "a CVE dropped for lib X — who is affected?" query.
  app.get("/libraries/:name/assets", async (c) => {
    const name = c.req.param("name");
    const version = c.req.query("version");
    const { page, limit, offset } = parsePagination(c.req.query("page"), c.req.query("limit"));

    const conditions: SQL[] = [ilike(jsLibraries.name, name)];
    if (version) conditions.push(eq(jsLibraries.version, version));

    const rows = await db
      .selectDistinct({
        assetId: assets.id,
        domain: assets.domain,
        library: jsLibraries.name,
        version: jsLibraries.version,
        jsUrl: javascriptFiles.url,
        programId: programs.id,
        programName: programs.name,
        platform: programs.platform,
      })
      .from(jsLibraries)
      .innerJoin(javascriptFiles, eq(javascriptFiles.id, jsLibraries.jsId))
      .innerJoin(webServices, eq(webServices.id, javascriptFiles.serviceId))
      .innerJoin(assets, eq(assets.id, webServices.assetId))
      .leftJoin(scopes, eq(scopes.id, assets.scopeId))
      .leftJoin(programs, eq(programs.id, scopes.programId))
      .where(and(...conditions))
      .orderBy(assets.domain)
      .limit(limit)
      .offset(offset);

    return c.json({ page, limit, data: rows });
  });

  // GET /assets/:id/libraries — JS libraries detected on an asset
  app.get("/assets/:id/libraries", async (c) => {
    const id = parseInt(c.req.param("id"), 10);
    const rows = await db
      .selectDistinct({
        name: jsLibraries.name,
        version: jsLibraries.version,
        severity: jsLibraries.severity,
        vulnerabilities: jsLibraries.vulnerabilities,
        jsUrl: javascriptFiles.url,
      })
      .from(jsLibraries)
      .innerJoin(javascriptFiles, eq(javascriptFiles.id, jsLibraries.jsId))
      .innerJoin(webServices, eq(webServices.id, javascriptFiles.serviceId))
      .where(eq(webServices.assetId, id));
    return c.json(rows);
  });

  // GET /js/grep?q=<regex>&limit=N — scan stored JS bodies for an arbitrary
  // signature. Slower than the structured library search; meant for ad-hoc hunts.
  app.get("/js/grep", async (c) => {
    const q = c.req.query("q");
    if (!q) return c.json({ error: "q (pattern) is required" }, 400);
    let re: RegExp;
    try {
      re = new RegExp(q, "i");
    } catch {
      return c.json({ error: "invalid regex" }, 400);
    }
    const limit = Math.min(2000, Math.max(1, parseInt(c.req.query("limit") ?? "300", 10)));

    // Scan the most widely-referenced unique blobs first.
    const blobs = await db
      .select({
        sha256: jsBlobs.sha256,
        storageKey: jsBlobs.storageKey,
        compression: jsBlobs.compression,
      })
      .from(jsBlobs)
      .orderBy(desc(jsBlobs.refCount))
      .limit(limit);

    const store = new BlobStore(config.storage);
    const matched: string[] = [];

    // Bounded parallelism to keep memory/network sane.
    const pool = 8;
    for (let i = 0; i < blobs.length; i += pool) {
      const slice = blobs.slice(i, i + pool);
      const checks = await Promise.all(
        slice.map(async (b) => {
          try {
            const buf = await store.get(b.storageKey, b.compression as Compression);
            return re.test(buf.toString("utf-8")) ? b.sha256 : null;
          } catch {
            return null;
          }
        })
      );
      for (const m of checks) if (m) matched.push(m);
    }

    if (matched.length === 0) {
      return c.json({ scanned: blobs.length, matches: [] });
    }

    // Map matching blobs back to the assets/JS files that serve them.
    const hits = await db
      .selectDistinct({
        sha256: javascriptFiles.sha256,
        jsUrl: javascriptFiles.url,
        domain: assets.domain,
        programName: programs.name,
      })
      .from(javascriptFiles)
      .innerJoin(webServices, eq(webServices.id, javascriptFiles.serviceId))
      .innerJoin(assets, eq(assets.id, webServices.assetId))
      .leftJoin(scopes, eq(scopes.id, assets.scopeId))
      .leftJoin(programs, eq(programs.id, scopes.programId))
      .where(inArray(javascriptFiles.sha256, matched));

    return c.json({ scanned: blobs.length, matchedBlobs: matched.length, matches: hits });
  });

  serve({ fetch: app.fetch, port: config.port }, () => {
    console.log(JSON.stringify({ level: "info", msg: `API listening on port ${config.port}` }));
  });
}

bootstrap().catch((err) => {
  console.error(JSON.stringify({ level: "fatal", error: String(err) }));
  process.exit(1);
});
