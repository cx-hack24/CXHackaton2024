FROM node:18-alpine

WORKDIR /app

RUN mkdir -p /app/data

COPY package*.json ./
RUN npm install
COPY index.js ./

EXPOSE 3000

CMD ["node", "index.js"]