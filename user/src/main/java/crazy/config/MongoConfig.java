package crazy.config;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;

import com.mongodb.MongoClient;
import com.mongodb.MongoCredential;
import com.mongodb.ServerAddress;

@Configuration
public class MongoConfig {
	public @Bean MongoClient mongo() throws Exception {
		String username = System.getenv("GAME_MONGO_USERNAME");
		String password = System.getenv("GAME_MONGO_PASSWORD");
		String host = System.getenv("GAME_MONGO_HOST");
		int port = Integer.valueOf(System.getenv("GAME_MONGO_PORT"));
		MongoCredential cred = MongoCredential.createCredential(username, "game", password.toCharArray());
		ServerAddress serverAddress = new ServerAddress(host, port);
		return new MongoClient(serverAddress, Arrays.asList(cred));
	}

	public @Bean MongoTemplate mongoTemplate() throws Exception {
		return new MongoTemplate(mongo(), "game");
	}
}
