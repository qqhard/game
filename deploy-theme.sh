#!/bin/bash

mvn clean package -Dmaven.test.skip=true

rsync -avz -e ssh theme/target/*.jar valseek@www.valseek.com:~/deploy/theme/
rsync -avz -e ssh theme/target/*.jar game@vps.nphard.cn:~/deploy/theme/

ssh valseek@valseek.com 'cd deploy/theme; docker stop theme; docker rm theme; docker rmi theme; docker build -t theme . ; docker run --name theme -d -p 8083:8083 -v /home/valseek/deploy/page:/usr/page --link mongo:mongo --link redis:redis theme;'
