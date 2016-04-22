package com.valseek;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

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
	
    @Bean
    public PasswordEncoder passwordEncoder(){
    	PasswordEncoder passwordEncoder=new BCryptPasswordEncoder(4);
    	return passwordEncoder;
    }
    

    @Bean
    public SessionRegistry sessionRegistry(){
    	SessionRegistry sessionRegistry=new SessionRegistryImpl();
    	return sessionRegistry;
    }

}
