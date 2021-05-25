# syntax=docker/dockerfile:experimental

FROM node:12-alpine3.10 as node-image

RUN apk update && apk upgrade
RUN apk add --no-cache bash git openssh

# add credentials on build
ARG SSH_PRIVATE_KEY
RUN mkdir -p /root/.ssh/ && \
    chmod 0700 /root/.ssh
RUN echo "${SSH_PRIVATE_KEY}" > /root/.ssh/id_rsa && \
    chmod 600 /root/.ssh/id_rsa

# make sure your domain is accepted
RUN touch /root/.ssh/known_hosts
RUN ssh-keyscan github.com >> /root/.ssh/known_hosts

WORKDIR /app
RUN git clone git@github.com:thevuong8000/react-frontend.git
WORKDIR /app/react-frontend
RUN npm install
RUN npm run build:production

FROM nginx:1.19.10-alpine
COPY --from=node-image /app/react-frontend/build /usr/share/nginx/html
