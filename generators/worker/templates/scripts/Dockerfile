FROM booster-base:10

MAINTAINER Johnny

USER root

ARG ENV

ENV ROOT_APP_DIR=/<%= appName %>
ENV PORT=80
RUN export NODE_ENV=${ENV}

WORKDIR $ROOT_APP_DIR

COPY ./.npmrc $ROOT_APP_DIR/.npmrc
COPY ./package.json $ROOT_APP_DIR/package.json

RUN npm install --no-optional

ADD ./src $ROOT_APP_DIR/src

EXPOSE $PORT
CMD npm start
