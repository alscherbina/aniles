FROM node:12.13-alpine

WORKDIR /usr/src/app

RUN npm i -g @nestjs/cli

COPY . ./

ADD ./.env.docker ./.env

RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]
