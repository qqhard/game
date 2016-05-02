#!/bin/bash

cd mobile
webpack -p
cd ../
rsync -avz -e ssh mobile/build valseek@www.valseek.com:~/deploy/mobile/
rsync -avz -e ssh mobile/index.html valseek@www.valseek.com:~/deploy/mobile/
