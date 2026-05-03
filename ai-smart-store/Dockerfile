# Stage 1: Build the React frontend
FROM node:22-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Stage 2: Setup the Node.js backend
FROM node:22-alpine
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install --production
COPY backend/ ./

# Copy the built frontend static files to the backend's public directory
COPY --from=frontend-builder /app/frontend/dist ./public

# Expose the port Express will run on
EXPOSE 8080

# Start the server
CMD ["node", "server.js"]
