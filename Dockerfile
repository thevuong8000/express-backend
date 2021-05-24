FROM node:16.2-alpine3.11 as node-image

WORKDIR /app
COPY . .

RUN npm install

CMD ["npm", "run", "dev"]
