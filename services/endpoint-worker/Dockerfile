# Node 22 is required to decompress zstd-backed content-addressed JS blobs.
FROM node:22-alpine AS base

# Install Python 3 and linkfinder
RUN apk add --no-cache python3 py3-pip git
RUN pip3 install --break-system-packages jsbeautifier requests
RUN git clone https://github.com/GerbenJavado/LinkFinder.git /opt/linkfinder && \
    pip3 install --break-system-packages -r /opt/linkfinder/requirements.txt

RUN npm install -g pnpm
WORKDIR /app

COPY pnpm-workspace.yaml package.json pnpm-lock.yaml tsconfig.base.json ./
COPY packages/ ./packages/
COPY services/endpoint-worker/ ./services/endpoint-worker/

RUN pnpm install --frozen-lockfile --filter endpoint-worker...
RUN pnpm --filter endpoint-worker build

CMD ["node", "services/endpoint-worker/dist/index.js"]
