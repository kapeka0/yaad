FROM node:20-alpine AS base
RUN npm install -g pnpm
WORKDIR /app

COPY pnpm-workspace.yaml package.json pnpm-lock.yaml tsconfig.base.json ./
COPY packages/ ./packages/
COPY services/scope-importer/ ./services/scope-importer/

RUN pnpm install --frozen-lockfile --filter scope-importer...
RUN pnpm --filter scope-importer build

CMD ["node", "services/scope-importer/dist/index.js"]
