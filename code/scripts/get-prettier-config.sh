# !/bin/bash

LINK=https://raw.githubusercontent.com/idbolshakov/prettierrc/master/prettierrc.json

docker run alpine:latest apk add curl && curl $LINK > configs/prettierrc.json;
