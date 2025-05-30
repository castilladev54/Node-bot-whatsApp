FROM node:20-slim

# Instala las dependencias necesarias para que Puppeteer funcione
RUN apt-get update && apt-get install -y \
  wget \
  ca-certificates \
  fonts-liberation \
  libappindicator3-1 \
  libasound2 \
  libatk-bridge2.0-0 \
  libatk1.0-0 \
  libcups2 \
  libdbus-1-3 \
  libgdk-pixbuf2.0-0 \
  libnspr4 \
  libnss3 \
  libx11-xcb1 \
  libxcomposite1 \
  libxdamage1 \
  libxrandr2 \
  xdg-utils \
  --no-install-recommends && \
  rm -rf /var/lib/apt/lists/*

# Crea un usuario sin permisos de root para ejecutar Puppeteer de forma segura
RUN useradd -m pptruser
USER pptruser

WORKDIR /app

# Copia los archivos del proyecto e instala dependencias
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8080

CMD ["node", "src/server.js"]
