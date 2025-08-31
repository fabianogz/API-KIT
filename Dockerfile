FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY dist/ ./dist/
COPY .env.example ./.env

EXPOSE 3000

USER node

CMD ["npm", "start"]
