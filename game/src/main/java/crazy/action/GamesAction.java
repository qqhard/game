package crazy.action;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.domain.Sort.Order;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import crazy.dao.GamePageable;
import crazy.dao.GameRepository;
import crazy.vo.Game;

@RestController
@RequestMapping(value = "/games")
public class GamesAction {
	
	@Autowired
	private GameRepository gameRepository;
	
	@ResponseBody
	@RequestMapping( method = RequestMethod.GET)
	public List<Game> get(@RequestParam(value = "pagenum",required=false) Integer pagenum){
		GamePageable pageable = new GamePageable();
		
		if(pagenum != null) pageable.setPageNumber(pagenum);
		pageable.setSort(new Sort(new Order(Direction.ASC, "gamename")));
		
		return gameRepository.findAll(pageable).getContent();
	}
	
	@ResponseBody
	@RequestMapping(value = "{owner}", method = RequestMethod.GET)
	public List<Game> get(@PathVariable("owner") String owner,@RequestParam("offset") String offset){
		
		
		return gameRepository.findByOwner(owner);
	}
}
