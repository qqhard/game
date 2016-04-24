package crazy.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import crazy.dao.EntryRepository;
import crazy.dao.GameRepository;
import crazy.dao.ManagerRepository;
import crazy.dao.TeamEntryRepository;
import crazy.dao.TeamRepository;
import crazy.dao.UserRepository;
import crazy.form.EntryDelForm;
import crazy.form.TeamEntryDelForm;
import crazy.vo.Entry;
import crazy.vo.Game;
import crazy.vo.Manager;
import crazy.vo.Team;
import crazy.vo.TeamEntry;
import crazy.vo.User;

@RestController
public class EntrysAction {
	@Autowired
	private EntryRepository entryRepository;

	@Autowired
	private TeamEntryRepository teamEntryRepository;

	@Autowired
	private TeamRepository teamRepository;

	@Autowired
	private GameRepository gameRepository;

	@Autowired
	private ManagerRepository managerRepository;

	@Autowired
	private UserRepository userRepository;

	@ResponseBody
	@RequestMapping(value = "/gameentrys/{gamename}/individual", method = RequestMethod.GET)
	public Object getGameEntrysIndividual(@PathVariable("gamename") String gamename) {

		List<Entry> entrys = entryRepository.findByGamenameAndDeled(gamename, false);
		List<String> query = entrys.stream().map(e -> e.getUsername()).collect(Collectors.toList());
		List<User> users = userRepository.findByUsernameInList(query);
		Map<String, User> map = new HashMap<>();
		//bug 原因不明
		//Map<String, User> map = users.stream().collect(Collectors.toMap(e.getUsername(), e -> e));
		users.stream().forEach(e->map.put(e.getUsername(), e));
		List<HashMap<String,Object> > ret = new ArrayList<HashMap<String,Object>>();
		for(Entry entry: entrys){
			HashMap<String,Object> tmp = new HashMap<>();
			tmp.put("entry", entry);
			tmp.put("user", map.get(entry.getUsername()));
			ret.add(tmp);
		}
		return ret;
	}

	@ResponseBody
	@RequestMapping(value = "/gameentrys/{gamename}/team", method = RequestMethod.GET)
	public List<TeamEntry> getGameEntrysTeam(@PathVariable("gamename") String gamename) {
		List<TeamEntry> entrys = teamEntryRepository.findByGamenameAndDeled(gamename, false);
		return entrys;
	}

	/**
	 * 检验清退权限
	 * 
	 * @param game
	 * @return
	 */
	private boolean authCheck(Game game) {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		if (game.getOwner().equals(username)) {
			return true;
		}
		Manager manager = managerRepository.findByGamenameAndUsername(game.getGamename(), username);
		if (manager != null) {
			return true;
		}
		return false;
	}

	/**
	 * 删除个人参赛者
	 * 
	 * @param entryDelForm
	 * @param bindingResult
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/entrys/individual", method = RequestMethod.PUT)
	public Object delete(@Valid EntryDelForm entryDelForm, BindingResult bindingResult) {
		Game game = gameRepository.findByGamename(entryDelForm.getGamename());
		if (game == null)
			return new ResponseEntity<Object>(HttpStatus.NOT_FOUND);
		if (!authCheck(game)) {
			return new ResponseEntity<Object>(HttpStatus.FORBIDDEN);
		}

		List<String> usernames = entryDelForm.getUsernames();
		List<Entry> deledEntrys = new ArrayList<Entry>();
		for (String username : usernames) {
			Entry entry = entryRepository.findByUsernameAndGamename(username, entryDelForm.getGamename());
			entry.setDeled(true);
			deledEntrys.add(entry);
		}
		entryRepository.save(deledEntrys);
		return "ok";
	}

	/**
	 * 删除队伍参赛者
	 * 
	 * @param entryDelForm
	 * @param bindingResult
	 * @return
	 */
	@RequestMapping(value = "/entrys/team", method = RequestMethod.PUT)
	public @ResponseBody Object delete2(@Valid TeamEntryDelForm entryDelForm, BindingResult bindingResult) {
		Game game = gameRepository.findByGamename(entryDelForm.getGamename());
		if (game == null)
			return new ResponseEntity<Object>(HttpStatus.NOT_FOUND);
		if (!authCheck(game)) {
			return new ResponseEntity<Object>(HttpStatus.FORBIDDEN);
		}

		List<String> teamids = entryDelForm.getTeamids();
		List<TeamEntry> teamEntrys = teamEntryRepository.findByTeamids(teamids);
		for (TeamEntry teamEntry : teamEntrys) {
			teamEntry.setDeled(true);
		}
		teamEntryRepository.save(teamEntrys);
		List<Team> teams = teamRepository.findByIds(teamids);
		for (Team team : teams) {
			team.setEntryed(false);
			team.setGamename(null);
		}
		teamRepository.save(teams);
		return "ok";
	}

}
