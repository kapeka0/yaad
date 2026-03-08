FROM node:20-alpine AS base

# Install subfinder
RUN apk add --no-cache wget tar unzip
RUN ARCH=$(uname -m | sed 's/x86_64/amd64/;s/aarch64/arm64/') && \
    wget -qO /tmp/subfinder.tar.gz \
    "https://github.com/projectdiscovery/subfinder/releases/download/v2.6.6/subfinder_2.6.6_linux_${ARCH}.zip" && \
    cd /tmp && unzip subfinder.tar.gz -d /usr/local/bin/ && \
    chmod +x /usr/local/bin/subfinder && \
    rm /tmp/subfinder.tar.gz

RUN npm install -g pnpm
WORKDIR /app

COPY pnpm-workspace.yaml package.json pnpm-lock.yaml tsconfig.base.json ./
COPY packages/ ./packages/
COPY services/subdomain-worker/ ./services/subdomain-worker/

RUN pnpm install --frozen-lockfile --filter subdomain-worker...
RUN pnpm --filter subdomain-worker build

CMD ["node", "services/subdomain-worker/dist/index.js"]
