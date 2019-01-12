#!/usr/bin/env bash

docker run -it xogroup/xo-helm:$K8_CLUSTER \
kubectl get pods -n $NAMESPACE

