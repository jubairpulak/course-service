FROM node:20-bookworm-slim

WORKDIR /app

# ✅ Needed for:
# - Prisma engine (openssl + certs)
# - compose watch / nodemon helpers (ps -> procps)
# - some native modules stability (libc6, etc - already there but ok)
RUN apt-get update && apt-get install -y --no-install-recommends \
    openssl \
    ca-certificates \
    procps \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install

COPY prisma ./prisma
RUN npx prisma generate

COPY . .

EXPOSE 4006
CMD ["npm", "run", "start:dev"]
