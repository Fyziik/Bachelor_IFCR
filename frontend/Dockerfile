FROM node:alpine AS build

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build

FROM nginx:1.27.2-alpine3.20
COPY --from=build /app/public /usr/share/nginx/html