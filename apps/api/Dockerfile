# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Enable corepack for npm workspaces
RUN corepack enable

# Copy root configurations and workspaces
COPY package.json package-lock.json turbo.json ./
COPY apps/api/package.json ./apps/api/
COPY packages/database/package.json ./packages/database/
COPY packages/types/package.json ./packages/types/
COPY packages/eslint-config/package.json ./packages/eslint-config/
COPY packages/typescript-config/package.json ./packages/typescript-config/

# Install dependencies for the relevant workspaces
RUN npm ci

# Copy the rest of the source code
COPY . .

# Generate Prisma Client specifically
RUN npx prisma generate --schema=./packages/database/prisma/schema.prisma

# Build the API
RUN npm run build --workspace=api

# Production stage
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy necessary files from builder
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/apps/api/package.json ./apps/api/
COPY --from=builder /app/packages/database/package.json ./packages/database/
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages/database/prisma ./packages/database/prisma

EXPOSE 3000

# Start the NestJS application
CMD ["node", "apps/api/dist/src/main"]
