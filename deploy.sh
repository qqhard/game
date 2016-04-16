#!/bin/bash

mvn clean package -Dmaven.test.skip=true
cd web
webpack -p
cd ../
rsync -avz -e ssh web/static valseek@www.valseek.com:~/deploy/web/
rsync -avz -e ssh web/bower_components valseek@www.valseek.com:~/deploy/web/
rsync -avz -e ssh web/build valseek@www.valseek.com:~/deploy/web/

rsync -avz -e ssh game/target/*.jar valseek@www.valseek.com:~/deploy/game/
rsync -avz -e ssh user/target/*.jar valseek@www.valseek.com:~/deploy/user/
rsync -avz -e ssh theme/target/*.jar valseek@www.valseek.com:~/deploy/theme/
rsync -avz -e ssh message/target/*.jar valseek@www.valseek.com:~/deploy/message/

rsync -avz -e ssh game/target/*.jar game@vps.nphard.cn:~/deploy/game/
rsync -avz -e ssh user/target/*.jar game@vps.nphard.cn:~/deploy/user/
rsync -avz -e ssh theme/target/*.jar game@vps.nphard.cn:~/deploy/theme/
rsync -avz -e ssh message/target/*.jar game@vps.nphard.cn:~/deploy/message/

ssh game@vps.nphard.cn 'cd deploy/user; docker stop user; docker rm user; docker rmi user; docker build -t user . ; docker run --name user -d -p 8080:8080 user; cd ../message; docker stop message; docker rm message; docker rmi message; docker build -t message .; docker run --name message -d -p 8082:8082 message;'

ssh valseek@valseek.com 'cd deploy/game; docker stop game; docker rm game; docker rmi game; docker build -t game . ; docker run --name game -d -p 8081:8081 --link mongo:mongo --link redis:redis game; cd ../theme; docker stop theme; docker rm theme; docker rmi theme; docker build -t theme . ; docker run --name theme -d -p 8083:8083 -v /home/valseek/deploy/page:/usr/page --link mongo:mongo --link redis:redis theme;'
