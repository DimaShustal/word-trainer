FROM node:20.12

WORKDIR /app
EXPOSE 4000
COPY package.json yarn.lock ./
RUN yarn install
COPY . ./
RUN yarn build
CMD [ "yarn", "start:prod" ]
