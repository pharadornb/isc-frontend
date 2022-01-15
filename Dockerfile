FROM node:lts-alpine

WORKDIR /app

COPY . .

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./

COPY yarn.lock ./

RUN yarn add node-sass

RUN yarn

COPY . ./

EXPOSE 80

CMD ["yarn", "start"]