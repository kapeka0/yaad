FROM node:20-alpine AS base
RUN npm install -g pnpm
WORKDIR /app

COPY pnpm-workspace.yaml package.json pnpm-lock.yaml tsconfig.base.json ./
COPY packages/ ./packages/
COPY services/api/ ./services/api/

RUN pnpm install --frozen-lockfile --filter api...
RUN pnpm --filter api build

CMD ["node", "services/api/dist/index.js"]
