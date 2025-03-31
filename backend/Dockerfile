# Use an official Node.js runtime as a parent image
FROM node:18

# Install pnpm globally
RUN npm install -g pnpm

# Set the working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN pnpm install --frozen-lockfile

# Copy the source code
COPY . .

# Expose the port that your app listens on
EXPOSE 3001

# Command to run your app
CMD ["pnpm", "start"]
