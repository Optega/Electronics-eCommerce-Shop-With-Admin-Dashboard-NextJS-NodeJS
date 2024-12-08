# Використовуємо офіційний образ Node.js
FROM node:18-alpine

# Встановлюємо робочу директорію
WORKDIR /server

# Копіюємо package.json і package-lock.json для встановлення залежностей
COPY package*.json ./

# Встановлюємо залежності
RUN npm ci

# Копіюємо решту коду додатку
COPY . .

# Генеруємо Prisma клієнт
RUN npx prisma generate

# Відкриваємо порт
EXPOSE 3001

# Запускаємо додаток
CMD ["node", "app.js"]
