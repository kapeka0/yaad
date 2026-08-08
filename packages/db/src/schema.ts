import {
  pgTable,
  serial,
  text,
  boolean,
  integer,
  timestamp,
  uniqueIndex,
  index,
  primaryKey,
  jsonb,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const programs = pgTable("programs", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  platform: text("platform").notNull(),
  url: text("url"),
  offersReward: boolean("offers_reward").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const scopes = pgTable(
  "scopes",
  {
    id: serial("id").primaryKey(),
    programId: integer("program_id")
      .notNull()
      .references(() => programs.id),
    asset: text("asset").notNull(),
    type: text("type").notNull(),
    wildcard: boolean("wildcard").notNull().default(false),
    inScope: boolean("in_scope").notNull().default(true),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    // Last successful enumeration, updated by the worker after completion.
    lastEnumeratedAt: timestamp("last_enumerated_at"),
    // Last time the scheduler queued an enumeration attempt. Keeping attempts
    // separate prevents a failed or stuck job from looking fresh forever.
    lastEnumerationAttemptAt: timestamp("last_enumeration_attempt_at"),
  },
  (t) => ({
    uniqProgramAsset: uniqueIndex("scopes_program_asset_idx").on(t.programId, t.asset),
    schedulerReadyIdx: index("scopes_scheduler_ready_idx")
      .on(t.lastEnumeratedAt, t.lastEnumerationAttemptAt)
      .where(sql`${t.wildcard} = true and ${t.inScope} = true`),
  })
);

export const assets = pgTable(
  "assets",
  {
    id: serial("id").primaryKey(),
    scopeId: integer("scope_id").references(() => scopes.id),
    domain: text("domain").notNull().unique(),
    // How this asset was discovered: scope | subfinder | crtsh | gau | js | pdcp
    source: text("source").notNull().default("scope"),
    // IP it resolves to (from dnsx / httpx), null if unresolved
    ip: text("ip"),
    resolved: boolean("resolved").notNull().default(false),
    // Recursion depth from the original root scope (0 = root)
    depth: integer("depth").notNull().default(0),
    firstSeen: timestamp("first_seen").defaultNow().notNull(),
    lastSeen: timestamp("last_seen").defaultNow().notNull(),
    // Last successful HTTP scan, updated by httpx-worker after completion.
    lastScannedAt: timestamp("last_scanned_at"),
    // Last time the scheduler queued an HTTP scan attempt.
    lastScanAttemptAt: timestamp("last_scan_attempt_at"),
  },
  (t) => ({
    // Scheduler scans oldest-first; index makes the staleness query cheap.
    lastScannedAtIdx: index("assets_last_scanned_at_idx").on(t.lastScannedAt),
    lastScanAttemptAtIdx: index("assets_last_scan_attempt_at_idx").on(t.lastScanAttemptAt),
    schedulerReadyIdx: index("assets_scheduler_ready_idx")
      .on(t.lastScannedAt, t.lastScanAttemptAt)
      .where(sql`${t.scopeId} is not null and ${t.resolved} = true`),
  })
);

export const webServices = pgTable(
  "web_services",
  {
    id: serial("id").primaryKey(),
    assetId: integer("asset_id")
      .notNull()
      .references(() => assets.id),
    url: text("url").notNull().unique(),
    statusCode: integer("status_code"),
    title: text("title"),
    // Enrichment from httpx
    webServer: text("web_server"),
    contentType: text("content_type"),
    contentLength: integer("content_length"),
    ip: text("ip"),
    cname: text("cname"),
    cdnName: text("cdn_name"),
    faviconHash: text("favicon_hash"),
    jarm: text("jarm"),
    // httpx -tech-detect output, stored raw for cross-referencing
    techFingerprint: jsonb("tech_fingerprint").$type<string[]>(),
    // Full response headers as returned by httpx
    responseHeaders: jsonb("response_headers").$type<Record<string, string>>(),
    lastScanned: timestamp("last_scanned").defaultNow().notNull(),
  },
  (t) => ({
    assetIdIdx: index("web_services_asset_id_idx").on(t.assetId),
  })
);

export const javascriptFiles = pgTable(
  "javascript_files",
  {
    id: serial("id").primaryKey(),
    serviceId: integer("service_id")
      .notNull()
      .references(() => webServices.id),
    // The same CDN URL can legitimately occur on many services. Uniqueness is
    // per service occurrence, while body storage remains deduplicated by SHA.
    url: text("url").notNull(),
    // sha256 of the fetched body; links to js_blobs (content-addressable storage)
    sha256: text("sha256"),
    sizeBytes: integer("size_bytes"),
    httpStatus: integer("http_status"),
    hasSourcemap: boolean("has_sourcemap").notNull().default(false),
    fetchedAt: timestamp("fetched_at"),
    // Set by endpoint-worker only after LinkFinder output was persisted and
    // scoped fan-out completed. NULL rows can be safely recovered later.
    endpointAnalyzedAt: timestamp("endpoint_analyzed_at"),
  },
  (t) => ({
    uniqServiceUrl: uniqueIndex("javascript_files_service_url_idx").on(t.serviceId, t.url),
  })
);

// Content-addressable storage index. One row per unique JS body (dedup by sha256).
// The actual bytes live in object storage (MinIO) under `storageKey`, zstd/gzip compressed.
export const jsBlobs = pgTable("js_blobs", {
  sha256: text("sha256").primaryKey(),
  storageKey: text("storage_key").notNull(),
  compression: text("compression").notNull().default("zstd"),
  sizeBytes: integer("size_bytes").notNull(),
  storedBytes: integer("stored_bytes").notNull(),
  // Number of javascript_files rows pointing at this blob (for retention decisions)
  refCount: integer("ref_count").notNull().default(1),
  firstSeen: timestamp("first_seen").defaultNow().notNull(),
});

// Detected JS libraries/versions per file (retire.js + regex signatures).
// This is the structured index used to cross-reference CVEs against assets.
export const jsLibraries = pgTable(
  "js_libraries",
  {
    id: serial("id").primaryKey(),
    jsId: integer("js_id")
      .notNull()
      .references(() => javascriptFiles.id),
    name: text("name").notNull(),
    version: text("version").notNull().default(""),
    // retirejs | sourcemap | regex
    source: text("source").notNull().default("retirejs"),
    // Known CVEs / advisories reported by retire.js for this exact version
    vulnerabilities: jsonb("vulnerabilities").$type<string[]>(),
    severity: text("severity"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => ({
    uniqJsLibVersion: uniqueIndex("js_libraries_js_name_version_idx").on(
      t.jsId,
      t.name,
      t.version
    ),
    nameIdx: index("js_libraries_name_idx").on(t.name),
  })
);

export const endpoints = pgTable(
  "endpoints",
  {
    id: serial("id").primaryKey(),
    jsId: integer("js_id")
      .notNull()
      .references(() => javascriptFiles.id),
    endpoint: text("endpoint").notNull(),
  },
  (t) => ({
    uniqJsEndpoint: uniqueIndex("endpoints_js_endpoint_idx").on(t.jsId, t.endpoint),
  })
);

export const technologies = pgTable(
  "technologies",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    version: text("version").notNull().default(""),
    icon: text("icon").notNull().default(""),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => ({
    uniqNameVersion: uniqueIndex("technologies_name_version_idx").on(t.name, t.version),
  })
);

export const assetTechnologies = pgTable(
  "asset_technologies",
  {
    assetId: integer("asset_id")
      .notNull()
      .references(() => assets.id),
    technologyId: integer("technology_id")
      .notNull()
      .references(() => technologies.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.assetId, t.technologyId] }),
    technologyAssetIdx: index("asset_technologies_technology_asset_idx").on(
      t.technologyId,
      t.assetId
    ),
  })
);

export type Program = typeof programs.$inferSelect;
export type NewProgram = typeof programs.$inferInsert;
export type Scope = typeof scopes.$inferSelect;
export type NewScope = typeof scopes.$inferInsert;
export type Asset = typeof assets.$inferSelect;
export type NewAsset = typeof assets.$inferInsert;
export type WebService = typeof webServices.$inferSelect;
export type NewWebService = typeof webServices.$inferInsert;
export type JavascriptFile = typeof javascriptFiles.$inferSelect;
export type NewJavascriptFile = typeof javascriptFiles.$inferInsert;
export type JsBlob = typeof jsBlobs.$inferSelect;
export type NewJsBlob = typeof jsBlobs.$inferInsert;
export type JsLibrary = typeof jsLibraries.$inferSelect;
export type NewJsLibrary = typeof jsLibraries.$inferInsert;
export type Technology = typeof technologies.$inferSelect;
export type NewTechnology = typeof technologies.$inferInsert;
