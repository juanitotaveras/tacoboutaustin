#!/bin/bash

docker kill taco
docker rm taco
docker build -t tacoboutaustin .
docker rmi $(docker images -a | grep "^<none>" | awk '{print $3}')
docker run -d --name taco --restart=always -p 80:80 -t -v `pwd`/app:/app tacoboutaustin
