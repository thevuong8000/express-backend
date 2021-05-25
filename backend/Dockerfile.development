FROM node:16.2-alpine3.11 as node-image

WORKDIR /backend
COPY . .

RUN npm install

CMD ["npm", "run", "dev"]
