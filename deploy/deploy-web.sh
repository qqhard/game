#!/bin/bash

cd ../web
webpack -p
cd ../
rsync -avz -e ssh web/static valseek@www.valseek.com:~/deploy/web/
rsync -avz -e ssh web/bower_components valseek@www.valseek.com:~/deploy/web/
rsync -avz -e ssh web/index.html valseek@www.valseek.com:~/deploy/web/
cd deploy
python deploy-oss.py
