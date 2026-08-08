# Node 22 for built-in zstd (used to decompress stored JS blobs in /js/grep).
FROM node:22-alpine AS base
RUN npm install -g pnpm
WORKDIR /app

COPY pnpm-workspace.yaml package.json pnpm-lock.yaml tsconfig.base.json ./
COPY packages/ ./packages/
COPY services/api/ ./services/api/

RUN pnpm install --frozen-lockfile --filter api...
RUN pnpm --filter api build \
  && node -e "const RE2=require('./services/api/node_modules/re2'); if (!new RE2('react','iu').test('React')) process.exit(1)"

CMD ["node", "services/api/dist/index.js"]
