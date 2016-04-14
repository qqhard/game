package crazy.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;

@Configuration
public class RedisConfig {
	public @Bean RedisConnectionFactory connectionFactory() {
		String host = System.getenv("GAME_REDIS_HOST");
		int port = Integer.valueOf(System.getenv("GAME_REDIS_PORT"));
		String password = System.getenv("GAME_REDIS_PASSWORD");
		JedisConnectionFactory jedisConnectionFactory = new JedisConnectionFactory();
		jedisConnectionFactory.setHostName(host);
		jedisConnectionFactory.setPort(port);
		jedisConnectionFactory.setPassword(password);
		return jedisConnectionFactory;
	}
}
