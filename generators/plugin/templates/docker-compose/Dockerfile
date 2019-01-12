FROM booster-base:10

MAINTAINER Johnny

USER root

ARG ENV

ENV ROOT_APP_DIR=/<%= appName %>
ENV PORT=80
RUN export NODE_ENV=${ENV}

WORKDIR $ROOT_APP_DIR

ADD ./ $ROOT_APP_DIR/

RUN npm install --no-optional

EXPOSE $PORT
