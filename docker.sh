#!/bin/bash

sudo docker kill taco
sudo docker rm taco
sudo docker build -t tacoboutaustin .
sudo docker rmi $(docker images -a | grep "^<none>" | awk '{print $3}')
sudo docker run -d --name taco --restart=always -p 80:80 -t tacoboutaustin
