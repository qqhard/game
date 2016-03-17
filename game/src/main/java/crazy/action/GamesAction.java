package crazy.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.domain.Sort.Order;
import org.springframework.security.core.context.SecurityContextHolder;
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
public class GamesAction {
	
	@Autowired
	private GameRepository gameRepository;
	
	
	
	@ResponseBody
	@RequestMapping(value = "/games", method = RequestMethod.GET)
	public List<Game> get(@RequestParam(value = "pagenum",required=false) Integer pagenum,
			@RequestParam("state") String state){
		GamePageable pageable = new GamePageable();
		if(pagenum != null) pageable.setPageNumber(pagenum);
		pageable.setSort(new Sort(new Order(Direction.ASC, "gamename")));
		
		Integer step = STATE_TO_STEP.get(state);
		if(step == null) return new ArrayList<Game>();
		return gameRepository.findByStep(pageable, step).getContent();
	}
	
	private static final Map<String,Integer> STATE_TO_STEP = new HashMap<String,Integer>(){
		private static final long serialVersionUID = -900316470475740462L;
	{
		put("submited",1);
		put("accepted",2);
		put("stated",3);
		put("ended",4);
	}};
	
	@ResponseBody
	@RequestMapping(value = "/games/{owner}", method = RequestMethod.GET)
	public List<Game> get(@PathVariable("owner") String owner,@RequestParam("state") String state){
		if(!owner.equals(SecurityContextHolder.getContext().getAuthentication().getName())){
    		return new ArrayList<Game>();
    	}
		
		Integer step = STATE_TO_STEP.get(state);
		if(step == null) return new ArrayList<Game>();
		return gameRepository.findByOwnerAndStep(owner, step);
	}
}
