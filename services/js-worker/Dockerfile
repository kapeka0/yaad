FROM node:20-alpine AS base

# Install getJS (Go tool by 003random)
RUN apk add --no-cache go
RUN go install github.com/003random/getJS/v2@latest
ENV PATH=$PATH:/root/go/bin

RUN npm install -g pnpm

WORKDIR /app

COPY pnpm-workspace.yaml package.json pnpm-lock.yaml tsconfig.base.json ./
COPY packages/ ./packages/
COPY services/js-worker/ ./services/js-worker/

RUN pnpm install --frozen-lockfile --filter js-worker...
RUN pnpm --filter js-worker build

CMD ["node", "services/js-worker/dist/index.js"]
