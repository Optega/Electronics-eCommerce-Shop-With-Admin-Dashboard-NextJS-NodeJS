FROM node:18

WORKDIR /server

COPY package*.json ./
RUN npm ci

COPY . .

RUN npx prisma generate
RUN npx prisma migrate deploy

EXPOSE 3001

CMD ["node", "app.js"]
