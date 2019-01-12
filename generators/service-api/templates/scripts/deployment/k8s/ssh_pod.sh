#!/usr/bin/env bash

docker run -it xogroup/xo-helm:$K8_CLUSTER \
  kubectl exec -it \
  -n $NAMESPACE \
  $POD \
  --container $CONTAINER \
  bash
