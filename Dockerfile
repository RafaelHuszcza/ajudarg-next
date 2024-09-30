FROM node:20-alpine AS base


FROM base as dependencies
RUN apk add --no-cache libc6-compat

WORKDIR /usr/src/app

COPY package.json  ./

RUN npm install

FROM base AS builder

WORKDIR /usr/src/app

COPY --from=dependencies /usr/src/app/node_modules ./node_modules
COPY . .


RUN npx prisma generate
RUN npm run build

FROM base AS deploy

WORKDIR /usr/src/app

ARG ENVIRONMENT
ENV NODE_ENV $ENVIRONMENT

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /usr/src/app/public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /usr/src/app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /usr/src/app/.next/static ./.next/static

USER nextjs

CMD ["node", "server.js"]
