# Imagen base — Node 18 en Alpine (versión liviana de Linux)
FROM node:18-alpine

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar primero solo los archivos de dependencias
# (esto aprovecha el cache de Docker: si no cambian, no reinstala)
COPY package*.json ./

# Instalar solo dependencias de producción (sin nodemon)
RUN npm install --omit=dev

# Copiar el resto del proyecto
COPY . .

# Puerto en el que corre la app
EXPOSE 3000

# Comando para arrancar
CMD ["node", "backend/app.js"]
