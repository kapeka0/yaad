FROM node:20-alpine AS base
RUN npm install -g pnpm
WORKDIR /app

COPY pnpm-workspace.yaml package.json pnpm-lock.yaml tsconfig.base.json ./
COPY packages/ ./packages/
COPY services/frontend/ ./services/frontend/

RUN pnpm install --frozen-lockfile --filter frontend...
RUN pnpm --filter @yaad/config build
RUN pnpm --filter @yaad/queue build
RUN pnpm --filter @yaad/db build
RUN pnpm --filter frontend build

EXPOSE 3001
CMD ["pnpm", "--filter", "frontend", "start"]
