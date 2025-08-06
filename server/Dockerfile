# Використовуємо офіційний образ Node.js на Alpine
FROM node:18-alpine

# Додаємо бібліотеку OpenSSL 1.1, необхідну для Prisma
RUN apk add --no-cache openssl1.1

# Встановлюємо робочу директорію
WORKDIR /server

# Копіюємо залежності
COPY package*.json ./

# Встановлюємо залежності
RUN npm ci

# Копіюємо весь код
COPY . .

# Генеруємо Prisma клієнт
RUN npx prisma generate

# Запускаємо міграції (можна прибрати для production)
RUN npx prisma migrate deploy

# Відкриваємо порт
EXPOSE 3001

# Запускаємо додаток
CMD ["node", "app.js"]
