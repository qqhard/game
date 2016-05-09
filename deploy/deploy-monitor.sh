#!/bin/bash
cd ../monitor
mvn clean package -Dmaven.test.skip=true
cd ../

rsync -avz -e ssh monitor/target/*.jar valseek@www.valseek.com:~/deploy/monitor/
rsync -avz -e ssh monitor/target/*.jar game@vps.nphard.cn:~/deploy/monitor/

ssh game@vps.nphard.cn 'cd deploy/monitor; docker stop monitor; docker rm monitor; docker rmi monitor; docker build -t monitor . ; docker run --name monitor -d -p 8085:8085 monitor;'
