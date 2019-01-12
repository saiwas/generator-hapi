#!/usr/bin/env bash

docker run -it xogroup/xo-helm:$K8_CLUSTER \
  kubectl logs -f \
  -n $NAMESPACE \
  $POD \
  $CONTAINER
