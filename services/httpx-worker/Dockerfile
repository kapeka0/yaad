FROM node:20-alpine AS base

# Install httpx
RUN apk add --no-cache wget unzip
RUN ARCH=$(uname -m | sed 's/x86_64/amd64/;s/aarch64/arm64/') && \
    wget -qO /tmp/httpx.zip \
    "https://github.com/projectdiscovery/httpx/releases/download/v1.6.6/httpx_1.6.6_linux_${ARCH}.zip" && \
    cd /tmp && unzip httpx.zip -d /usr/local/bin/ && \
    chmod +x /usr/local/bin/httpx && \
    rm /tmp/httpx.zip

RUN npm install -g pnpm
WORKDIR /app

COPY pnpm-workspace.yaml package.json pnpm-lock.yaml tsconfig.base.json ./
COPY packages/ ./packages/
COPY services/httpx-worker/ ./services/httpx-worker/

RUN pnpm install --frozen-lockfile --filter httpx-worker...
RUN pnpm --filter httpx-worker build

CMD ["node", "services/httpx-worker/dist/index.js"]
