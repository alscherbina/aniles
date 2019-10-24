FROM node:12.13-alpine

RUN npm i -g @nestjs/cli

WORKDIR /usr/src/app

COPY . ./

RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]
