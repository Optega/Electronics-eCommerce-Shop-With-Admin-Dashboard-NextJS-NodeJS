# Використовуємо Debian-базу, а не Alpine
FROM node:18-slim

# Встановлюємо залежності OpenSSL
RUN apt-get update && apt-get install -y openssl libssl-dev ca-certificates && rm -rf /var/lib/apt/lists/*

# Робоча директорія
WORKDIR /app

# Копіюємо залежності
COPY package*.json ./

# Встановлюємо залежності
RUN npm ci

# Копіюємо весь код
COPY . .

# Генеруємо Prisma клієнт
RUN npx prisma generate

# Білдимо застосунок
RUN npm run build

# Порт
EXPOSE 3002

# Запуск
CMD ["npm", "start"]
