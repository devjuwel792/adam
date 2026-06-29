# 1️⃣ Build stage
FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

# Rebuild native binaries (esbuild) for the current platform
RUN npm rebuild esbuild

COPY . .

RUN npm run build

# 2️⃣ Run stage
FROM node:20-alpine

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json

EXPOSE 4173

CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]
