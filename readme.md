# 需要配置的环境变量:
export GAME_MONGO_USERNAME=
export GAME_MONGO_PASSWORD=
export GAME_MONGO_HOST=
export GAME_MONGO_PORT=
export GAME_REDIS_HOST=
export GAME_REDIS_PORT=
export GAME_REDIS_PASSWORD=
export GAME_WEB_STATIC=
export GAME_WEB_PAGE=

# mongodb
需要添加用户名密码，和环境变量配置相同
```
use game;
db.createUser( 
	{ 	
		user: "username", 
		pwd: "password", 
		roles: [ { role: "readWrite", db: "game" } ] 
	} 
)

# redis
redis只需设置密码,和环境变量配置相同
```
sudo vi /etc/redis/redis.conf
remove comment # requirepass foobared 
```
