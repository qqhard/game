package crazy.action;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import crazy.dao.GameRepository;
import crazy.vo.Game;

@RestController
public class GamesAction {

	@Autowired
	private GameRepository gameRepository;

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
	@RequestMapping(value = "/games/owned/unstarted", method = RequestMethod.GET)
	public List<Game> getOwnedUnstarted() {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		return gameRepository.findByInUnstarted(username, System.currentTimeMillis());
	}

	@ResponseBody
	@RequestMapping(value = "/games/owned/entryed", method = RequestMethod.GET)
	public List<Game> getOwnedEntryed() {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		return gameRepository.findByInEntryed(username, System.currentTimeMillis());
	}

	@ResponseBody
	@RequestMapping(value = "/games/owned/dued", method = RequestMethod.GET)
	public List<Game> getOwnedDued() {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		return gameRepository.findByInDued(username, System.currentTimeMillis());
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

}
