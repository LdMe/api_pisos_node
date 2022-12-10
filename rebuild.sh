#! /bin/bash

docker rm -f api_node
docker build -t pisos_api_node .

docker run --network mapa_pisos_pisos_api -v $PWD:/usr/src/app -p 3000:3000 --name api_node pisos_api_node