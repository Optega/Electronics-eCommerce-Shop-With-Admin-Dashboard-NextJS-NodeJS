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

RUN npx prisma migrate deploy --create-only

# Відкриваємо порт
EXPOSE 3001

# Запускаємо додаток
CMD ["node", "app.js"]
