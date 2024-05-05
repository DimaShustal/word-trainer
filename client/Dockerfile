FROM node:20.12 AS build

WORKDIR /app
EXPOSE 8080
COPY package.json yarn.lock ./
RUN yarn install
COPY . ./
RUN yarn codegen
RUN yarn build

FROM nginx:1.26

# remove default configuration
RUN rm /etc/nginx/conf.d/default.conf

COPY --from=build /app/nginx.conf /etc/nginx/conf.d/app.conf
COPY --from=build /app/build /var/www/app
RUN cat /etc/nginx/conf.d/app.conf
