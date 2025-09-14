FROM  node:20-bookworm AS builder

WORKDIR /usr/src/app

COPY  package*.json tsconfig*.json ./
COPY  ./prisma/schemas ./prisma/schemas
RUN npm i -g npm && npm ci

COPY . .
RUN npm run build && npm prune --omit=dev

FROM node:20-bookworm AS runner

RUN apt-get update && apt-get install -y tini && rm -rf /var/lib/apt/lists/*

ENTRYPOINT ["/usr/bin/tini", "--"]

WORKDIR /usr/src/app

COPY  --from=builder /usr/src/app/node_modules ./node_modules
COPY  --from=builder /usr/src/app/build ./build

CMD [ "node", "build/main" ]