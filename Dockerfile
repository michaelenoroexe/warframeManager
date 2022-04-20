FROM node:17-alpine as node

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build 

#STAGE 2
FROM nginx:1.17.1-alpine
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=node /app/dist/warframe-resources /usr/share/nginx/html