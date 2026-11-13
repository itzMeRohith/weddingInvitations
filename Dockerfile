FROM node:24-alpine AS build
WORKDIR /app
COPY package.json build.mjs wedding-config.js ./
COPY index.html styles.css app.js ./
COPY *.webp ./
ARG SITE_URL
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /app/dist/ /usr/share/nginx/html/
EXPOSE 80
