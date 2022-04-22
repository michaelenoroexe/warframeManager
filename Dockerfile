FROM node:17-alpine as node

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build 
#CMD npm start   #FOR TESTING PURPOSES
#STAGE 2
FROM nginx:1.17.1-alpine
COPY nginx/ /etc/nginx/
RUN apk add curl
COPY --from=node /app/dist/warframe-resources /usr/share/nginx/html
EXPOSE 80
EXPOSE 49153