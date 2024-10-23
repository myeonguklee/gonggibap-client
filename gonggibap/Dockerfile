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

# Stage 2: Run the Next.js app
FROM node:18

# Set the working directory
WORKDIR /app

# Copy the build output from the previous stage
COPY --from=builder /app ./


# Install only production dependencies
RUN npm install --only=production

# Set environment variable to specify a custom port (e.g., 4000)
ENV PORT=4000

# Expose the new port
EXPOSE 4000

# Start the Next.js server on the custom port
CMD ["npm", "run", "start"]
