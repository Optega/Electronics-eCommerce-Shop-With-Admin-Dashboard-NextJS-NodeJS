# Використовуємо офіційний образ Node.js
FROM node:18-alpine

# Встановлюємо робочу директорію
WORKDIR /app

# Копіюємо package.json і package-lock.json для встановлення залежностей
COPY package*.json ./

# Встановлюємо залежності
RUN npm ci

# Копіюємо решту коду додатку
COPY . .

# Будуємо додаток
RUN npm run build

# Відкриваємо порт для фронтенду
EXPOSE 3002

# Запускаємо додаток
CMD ["npm", "start"]
