# CLAUDE.md

## Project

**Name:** Yet Another Asset Database (YAAD)

**Goal:**
Create a scalable system that collects assets from bug bounty programs, enumerates their infrastructure, detects technologies used, and stores everything in a database so security researchers can quickly identify which programs are affected when a vulnerability (e.g., a CVE) impacts a specific technology.

The system must:

- Import bug bounty program scopes
- Enumerate subdomains and web assets
- Extract JavaScript endpoints and additional subdomains
- Detect technologies used by each asset
- Store all results in a structured PostgreSQL database
- Allow querying assets by technology

Example use case:
If a CVE appears in a technology (e.g. Next.js, Apache, etc.), the database should allow retrieving all assets using that technology across bug bounty programs so they can be tested and reported.

---

# Core Data Source

Scopes must be imported from:

https://github.com/arkadiyt/bounty-targets-data

The system should periodically sync this repository and parse the following files:

- `data/*.json`

Extract:

- Program name
- Domain
- Scope type
- Eligibility
- Asset identifiers
- Wildcards

Store these in the database.

---

# Technology Detection

Technologies must be detected using:

https://github.com/kapeka0/cultivate-api

Claude must:

1. Read the source code of cultivate-api to understand how it works.
2. Implement a service that queries this API to detect technologies used by each discovered asset.
3. Store technologies per asset in the database.

---

# Asset Enumeration Pipeline

If the scope asset is a **wildcard domain**, the system must run the following pipeline:

subfinder → httpx → getJS → linkfinder → subdomain extraction

Pipeline description:

1. **subfinder**

   - enumerate subdomains

2. **httpx**

   - identify live HTTP services

3. **getJS**

   - extract JavaScript files

4. **linkfinder**

   - extract endpoints from JS

5. **subdomain extraction**

   - parse endpoints and JS files to discover additional subdomains

All discovered assets must be added back into the database.

---

# Architecture Requirements

The system must be **modular and scalable**.

Use a **microservice architecture**.

Each task must run in its own service.

Example services:

### 1. Scope Importer

Responsibilities:

- Pull bounty-targets-data
- Parse scopes
- Insert/update programs and root assets

### 2. Subdomain Enumerator

Responsibilities:

- Run subfinder
- Store discovered subdomains

### 3. HTTP Scanner

Responsibilities:

- Run httpx
- Detect live web services

### 4. JS Collector

Responsibilities:

- Run getJS
- Store JS URLs

### 5. Endpoint Analyzer

Responsibilities:

- Run linkfinder
- Extract endpoints
- Extract additional subdomains

### 6. Technology Detection Service

Responsibilities:

- Query cultivate-api
- Store technologies used by each asset

### 7. API Service

Responsibilities:
Provide queries such as:

- Get assets by technology
- Get assets by program
- Get subdomains of a target
- Get programs affected by a technology

---

# Tech Stack

Base language:

TypeScript

Runtime:

Node.js

Database:

PostgreSQL

ORM:

Drizzle ORM

Containerization:

Docker

Orchestration:

Docker Compose

---

# Database Design

Use PostgreSQL with Drizzle ORM.

Suggested schema:

## programs

- id
- name
- platform
- created_at

## scopes

- id
- program_id
- asset
- type
- wildcard
- in_scope
- created_at

## assets

- id
- scope_id
- domain
- first_seen
- last_seen

## web_services

- id
- asset_id
- url
- status
- title
- tech_fingerprint
- last_scanned

## javascript_files

- id
- service_id
- url

## endpoints

- id
- js_id
- endpoint

## technologies

- id
- name
- version

## asset_technologies

- asset_id
- technology_id

---

# Scalability

The system must be designed to support:

- horizontal scaling
- distributed scanning
- asynchronous job queues

Claude should consider using:

- Redis
- BullMQ or similar queue system

Workers should consume jobs like:

- enumerate_subdomains
- scan_http
- collect_js
- analyze_js
- detect_technology

---

# Docker Requirements

Everything must run in Docker.

Required containers:

- postgres
- redis
- api
- scope-importer
- subdomain-worker
- httpx-worker
- js-worker
- endpoint-worker
- tech-detection-worker

Create a **docker-compose.yml** that launches the entire system.

---

# Folder Structure

Suggested layout:

/yaad
/services
/api
/scope-importer
/subdomain-worker
/httpx-worker
/js-worker
/endpoint-worker
/tech-worker

/packages
/db
/types
/queue
/config

/docker
docker-compose.yml

---

# Additional Requirements

- Everything must be written in TypeScript.
- Use strict typing.
- All services must share a common DB package.
- Environment variables must be used for configuration.
- Logs must be structured.

---

# Important Instruction for Claude

Before implementing anything:

1. Analyze the repositories mentioned above.
2. Propose the final architecture.
3. Ask clarification questions if something is ambiguous.
4. Then generate the project step by step.

Claude **must ask questions whenever requirements are unclear** before writing code.
