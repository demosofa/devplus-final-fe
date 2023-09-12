# # 1. Build
# FROM node:16.18-alpine as builder
# # Set working directory
# WORKDIR /app
# #
# COPY package.json .

# COPY yarn.lock .
# # Same as npm install
# RUN npm install
# COPY . .
# RUN npm run build

# # 2. For Nginx setup
# FROM nginx:1.23.1-alpine
# COPY --from=builder /app/dist /usr/share/nginx/html
# COPY --from=builder /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 3000
# CMD ["nginx", "-g", "daemon off;"]

FROM ubuntu:18.04

RUN apt update -y \
    && apt install nginx -y \
    && apt-get install software-properties-common -y \
    && add-apt-repository ppa:certbot/certbot -y \
    && apt-get update -y \
    && apt-get install python-certbot-nginx -y \
    && apt-get clean

FROM node:16.18-alpine as builder

WORKDIR /app

COPY package.json .

COPY yarn.lock .

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.23.1-alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY --from=builder /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]