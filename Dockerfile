# Node 16.14.2
FROM node:lts-alpine3.15 AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g npm

RUN npm install -g rimraf

RUN yarn

COPY . .

FROM node:lts-alpine3.15 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]