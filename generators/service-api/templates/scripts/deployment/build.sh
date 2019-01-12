#!/usr/bin/env bash

docker build -f ./scripts/Dockerfile -t $IMAGE_NAME --build-arg ENV=$ENV .