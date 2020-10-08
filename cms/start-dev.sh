#!/usr/bin/env bash
ROOT_PATH="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
set -o allexport
source "${ROOT_PATH}/backend/config/development.env"
set +o allexport

if [ "$(docker container inspect -f '{{.State.Running}}' cms-mysql 2> /dev/null)" == "true" ]; then
    echo "${MYSQL_DOCKER_NAME} container is running"
else
    if [ "$(docker ps -aq -f status=exited -f name=${MYSQL_DOCKER_NAME})" ]; then
        echo "${MYSQL_DOCKER_NAME} container exists: starting"
        docker start ${MYSQL_DOCKER_NAME}
    else
        MYSQL_DATA_PATH="${ROOT_PATH}/backend/config/mysql"
        mkdir -p ${MYSQL_DATA_PATH}
        echo "${MYSQL_DOCKER_NAME} container does not exist: running"
        docker run \
            --name ${MYSQL_DOCKER_NAME} \
            -e MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD} \
            -e MYSQL_DATABASE=${MYSQL_DATABASE} \
            -e MYSQL_USER=${MYSQL_USER} \
            -e MYSQL_PASSWORD=${MYSQL_PASSWORD} \
            -v ${MYSQL_DATA_PATH}:/var/lib/mysql \
            -p ${MYSQL_PORT}:3306 \
            -d mariadb:10
    fi
fi
