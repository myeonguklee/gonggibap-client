# Stage 1: Build the Next.js app
FROM node:18 AS builder

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js app
RUN npm run build

# Stage 2: Run the Next.js app with PM2
FROM node:18

# Set the working directory
WORKDIR /app

# Copy the build output from the previous stage
COPY --from=builder /app ./

# Install only production dependencies
RUN npm install --only=production

# Install PM2 globally
RUN npm install pm2 -g

# Install pm2-server-monit to expose metrics on port 9615
RUN pm2 install pm2-metrics

# Set environment variable to specify a custom port (e.g., 4000)
ENV PORT=4000

# Expose the ports for Next.js app and PM2 metrics
EXPOSE 4000
EXPOSE 9209

# Start the Next.js server with PM2
CMD ["pm2-runtime", "npm", "--", "start"]
