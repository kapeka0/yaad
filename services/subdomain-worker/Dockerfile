FROM node:20-alpine AS base

# Install subfinder + dnsx (ProjectDiscovery) and gau (lc)
RUN apk add --no-cache wget tar unzip
RUN ARCH=$(uname -m | sed 's/x86_64/amd64/;s/aarch64/arm64/') && \
    wget -qO /tmp/subfinder.zip \
    "https://github.com/projectdiscovery/subfinder/releases/download/v2.6.6/subfinder_2.6.6_linux_${ARCH}.zip" && \
    unzip /tmp/subfinder.zip -d /usr/local/bin/ && \
    wget -qO /tmp/dnsx.zip \
    "https://github.com/projectdiscovery/dnsx/releases/download/v1.2.1/dnsx_1.2.1_linux_${ARCH}.zip" && \
    unzip /tmp/dnsx.zip -d /usr/local/bin/ && \
    wget -qO /tmp/gau.tar.gz \
    "https://github.com/lc/gau/releases/download/v2.2.4/gau_2.2.4_linux_${ARCH}.tar.gz" && \
    tar -xzf /tmp/gau.tar.gz -C /usr/local/bin/ gau && \
    chmod +x /usr/local/bin/subfinder /usr/local/bin/dnsx /usr/local/bin/gau && \
    rm /tmp/subfinder.zip /tmp/dnsx.zip /tmp/gau.tar.gz

RUN npm install -g pnpm
WORKDIR /app

COPY pnpm-workspace.yaml package.json pnpm-lock.yaml tsconfig.base.json ./
COPY packages/ ./packages/
COPY services/subdomain-worker/ ./services/subdomain-worker/

RUN pnpm install --frozen-lockfile --filter subdomain-worker...
RUN pnpm --filter subdomain-worker build

CMD ["node", "services/subdomain-worker/dist/index.js"]
