# 1️⃣ Build stage
FROM node:20-bullseye AS build
 
# Set working directory
WORKDIR /app
 
# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm ci
 
# Copy the rest of the project
COPY . .
 
# Build the project
RUN npm run build
 
# 2️⃣ Run stage
FROM node:20-bullseye
 
WORKDIR /app
 
# Copy built files and node_modules from build stage
COPY --from=build /app /app
 
# Expose port used by Vite preview
EXPOSE 4173
 
# Start Vite preview
CMD ["npm", "run", "preview"]
