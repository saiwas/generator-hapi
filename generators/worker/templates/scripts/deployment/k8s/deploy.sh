#!/bin/sh
docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD
docker pull xogroup/xo-helm:$K8_CLUSTER

INGRESS_HOST="${CNAME}"
SECRET_ENV=$ENV-env

docker run --rm xogroup/xo-helm:$K8_CLUSTER \
   upsert $APPLICATION-$ENV infrastructure/xo-app-manifest \
   --set replicaCount=2 \
   --set image.repository=$REPOSITORY \
   --set image.tag=$TAG \
   --set image.pullPolicy=Always \
   --set service.internalPort=80 \
   --set service.matchSelectors.application=$APPLICATION \
   --set service.matchSelectors.environment=$ENV \
   --set service.matchSelectors.role=$ROLE \
   --set labels.environment=$ENV \
   --set labels.stack=$STACK \
   --set labels.role=$ROLE \
   --set labels.application=$APPLICATION \
   --set ingress.enabled=true \
   --set ingress.hosts={$INGRESS_HOST} \
   --set ingress.tls.hosts={$INGRESS_HOST} \
   --set env[0].name=RAILS_LOG_TO_STDOUT,env[0].value=1 \
   --set env[1].name=RAILS_MAX_THREADS,env[1].value=10 \
   --set env[2].name=RAILS_SERVE_STATIC_FILES,env[2].value=1 \
   --set env[3].name=WEB_CONCURRENCY,env[3].value=2 \
   --set secretEnv[0].name=PG_URL,secretEnv[0].secretName=$SECRET_ENV,secretEnv[0].secretKey=PG_URL \
   --set secretEnv[1].name=REDIS_URL,secretEnv[1].secretName=$SECRET_ENV,secretEnv[1].secretKey=REDIS_URL \
   --set resources.requests.cpu=0.1 \
   --set resources.limits.cpu=0.5 \
   --set resources.requests.memory=1G \
   --set resources.limits.memory=2G \
   --set imagePullSecrets.name=$K8_DOCKER_SECRET \
   --namespace $NAMESPACE
