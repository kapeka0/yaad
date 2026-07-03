-- Enrichment + JS library/blob indexing + trigram search
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- assets: discovery provenance + resolution + recursion depth
ALTER TABLE "assets" ADD COLUMN IF NOT EXISTS "source" text NOT NULL DEFAULT 'scope';
ALTER TABLE "assets" ADD COLUMN IF NOT EXISTS "ip" text;
ALTER TABLE "assets" ADD COLUMN IF NOT EXISTS "resolved" boolean NOT NULL DEFAULT false;
ALTER TABLE "assets" ADD COLUMN IF NOT EXISTS "depth" integer NOT NULL DEFAULT 0;

-- web_services: httpx enrichment
ALTER TABLE "web_services" ADD COLUMN IF NOT EXISTS "web_server" text;
ALTER TABLE "web_services" ADD COLUMN IF NOT EXISTS "content_type" text;
ALTER TABLE "web_services" ADD COLUMN IF NOT EXISTS "content_length" integer;
ALTER TABLE "web_services" ADD COLUMN IF NOT EXISTS "ip" text;
ALTER TABLE "web_services" ADD COLUMN IF NOT EXISTS "cname" text;
ALTER TABLE "web_services" ADD COLUMN IF NOT EXISTS "cdn_name" text;
ALTER TABLE "web_services" ADD COLUMN IF NOT EXISTS "favicon_hash" text;
ALTER TABLE "web_services" ADD COLUMN IF NOT EXISTS "jarm" text;
ALTER TABLE "web_services" ADD COLUMN IF NOT EXISTS "tech_fingerprint" jsonb;
ALTER TABLE "web_services" ADD COLUMN IF NOT EXISTS "response_headers" jsonb;

CREATE INDEX IF NOT EXISTS "web_services_favicon_hash_idx" ON "web_services" ("favicon_hash");

-- javascript_files: link to content-addressable blob + metadata
ALTER TABLE "javascript_files" ADD COLUMN IF NOT EXISTS "sha256" text;
ALTER TABLE "javascript_files" ADD COLUMN IF NOT EXISTS "size_bytes" integer;
ALTER TABLE "javascript_files" ADD COLUMN IF NOT EXISTS "http_status" integer;
ALTER TABLE "javascript_files" ADD COLUMN IF NOT EXISTS "has_sourcemap" boolean NOT NULL DEFAULT false;
ALTER TABLE "javascript_files" ADD COLUMN IF NOT EXISTS "fetched_at" timestamp;

CREATE INDEX IF NOT EXISTS "javascript_files_sha256_idx" ON "javascript_files" ("sha256");

-- Content-addressable storage index (dedup by sha256)
CREATE TABLE IF NOT EXISTS "js_blobs" (
  "sha256" text PRIMARY KEY,
  "storage_key" text NOT NULL,
  "compression" text NOT NULL DEFAULT 'zstd',
  "size_bytes" integer NOT NULL,
  "stored_bytes" integer NOT NULL,
  "ref_count" integer NOT NULL DEFAULT 1,
  "first_seen" timestamp DEFAULT now() NOT NULL
);

-- Structured JS library/version index (retire.js + regex signatures)
CREATE TABLE IF NOT EXISTS "js_libraries" (
  "id" serial PRIMARY KEY,
  "js_id" integer NOT NULL REFERENCES "javascript_files"("id"),
  "name" text NOT NULL,
  "version" text NOT NULL DEFAULT '',
  "source" text NOT NULL DEFAULT 'retirejs',
  "vulnerabilities" jsonb,
  "severity" text,
  "created_at" timestamp DEFAULT now() NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS "js_libraries_js_name_version_idx"
  ON "js_libraries" ("js_id", "name", "version");
CREATE INDEX IF NOT EXISTS "js_libraries_name_idx" ON "js_libraries" ("name");
CREATE INDEX IF NOT EXISTS "js_libraries_name_trgm_idx"
  ON "js_libraries" USING gin ("name" gin_trgm_ops);
