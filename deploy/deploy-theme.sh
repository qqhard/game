#!/bin/bash
cd ..
mvn clean package -Dmaven.test.skip=true

rsync -avz -e ssh theme/target/*.jar valseek@www.valseek.com:~/deploy/theme/
rsync -avz -e ssh theme/target/*.jar game@vps.nphard.cn:~/deploy/theme/

ssh valseek@www.valseek.com 'cd deploy/theme; docker stop theme; docker rm theme; docker rmi theme; docker build -t theme . ; docker run --name theme -d -p 8083:8083 -p 9003:9003 -v /home/valseek/deploy/page:/usr/page -v /home/valseek/deploy/web/static:/usr/static --link mongo:mongo --link redis:redis theme;'
