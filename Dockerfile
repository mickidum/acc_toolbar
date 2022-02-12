FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

RUN apk add g++ make python2
RUN npm install -g gulp
RUN npm install

ENTRYPOINT ["./docker_entrypoints/app-entrypoint.sh"]
