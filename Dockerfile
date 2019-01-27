FROM node:alpine

RUN apk add --no-cache git

RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app

CMD sh
