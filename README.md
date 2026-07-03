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
| `api`              | REST API for querying the database              | Hono             |
| `frontend`         | Web UI for browsing and exporting assets        | Next.js 15       |
| `cultivate-api`    | Technology fingerprinting service               | Wappalyzer-based |

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
   └─ runs linkfinder on each JS file
   └─ stores endpoints
   └─ extracts new subdomains → enqueues scan_http + detect_technology

6. tech-worker
   └─ queries cultivate-api for each asset URL
   └─ stores technologies + asset_technologies
```

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
| `endpoints`          | Endpoints extracted from JS files        |
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
| `MAX_RECURSION_DEPTH`     | `2`                                          | How deep to recurse on JS-discovered subdomains         |
| `STORE_JS_BLOBS`          | `true`                                       | Download and store JS bodies in MinIO                   |
| `S3_ENDPOINT`             | `minio:9000`                                 | MinIO/S3 endpoint (`host:port`)                         |
| `S3_ACCESS_KEY`           | `yaad`                                       | MinIO/S3 access key                                     |
| `S3_SECRET_KEY`           | `yaadyaad`                                    | MinIO/S3 secret key                                     |
| `S3_BUCKET`               | `js-blobs`                                    | Bucket for stored JS blobs                              |
| `JS_MAX_BYTES`            | `10485760`                                    | Max JS file size to download/store (10 MB)              |
