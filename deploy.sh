mvn clean package
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

