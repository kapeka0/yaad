FROM node:20-alpine AS base
RUN npm install -g pnpm
WORKDIR /app

COPY pnpm-workspace.yaml package.json pnpm-lock.yaml tsconfig.base.json ./
COPY packages/ ./packages/
COPY services/tech-worker/ ./services/tech-worker/

RUN pnpm install --frozen-lockfile --filter tech-worker...
RUN pnpm --filter tech-worker build

CMD ["node", "services/tech-worker/dist/index.js"]
