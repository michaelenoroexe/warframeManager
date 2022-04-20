FROM node:17-alpine as node
WORKDIR /app
COPY . .
RUN npm install && \
    npm run build --prod
EXPOSE 4200
CMD npm run start 

