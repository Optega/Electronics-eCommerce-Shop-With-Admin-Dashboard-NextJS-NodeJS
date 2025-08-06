# Використовуємо Alpine Node.js
FROM node:18-alpine

# Додаємо openssl 1.1, який потрібен Prisma
RUN apk add --no-cache openssl1.1

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

# (Опційно) Деплой міграцій — якщо хочеш це в продакшн
RUN npx prisma migrate deploy

# Будуємо застосунок
RUN npm run build

# Відкриваємо порт
EXPOSE 3002

# Запуск
CMD ["npm", "start"]
