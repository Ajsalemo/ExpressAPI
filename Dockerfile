FROM node:12-alpine

WORKDIR /app
COPY package.json /app
RUN yarn install && \
    yarn global add pm2

COPY . /app

EXPOSE 3000
CMD ["pm2", "start", "/app/ecosystem.config.js", "--no-daemon"]
