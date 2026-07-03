FROM node:20-alpine AS base
RUN npm install -g pnpm
WORKDIR /app

COPY pnpm-workspace.yaml package.json pnpm-lock.yaml tsconfig.base.json ./
COPY packages/ ./packages/
COPY services/scheduler/ ./services/scheduler/

RUN pnpm install --frozen-lockfile --filter scheduler...
RUN pnpm --filter scheduler build

CMD ["node", "services/scheduler/dist/index.js"]
