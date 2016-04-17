#!/bin/bash

mvn clean package -Dmaven.test.skip=true

rsync -avz -e ssh game/target/*.jar valseek@www.valseek.com:~/deploy/game/
rsync -avz -e ssh game/target/*.jar game@vps.nphard.cn:~/deploy/game/

ssh valseek@valseek.com 'cd deploy/game; docker stop game; docker rm game; docker rmi game; docker build -t game . ; docker run --name game -d -p 8081:8081 --link mongo:mongo --link redis:redis game;'
