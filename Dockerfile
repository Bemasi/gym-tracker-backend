# Stage 1 - Build
FROM node:20-alpine AS builder

WORKDIR /app

# Instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar código fuente
COPY . .

# Compilar el proyecto
RUN npm run build

# Stage 2 - Runtime
FROM node:20-alpine

WORKDIR /app

# Copiar dependencias de producción y código compilado
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Variables de entorno
ENV NODE_ENV=production
ENV PORT=3000

# Exponer puerto
EXPOSE 3000

# Comando de arranque
CMD ["node", "dist/main.js"]