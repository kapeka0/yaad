# Node 22 gives us built-in zstd (zlib.zstdCompress) — no native deps needed.
FROM node:22-alpine AS base

# Install getJS (Go) + retire.js (npm CLI, for library/CVE fingerprinting)
RUN apk add --no-cache go
RUN go install github.com/003random/getJS/v2@latest
ENV PATH=$PATH:/root/go/bin

RUN npm install -g pnpm retire

WORKDIR /app

COPY pnpm-workspace.yaml package.json pnpm-lock.yaml tsconfig.base.json ./
COPY packages/ ./packages/
COPY services/js-worker/ ./services/js-worker/

RUN pnpm install --frozen-lockfile --filter js-worker...
RUN pnpm --filter js-worker build

CMD ["node", "services/js-worker/dist/index.js"]
