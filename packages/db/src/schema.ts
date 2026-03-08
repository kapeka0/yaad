import {
  pgTable,
  serial,
  text,
  boolean,
  integer,
  timestamp,
  uniqueIndex,
  primaryKey,
} from "drizzle-orm/pg-core";

export const programs = pgTable("programs", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  platform: text("platform").notNull(),
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
  },
  (t) => ({
    uniqProgramAsset: uniqueIndex("scopes_program_asset_idx").on(t.programId, t.asset),
  })
);

export const assets = pgTable("assets", {
  id: serial("id").primaryKey(),
  scopeId: integer("scope_id").references(() => scopes.id),
  domain: text("domain").notNull().unique(),
  firstSeen: timestamp("first_seen").defaultNow().notNull(),
  lastSeen: timestamp("last_seen").defaultNow().notNull(),
});

export const webServices = pgTable("web_services", {
  id: serial("id").primaryKey(),
  assetId: integer("asset_id")
    .notNull()
    .references(() => assets.id),
  url: text("url").notNull().unique(),
  statusCode: integer("status_code"),
  title: text("title"),
  lastScanned: timestamp("last_scanned").defaultNow().notNull(),
});

export const javascriptFiles = pgTable("javascript_files", {
  id: serial("id").primaryKey(),
  serviceId: integer("service_id")
    .notNull()
    .references(() => webServices.id),
  url: text("url").notNull().unique(),
});

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
export type Technology = typeof technologies.$inferSelect;
export type NewTechnology = typeof technologies.$inferInsert;
