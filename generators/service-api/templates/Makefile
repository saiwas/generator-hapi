env?=qa
pod?=''
image_name:=xogroup/<%= appName %>.booster.theknot.com
ifeq ($(env), production)
  k8_cluster=prod
  env_prefix=prod.
else
  k8_cluster=preprod
  env_prefix=qa.
endif
git_hash=$(shell git rev-parse HEAD)
tag?=$(git_hash)
repository:=<%= appName %>.$(env_prefix)
tagged_image:=$(repository):$(tag)
namespace=abtest
k8_docker_secret=docker-xogroup
cname=<%= appName %>.$(env_prefix)booster.theknot.com
application=booster-api-<%= appName %>
role=api
stack=booster

build_base:
	sh ./scripts/deployment/build-base.sh

build: build_base
	IMAGE_NAME=$(image_name) \
	ENV=$(env) \
	sh ./scripts/deployment/build.sh

push:
	TAGGED_IMAGE=$(tagged_image) \
	sh ./scripts/deployment/k8s/push.sh

tag:
	IMAGE_NAME=$(image_name) \
	TAGGED_IMAGE=$(tagged_image) \
	sh ./scripts/deployment/k8s/tag.sh

deploy:
	ENV=$(env) \
	K8_CLUSTER=$(k8_cluster) \
	REPOSITORY=$(repository) \
	TAG=$(tag) \
	ENV_PREFIX=$(env_prefix) \
	NAMESPACE=$(namespace) \
	K8_DOCKER_SECRET=$(k8_docker_secret) \
	CNAME=$(cname) \
	APPLICATION=$(application) \
	ROLE=$(role) \
	STACK=$(stack) \
	sh ./scripts/deployment/k8s/deploy.sh

release: tag push deploy

get_pods:
	K8_CLUSTER=$(k8_cluster) \
	NAMESPACE=$(namespace) \
	sh ./scripts/deployment/k8s/get_pods.sh

get_pod:
	K8_CLUSTER=$(k8_cluster) \
	NAMESPACE=$(namespace) \
	APPLICATION=$(application) \
	sh ./scripts/deployment/k8s/get_pod.sh

ssh:
	K8_CLUSTER=$(k8_cluster) \
	NAMESPACE=$(namespace) \
	POD=$(pod) \
	CONTAINER=$(container) \
	sh ./scripts/deployment/k8s/ssh_pod.sh

logs:
	K8_CLUSTER=$(k8_cluster) \
  NAMESPACE=$(namespace) \
	POD=$(pod) \
	CONTAINER=$(container) \
	sh ./scripts/deployment/k8s/pod_logs.sh

develop:
	docker-compose -f ./scripts/docker-compose/development.yml up
