# Use Node.js LTS as the base image
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install system dependencies needed for Prisma
RUN apk add --no-cache libc6-compat openssl

# Install pnpm globally
RUN npm install -g pnpm

# Copy package files and lock file
COPY package.json pnpm-lock.yaml ./

# Copy tsconfig
COPY tsconfig.json ./

# Copy .env file for Prisma (can be overridden at runtime)
COPY .env ./

# Copy Prisma schema
COPY prisma/ ./prisma/

# Install dependencies
RUN pnpm install

# Generate Prisma client
RUN pnpm prisma generate

# Copy source code
COPY src/ ./src/

# Build TypeScript code
RUN pnpm build

# Create production image
FROM node:20-alpine AS runner

WORKDIR /app

# Install system dependencies for production
RUN apk add --no-cache libc6-compat openssl

# Install pnpm globally
RUN npm install -g pnpm

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/.env ./

# Expose the port the app will run on
EXPOSE 3001

# Command to run the application
CMD ["pnpm", "dev"]