#!/bin/bash

TAG=${TAG:-10}
docker build -f ./scripts/Dockerfile.base -t booster-base:$TAG .
