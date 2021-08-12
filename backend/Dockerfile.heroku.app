FROM node:12-alpine3.10 as node-image

WORKDIR /backend
COPY . .
RUN npm install
RUN npm run build

FROM node:12-alpine3.10
RUN apk update
RUN apk add --upgrade --no-cache g++ python3 openjdk11

WORKDIR /backend
COPY package.json .
RUN npm install --only=production
COPY --from=node-image /backend/dist ./dist

WORKDIR /backend/dist
CMD ["node", "index.js"]
