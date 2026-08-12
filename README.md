# Yet Another Asset Database (YAAD)

A scalable system that collects assets from bug bounty programs, enumerates their infrastructure, detects technologies, and lets you query subdomains by technology to see which programs are affected when a CVE drops.

![](./image.png)

## What It Does

1. Imports bug bounty scopes from [bounty-targets-data](https://github.com/arkadiyt/bounty-targets-data)
2. Enumerates subdomains and live web services
3. Extracts JavaScript files and endpoints
4. Detects technologies via [cultivate-api](https://github.com/kapeka0/cultivate-api)
5. Stores everything in a PostgreSQL instance, so you can ask: **"Which subdomains from which programs are using Next.js 13?"**

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        YAAD System                          │
│                                                             │
│  scope-importer ──► [enumerate_subdomains queue]            │
│                              │                              │
│                     subdomain-worker                        │
│                              │                              │
│                    [scan_http queue]                        │
│                              │                              │
│                      httpx-worker ──► [collect_js queue]    │
│                         │                   │               │
│              [detect_technology]        js-worker           │
│                         │                   │               │
│                   tech-worker      [analyze_js queue]       │
│                                            │                │
│                                    endpoint-worker          │
│                                       │       │             │
│                              [scan_http] [detect_technology]│
│                                                             │
│  PostgreSQL ◄──────────────────────────────────────────────┤
│  Redis (BullMQ queues) ◄───────────────────────────────────┤
│  API (Hono) ◄──────────────────────────────────────────────┘
└─────────────────────────────────────────────────────────────┘
```

---

## Services

| Service            | Role                                            | Key Tool         |
| ------------------ | ----------------------------------------------- | ---------------- |
| `scope-importer`   | Pull bounty-targets-data, parse scopes, seed DB | GitHub raw JSON  |
| `subdomain-worker` | Enumerate + resolve subdomains                  | subfinder, dnsx, crt.sh, gau |
| `httpx-worker`     | Identify live HTTP services + fingerprint       | httpx (tech/favicon/jarm) |
| `js-worker`        | Collect + store JS, detect libraries            | getJS, retire.js, MinIO |
| `endpoint-worker`  | Extract endpoints + subdomains from JS          | linkfinder       |
| `tech-worker`      | Detect technologies per asset                   | cultivate-api    |
| `scheduler`        | Periodically re-enumerate scopes and re-scan assets | node cron loop |
| `api`              | REST API for querying the database              | Hono             |
| `frontend`         | Web UI: assets, JS Hunt, manage, stats          | Next.js 15       |
| `cultivate-api`    | Technology fingerprinting service               | Wappalyzer-based |
| `postgres`         | Primary datastore                               | PostgreSQL 15    |
| `redis`            | Job queues                                      | Redis 7 / BullMQ |
| `minio`            | Object storage for JS blobs                     | MinIO (S3)       |

---

## Data Pipeline

```
1. scope-importer
   └─ fetches bounty-targets-data JSON
   └─ inserts programs + scopes into DB
   └─ enqueues enumerate_subdomains for wildcard domains

2. subdomain-worker
   └─ enumerates from subfinder (-all -recursive) + crt.sh + gau + PDCP
   └─ resolves candidates with dnsx (drops dead names, captures IPs)
   └─ stores subdomains as assets (with source/ip/depth)
   └─ enqueues scan_http for each live asset

3. httpx-worker
   └─ runs httpx to confirm live services
   └─ stores web_services (url, status, title, server, ip, cname, cdn,
      favicon hash, jarm, tech fingerprint, response headers)
   └─ enqueues collect_js + detect_technology

4. js-worker
   └─ runs getJS to extract JS file URLs
   └─ downloads each JS, dedups by sha256, zstd-compresses → MinIO
   └─ runs retire.js → js_libraries (library + version + CVEs)
   └─ mines subdomains from JS bodies → recurses (bounded by MAX_RECURSION_DEPTH)
   └─ stores javascript_files + enqueues analyze_js

5. endpoint-worker
   └─ runs LinkFinder once per unique stored JS body (sha256)
   └─ filters static/tool noise and stores bounded blob_endpoints
   └─ reuses shared results for every scoped JS occurrence
   └─ extracts new subdomains → enqueues scan_http + detect_technology

6. tech-worker
   └─ queries cultivate-api for each asset URL
   └─ stores technologies + asset_technologies
```

---

## How each microservice works

Every worker is a small, single-responsibility Node process that consumes one
BullMQ queue, does its job, writes to Postgres, and (usually) enqueues the next
stage. They share three packages: `@yaad/db` (Drizzle schema + client),
`@yaad/queue` (queue names, job types, Redis connection) and `@yaad/config`
(env parsing). Scaling any stage is just running more replicas of that service.

### `scope-importer` (one-shot / cron)
Downloads the JSON files from **bounty-targets-data**, parses each program's
scope entries, and upserts `programs` + `scopes`. For every in-scope wildcard
(`*.example.com`) it enqueues an `enumerate_subdomains` job. Runs on startup and
can be re-run to pick up upstream changes. Private programs added from the UI go
through the same tables, so they behave identically downstream.

### `subdomain-worker` — queue: `enumerate_subdomains`
Fans out to every enabled source in parallel — **subfinder** (`-all -recursive`),
**crt.sh** (certificate transparency), **gau** (historical URLs) and optionally
**PDCP** — deduplicating hostnames and tracking which source found each. It then
resolves the full set with **dnsx**, which drops dead names and records the IP.
Live hosts are upserted into `assets` (with `source`, `ip`, `resolved`, `depth`)
and a `scan_http` job is queued for each newly discovered one.

### `httpx-worker` — queue: `scan_http`
Runs **httpx** against a host to confirm a live HTTP service and fingerprint it:
status, title, web server, content type/length, IP, CNAME, CDN, **favicon hash**,
**JARM**, detected technologies and response headers — all persisted to
`web_services`. httpx-detected technologies are written straight to
`technologies`/`asset_technologies`. It then enqueues `collect_js` and
`detect_technology` for the service.

### `js-worker` — queue: `collect_js`
Runs **getJS** to discover script URLs on a service, then for each new script:
downloads the body (size-capped), hashes it (sha256), and stores it in **MinIO**
**content-addressably** — identical bundles across many hosts are stored once,
zstd-compressed. It records `javascript_files` + `js_blobs`, runs **retire.js**
(plus inline version banners) to populate `js_libraries` with library, version
and any known CVEs, and mines hostnames from the body to recurse back into
`enumerate_subdomains` (bounded by `MAX_RECURSION_DEPTH`). Finally it enqueues
`analyze_js`.

### `endpoint-worker` — queue: `analyze_js`
Runs **LinkFinder** over the exact content-addressed MinIO body once per SHA,
stores high-signal paths in `blob_endpoints`, and reuses them for scoped fan-out.
Absolute URLs yield new hostnames, which are added as assets and queued for
`scan_http` + `detect_technology` — a second recursion path complementing the
js-worker's regex mining.

### `tech-worker` — queue: `detect_technology`
Calls **cultivate-api** for a URL, filters detections by `CONFIDENCE_THRESHOLD`,
and upserts `technologies` + `asset_technologies` (with version and icon). This is
what powers "which programs run Next.js 13?".

### `scheduler` (long-running loop)
Wakes every `SCHEDULER_TICK_MS` and re-feeds the pipeline so data stays fresh:
wildcard scopes older than `RESCAN_ENUM_INTERVAL_HOURS` get re-enumerated, and
assets not scanned within `RESCAN_HTTP_INTERVAL_HOURS` get a fresh `scan_http`.
`SCHEDULER_BATCH_SIZE` caps how many rows are re-queued per tick to avoid
thundering-herd load.
Unresolved assets that never completed a scan are retried separately every
`RESCAN_UNRESOLVED_INTERVAL_HOURS`, in batches capped by
`SCHEDULER_UNRESOLVED_BATCH_SIZE`. Manual imports and exact scope roots are
prioritized, while downstream queue limits prevent dead hosts from crowding
out productive work.

### `api` (Hono, long-running)
Runs DB migrations on boot, then serves read queries: assets by technology or
library, programs affected by a CVE, per-asset technologies/libraries, and the
`/js/grep` endpoint that decompresses stored blobs and greps them for a pattern.

### `frontend` (Next.js, long-running)
The UI. Queries Postgres directly for reads (assets, libraries, stats) and posts
to its own API routes for writes (private programs, bulk subdomains) — those
enqueue BullMQ jobs. `/js/grep` is proxied to the `api` service because grepping
needs MinIO access.

### `cultivate-api` (long-running)
Wappalyzer-style fingerprinting service consumed by `tech-worker`. Headless-
browser based, isolated in its own container.

---

## Database Schema

| Table                | Description                              |
| -------------------- | ---------------------------------------- |
| `programs`           | Bug bounty program names and platforms   |
| `scopes`             | Raw scope entries per program            |
| `assets`             | Discovered domains/subdomains            |
| `web_services`       | Live HTTP services + httpx enrichment (server, ip, cname, cdn, favicon hash, jarm, tech, headers) |
| `javascript_files`   | JS file URLs per service + sha256/size   |
| `js_blobs`           | Content-addressable JS bodies (deduped, zstd, in MinIO) |
| `js_libraries`       | Detected JS libraries + versions + CVEs  |
| `blob_endpoints`     | Deduplicated high-signal endpoints per JS SHA |
| `endpoints`          | Empty compatibility table for legacy installs |
| `technologies`       | Unique technology + version records      |
| `asset_technologies` | Many-to-many: assets ↔ technologies      |

---

## Tech Stack

| Layer            | Technology              |
| ---------------- | ----------------------- |
| Language         | TypeScript (strict)     |
| Runtime          | Node.js                 |
| Database         | PostgreSQL              |
| ORM              | Drizzle ORM             |
| Queue            | BullMQ + Redis          |
| API Framework    | Hono                    |
| Frontend         | Next.js 15 + Tailwind   |
| Containerization | Docker + Docker Compose |
| Package Manager  | pnpm (monorepo)         |

---

## Prerequisites

- Docker >= 24
- Docker Compose >= 2.20

---

## Setup & Run

```bash
# 1. Copy environment config
cp .env.example .env

# 2. Start everything
docker compose up -d

# 3. Scope importer runs automatically on startup
# Workers start consuming jobs immediately
```

The API will be available at `http://localhost:3000`.
The frontend will be available at `http://localhost:3001`.
The MinIO console (stored JS blobs) is at `http://localhost:9001`.

### Per-environment configuration

Don't edit the tracked `docker-compose.yml` for machine-specific changes — it
will conflict on every pull. Instead put local tweaks (ports, secrets, keys,
scaling) in a git-ignored override that Compose merges automatically:

```bash
cp docker-compose.override.example.yml docker-compose.override.yml
# edit docker-compose.override.yml, then:
docker compose up -d
```

Application secrets and tunables live in `.env` (also git-ignored).

---

## Frontend

A web UI for browsing, filtering, and exporting discovered assets, available at `http://localhost:3001`.

**Features:**

- **Assets Browser**: Search assets by domain, filter by technology, platform, program, and VDP eligibility, and export matching domains to `.txt`.
- **JS Hunt (CVE hunting & grepping)**: 
  - **JS Signature Grep**: Perform ad-hoc regex queries across all unique stored JS blobs in MinIO (e.g. for endpoints, API keys, credentials).
  - **CVE Hunting**: List all detected libraries containing known security vulnerabilities, and inspect exactly which subdomains and programs are affected.
  - **Library Search**: Query standard libraries catalogued on target assets and view instances.
- **Manage Scopes**:
  - **Add Private Programs**: Insert new target programs and configure their wildcard or standalone scope rules.
  - **Add Bulk Subdomains**: Ingest subdomains in bulk for any selected program. Wildcards trigger passive/active enumeration workers, and standalone subdomains are mapped to relevant scopes and enqueued for HTTP scanning immediately.
- **Stats**: Live overview of database size, per-table counts, JS blob storage (dedup + compression ratio), pipeline queue depths and the last scan time.

### Adding private programs

Public scopes sync automatically from bounty-targets-data. For private / invite-only targets that aren't in that dataset, open **manage** at `http://localhost:3001/programs/manage`:

1. **New program** — enter a name and platform, then one scope per line. A wildcard like `*.example.com` queues subdomain enumeration (subfinder + crt.sh + gau → dnsx); a bare host (e.g. `app.example.com`) is scanned directly.
2. **Bulk subdomains** — pick a program and paste hostnames you already have. Each is matched to an existing scope (or a new one is created) and queued straight into the scan → JS → tech/library pipeline.

Everything added this way flows through the same workers as public scopes, so it shows up in the Assets browser and JS Hunt as it gets processed.

---

## API Endpoints

| Method | Path                                            | Description                       |
| ------ | ----------------------------------------------- | --------------------------------- |
| `GET`  | `/assets/by-technology?name=Next.js`            | Assets using a technology         |
| `GET`  | `/assets/by-technology?name=Next.js&version=13` | Assets using specific version     |
| `GET`  | `/programs/:id/assets`                          | All assets for a program          |
| `GET`  | `/assets/:domain/subdomains`                    | Subdomains of a target            |
| `GET`  | `/programs/by-technology?name=Apache`           | Programs affected by a technology |
| `GET`  | `/assets/:domain/technologies`                  | Technologies detected on an asset |
| `GET`  | `/libraries?name=lodash`                        | Detected JS libraries + versions  |
| `GET`  | `/libraries/vulnerable`                         | Libraries with known CVEs         |
| `GET`  | `/libraries/:name/assets?version=4.17.20`       | Assets/programs using a library (CVE cross-ref) |
| `GET`  | `/assets/:id/libraries`                         | JS libraries detected on an asset |
| `GET`  | `/js/grep?q=<regex>&limit=300`                  | Grep an arbitrary signature across stored JS |
| `GET`  | `/health`                                       | Health check                      |

---

## Environment Variables

| Variable                  | Default                                      | Description                                             |
| ------------------------- | -------------------------------------------- | ------------------------------------------------------- |
| `DATABASE_URL`            | `postgresql://yaad:yaad@localhost:5432/yaad` | PostgreSQL connection string                            |
| `REDIS_URL`               | `redis://localhost:6379`                     | Redis connection string                                 |
| `CULTIVATE_API_URL`       | `http://cultivate-api:3000`                  | Tech detection service URL                              |
| `LOG_LEVEL`               | `info`                                       | Log verbosity (`debug`, `info`, `warn`, `error`)        |
| `CONFIDENCE_THRESHOLD`    | `50`                                         | Min confidence (0–100) to store a detected technology   |
| `WORKER_CONCURRENCY`      | `5`                                          | Concurrent jobs per worker                              |
| `TECH_WORKER_CONCURRENCY` | `3`                                          | Concurrent jobs for tech detection                      |
| `PORT`                    | `3000`                                       | API server port                                         |
| `FRONTEND_PORT`           | `3001`                                       | Frontend server port                                    |
| `PDCP_API_KEY`            | _(optional)_                                 | ProjectDiscovery Cloud API key for enhanced enumeration |
| `CRTSH_ENABLED`           | `true`                                       | Use crt.sh as an enumeration source                     |
| `GAU_ENABLED`             | `true`                                       | Use gau (historical URLs) as an enumeration source      |
| `CRTSH_TIMEOUT_MS`        | `30000`                                      | Total deadline for one crt.sh request                    |
| `PDCP_TIMEOUT_MS`         | `60000`                                      | Total deadline for one paginated PDCP lookup            |
| `MAX_RECURSION_DEPTH`     | `2`                                          | How deep to recurse on JS-discovered subdomains         |
| `STORE_JS_BLOBS`          | `true`                                       | Download and store JS bodies in MinIO                   |
| `S3_ENDPOINT`             | `minio:9000`                                 | MinIO/S3 endpoint (`host:port`)                         |
| `S3_ACCESS_KEY`           | `yaad`                                       | MinIO/S3 access key                                     |
| `S3_SECRET_KEY`           | `yaadyaad`                                    | MinIO/S3 secret key                                     |
| `S3_BUCKET`               | `js-blobs`                                    | Bucket for stored JS blobs                              |
| `JS_MAX_BYTES`            | `10485760`                                    | Max JS file size to download/store (10 MB)              |
| `API_URL`                 | `http://api:3000`                             | Backend API URL used by the frontend to proxy `/js/grep` |
