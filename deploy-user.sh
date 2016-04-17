#!/bin/bash

mvn clean package -Dmaven.test.skip=true

rsync -avz -e ssh user/target/*.jar valseek@www.valseek.com:~/deploy/user/
rsync -avz -e ssh user/target/*.jar game@vps.nphard.cn:~/deploy/user/

ssh game@vps.nphard.cn 'cd deploy/user; docker stop user; docker rm user; docker rmi user; docker build -t user . ; docker run --name user -d -p 8080:8080 user;'

