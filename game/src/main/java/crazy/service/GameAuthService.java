package crazy.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import crazy.vo.Game;
import crazy.vo.Manager;

@Service
public class GameAuthService {
	@Autowired
	private MongoTemplate mongo;

	public boolean checkOwnerOrManager(String username, String gamename) {
		return checkOwner(username, gamename) || checkManager(username, gamename);
	}

	public boolean checkOwner(String username, String gamename) {
		Query query = new Query(Criteria.where("gamename").is(gamename).and("owner").is(username).and("deled")
				.is(false).and("step").gt(1));
		return mongo.exists(query, Game.class);
	}

	public boolean checkManager(String username, String gamename) {
		Query query = new Query(Criteria.where("gamename").is(gamename).and("username").is(username));
		return mongo.exists(query, Manager.class);
	}
}
