package crazy.action;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import crazy.dao.EntryRepository;
import crazy.dao.GameRepository;
import crazy.dao.ManagerRepository;
import crazy.dao.MemberRepository;
import crazy.dao.TeamRepository;
import crazy.vo.Entry;
import crazy.vo.Game;
import crazy.vo.Manager;
import crazy.vo.Member;
import crazy.vo.Team;

@RestController
public class GamesAction {

	@Autowired
	private GameRepository gameRepository;

	@Autowired
	private ManagerRepository managerRepository;

	@Autowired
	private EntryRepository entryRepository;
	
	@Autowired
	private MemberRepository memberRepository;
	
	@Autowired
	private TeamRepository teamRepository;

	@ResponseBody
	@RequestMapping(value = "/games", method = RequestMethod.GET)
	public List<Game> get(@RequestParam(value = "pagenum", required = false) Integer pagenum,
			@RequestParam("state") String state) {
		return gameRepository.findByInEntryed(System.currentTimeMillis());
	}

	@ResponseBody
	@RequestMapping(value = "/games/owned", method = RequestMethod.GET)
	public Object getOwned() {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		List<Game> list = gameRepository.findByOwnerAndDeled(username, false);
		List<String> names = new ArrayList<String>();
		for (Game game : list) {
			names.add(game.getGamename());
		}
		return names;
	}

	@ResponseBody
	@RequestMapping(value = "/games/owned/submited", method = RequestMethod.GET)
	public List<Game> getOwnedSubmited() {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		return gameRepository.findByInSubmited(username);
	}

	@ResponseBody
	@RequestMapping(value = "/games/owned/keeped", method = RequestMethod.GET)
	public List<Game> getOwnedKeeped() {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		return gameRepository.findByInKeeped(username, System.currentTimeMillis());
	}

	@ResponseBody
	@RequestMapping(value = "/games/owned/ended", method = RequestMethod.GET)
	public List<Game> getOwnedEnded() {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		return gameRepository.findByInEnded(username, System.currentTimeMillis());
	}

	@ResponseBody
	@RequestMapping(value = "/games/owned/failed", method = RequestMethod.GET)
	public List<Game> getOwnedFailed() {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		return gameRepository.findByOwnerAndStep(username, 0);
	}

	@ResponseBody
	@RequestMapping(value = "/games/managed", method = RequestMethod.GET)
	public Object getManaged() {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		List<Manager> managers = managerRepository.findByUsername(username);
		if (managers == null || managers.size() == 0)
			return new ArrayList<Game>();
		List<String> query = managers.stream().map(e -> e.getGamename()).collect(Collectors.toList());
		List<Game> ret = gameRepository.findByGamenames(query);
		if (ret == null)
			return new ArrayList<Game>();
		return ret;
	}

	private List<String> getEntryedQuery() {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		List<Entry> entrys = entryRepository.findByUsernameAndDeled(username,false);
		if (entrys == null || entrys.size() == 0)
			return new ArrayList<String>();
		List<String> query = entrys.stream().map(e -> e.getGamename()).collect(Collectors.toList());
		return query;
	}

	@ResponseBody
	@RequestMapping(value = "/games/entryed/accepted", method = RequestMethod.GET)
	public Object getEntryedAccepted() {
		List<String> query = getEntryedQuery();
		if (query.size() == 0)
			return new ArrayList<Game>();
		List<Game> games = gameRepository.findByGamenamesAccepted(query, System.currentTimeMillis());
		if (games == null || games.size() == 0)
			return new ArrayList<Game>();
		return games;
	}

	@ResponseBody
	@RequestMapping(value = "/games/entryed/started", method = RequestMethod.GET)
	public Object getEntryedStarted() {
		List<String> query = getEntryedQuery();
		if (query.size() == 0)
			return new ArrayList<Game>();
		List<Game> games = gameRepository.findByGamenamesStarted(query, System.currentTimeMillis());
		if (games == null || games.size() == 0)
			return new ArrayList<Game>();
		return games;
	}

	@ResponseBody
	@RequestMapping(value = "/games/entryed/ended", method = RequestMethod.GET)
	public Object getEntryedEnded() {
		List<String> query = getEntryedQuery();
		if(query.size() == 0) return new ArrayList<Game>();
		List<Game> games = gameRepository.findByGamenamesEnded(query, System.currentTimeMillis());
		if(games == null || games.size() == 0) return new ArrayList<Game>();
		return games;
	}
	
	private List<String> getEntryedIndividualGamenames(String username){
		List<Entry> entrys = entryRepository.findByUsernameAndDeled(username,false);
		if (entrys == null || entrys.size() == 0)
			return new ArrayList<String>();
		List<String> gamenames = entrys.stream().map(e -> e.getGamename()).collect(Collectors.toList());
		return gamenames;
	}
	
	private List<String> getEntryedTeamGamenames(String username){
		List<Member> members = memberRepository.findByUsernameAndAccepted(username, true);
		List<String> teamids = members.stream().map(e->e.getTeamid()).distinct().collect(Collectors.toList());
		List<Team> teams = teamRepository.findByIdsAndEntryed(teamids,true);
		List<String> gamenames = teams.stream().map(e->e.getGamename()).distinct().collect(Collectors.toList());
		return gamenames;
	}
	
	@ResponseBody
	@RequestMapping(value = "/games/entryed", method = RequestMethod.GET)
	public Object getEntryedGames(
			@RequestParam(value = "ongoing", required = false) boolean ongoing,
			@RequestParam(value = "ended", required = false) boolean ended) {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		List<String> gamenames = new ArrayList<String>();
		gamenames.addAll(getEntryedIndividualGamenames(username));
		gamenames.addAll(getEntryedTeamGamenames(username));
		if(gamenames == null || gamenames.size() == 0)return new ArrayList<Game>();
		List<Game> games = new ArrayList<Game>();
		long nowTime = System.currentTimeMillis();
		if(ongoing)games.addAll(gameRepository.findByGamenamesOngoing(gamenames, nowTime));
		if(ended)games.addAll(gameRepository.findByGamenamesEnded(gamenames, nowTime));
		return games;
	}

}
