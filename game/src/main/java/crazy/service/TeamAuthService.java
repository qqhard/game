package crazy.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import crazy.vo.Team;

@Service
public class TeamAuthService {
	@Autowired
	private MongoTemplate mongo;

	public boolean checkOwner(String username, String teamid) {
		Query query = new Query(Criteria.where("owner").is(username).and("id").is(teamid));
		return mongo.exists(query, Team.class);
	}

	public boolean checkOwner(String username, Team team) {
		if (username == null || "".equals(username) || team == null || team.getOwner() == null
				|| "".equals(team.getOwner()) || team.isDeled() == true)
			return false;
		return team.getOwner().equals(username);
	}
}
