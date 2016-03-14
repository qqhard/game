package crazy.action;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import crazy.dao.GameRepository;
import crazy.vo.Game;

@RestController
@RequestMapping(value = "/valid")
public class ValidAction {
	@Autowired
	private GameRepository gameRepository;
	
	@ResponseBody
	@RequestMapping(value = "{gamename}", method = RequestMethod.GET)
	public Object get(@PathVariable("gamename") String gamename){
		Game game = gameRepository.findByGamename(gamename);
		return game != null;
	}
}
