FROM node:22-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN apt update && apt install -y openssl
COPY package.json /app/
COPY pnpm-lock.yaml /app/
WORKDIR /app

FROM base AS dev-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

FROM base
COPY --from=dev-deps /app/node_modules /app/node_modules
COPY . .

EXPOSE 8585
RUN pnpx prisma generate
CMD pnpm dev
