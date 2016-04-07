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
import crazy.vo.Entry;
import crazy.vo.Game;
import crazy.vo.Manager;

@RestController
public class GamesAction {

	@Autowired
	private GameRepository gameRepository;
	
	@Autowired
	private ManagerRepository managerRepository;
	
	@Autowired
	private EntryRepository entryRepository;

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
		for(Game game : list){
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
		if(managers == null || managers.size() ==0) return new ArrayList<Game>();
		List<String> query = managers.stream().map(e -> e.getGamename()).collect(Collectors.toList());
		List<Game> ret = gameRepository.findByGamenames(query);
		if(ret == null) return new ArrayList<Game>();
		return ret;
	}
	
	private List<String> getEntryedQuery(){
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		List<Entry> entrys = entryRepository.findByUsername(username);
		if(entrys == null || entrys.size() == 0) return new ArrayList<String>();
		List<String> query = entrys.stream().map(e -> e.getGamename()).collect(Collectors.toList());
		return query;
	}
	
	@ResponseBody
	@RequestMapping(value = "/games/entryed/accepted", method = RequestMethod.GET)
	public Object getEntryedAccepted() {
		List<String> query = getEntryedQuery();
		if(query.size() == 0) return new ArrayList<Game>();
		List<Game> games = gameRepository.findByGamenamesAccepted(query, System.currentTimeMillis());
		if(games == null || games.size() == 0) return new ArrayList<Game>();
		return games;
	}
	
	@ResponseBody
	@RequestMapping(value = "/games/entryed/started", method = RequestMethod.GET)
	public Object getEntryedStarted() {
		List<String> query = getEntryedQuery();
		if(query.size() == 0) return new ArrayList<Game>();
		List<Game> games = gameRepository.findByGamenamesStarted(query, System.currentTimeMillis());
		if(games == null || games.size() == 0) return new ArrayList<Game>();
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

}
