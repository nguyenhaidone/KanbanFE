## Build
FROM node:14-alpine AS builder
WORKDIR /app
COPY . .
RUN npm i
RUN npm run build

FROM nginx:alpine
COPY --from=builder  /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf