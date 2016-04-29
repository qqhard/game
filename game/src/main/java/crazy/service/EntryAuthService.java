package crazy.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import crazy.dao.GameRepository;
import crazy.dao.MemberRepository;
import crazy.dao.UserRepository;
import crazy.vo.Game;
import crazy.vo.Member;
import crazy.vo.Team;
import crazy.vo.User;

@Service
public class EntryAuthService {
	@Autowired
	private MongoTemplate mongo;

	@Autowired
	private MemberRepository memberRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private GameRepository gameRepository;

	public boolean checkTeamApply(String username, String gamename) {
		Query query = new Query(Criteria.where("username").is(username));
		User user = mongo.findOne(query, User.class);
		query = new Query(Criteria.where("gamename").is(gamename).and("deled").is(false).and("step").gt(1));
		Game game = mongo.findOne(query, Game.class);
		return checkBelong(user, game);
	}

	public boolean checkBelong(User user, Game game) {
		if (game == null || user == null)
			return false;
		if (game.getProvinceid() != 0 && game.getProvinceid() != user.getProvinceid())
			return false;
		if (game.getCollegeid() != 0 && game.getCollegeid() != user.getCollegeid())
			return false;
		if (game.getInstituteid() != 0 && game.getInstituteid() != user.getInstituteid())
			return false;
		return true;
	}

	public boolean checkTeamEntry(Team team) {
		if (team == null || team.getMinNum() > team.getNowNum() || team.getMaxNum() < team.getNowNum() || team.isEntryed())
			return false;
		Game game = gameRepository.findByGamename(team.getGamename());
		long now = System.currentTimeMillis();
		if (!(game.isDeled() == false && game.getStep() == 2 && now > game.getStartTime() && now < game.getDueTime()))
			return false;
		List<Member> members = memberRepository.findByTeamidAndAccepted(team.getId(), true);
		List<String> usernames = members.stream().map(e -> e.getUsername()).collect(Collectors.toList());
		usernames.add(team.getOwner());
		List<User> users = userRepository.findByUsernameInList(usernames);
		for (User user : users) {
			if (!checkBelong(user, game))
				return false;
		}
		
		
		return true;
	}
}
