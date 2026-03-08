CREATE TABLE IF NOT EXISTS "programs" (
  "id" serial PRIMARY KEY NOT NULL,
  "name" text NOT NULL UNIQUE,
  "platform" text NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "scopes" (
  "id" serial PRIMARY KEY NOT NULL,
  "program_id" integer NOT NULL REFERENCES "programs"("id"),
  "asset" text NOT NULL,
  "type" text NOT NULL,
  "wildcard" boolean NOT NULL DEFAULT false,
  "in_scope" boolean NOT NULL DEFAULT true,
  "created_at" timestamp DEFAULT now() NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS "scopes_program_asset_idx" ON "scopes" ("program_id", "asset");

CREATE TABLE IF NOT EXISTS "assets" (
  "id" serial PRIMARY KEY NOT NULL,
  "scope_id" integer REFERENCES "scopes"("id"),
  "domain" text NOT NULL UNIQUE,
  "first_seen" timestamp DEFAULT now() NOT NULL,
  "last_seen" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "web_services" (
  "id" serial PRIMARY KEY NOT NULL,
  "asset_id" integer NOT NULL REFERENCES "assets"("id"),
  "url" text NOT NULL UNIQUE,
  "status_code" integer,
  "title" text,
  "last_scanned" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "javascript_files" (
  "id" serial PRIMARY KEY NOT NULL,
  "service_id" integer NOT NULL REFERENCES "web_services"("id"),
  "url" text NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS "endpoints" (
  "id" serial PRIMARY KEY NOT NULL,
  "js_id" integer NOT NULL REFERENCES "javascript_files"("id"),
  "endpoint" text NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS "endpoints_js_endpoint_idx" ON "endpoints" ("js_id", "endpoint");

CREATE TABLE IF NOT EXISTS "technologies" (
  "id" serial PRIMARY KEY NOT NULL,
  "name" text NOT NULL,
  "version" text NOT NULL DEFAULT '',
  "created_at" timestamp DEFAULT now() NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS "technologies_name_version_idx" ON "technologies" ("name", "version");

CREATE TABLE IF NOT EXISTS "asset_technologies" (
  "asset_id" integer NOT NULL REFERENCES "assets"("id"),
  "technology_id" integer NOT NULL REFERENCES "technologies"("id"),
  PRIMARY KEY ("asset_id", "technology_id")
);
