#!/bin/bash

mvn clean package -Dmaven.test.skip=true

rsync -avz -e ssh message/target/*.jar valseek@www.valseek.com:~/deploy/message/
rsync -avz -e ssh message/target/*.jar game@vps.nphard.cn:~/deploy/message/

ssh game@vps.nphard.cn 'cd deploy/message; docker stop message; docker rm message; docker rmi message; docker build -t message .; docker run --name message -d -p 8082:8082 message;'

