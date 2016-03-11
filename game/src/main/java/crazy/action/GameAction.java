package crazy.action;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import crazy.dao.GameRepository;
import crazy.form.GameCreateForm;
import crazy.form.GameEditForm;
import crazy.vo.Game;

@RestController
@RequestMapping(value = "/game")
public class GameAction {
	@Autowired
	private GameRepository gameRepository;
	
	@ResponseBody
	@RequestMapping(value = "{gamename}", method = RequestMethod.GET)
	public Object get(@PathVariable("gamename") String gamename){
		Game game = gameRepository.findByGamenameAndDeled(gamename, false);
		return game;
	}
	
	@ResponseBody
	@RequestMapping(method = RequestMethod.POST)
	public Object post(@Valid GameCreateForm gameForm,BindingResult bindingResult){
		Map<String,String> ret = new HashMap<String,String>();
		if(bindingResult.hasFieldErrors()){
			List<FieldError> errors = bindingResult.getFieldErrors();
			ret.put("status", "fail");
			for(FieldError error : errors){
				ret.put(error.getField(), error.getCode());
			}
			return ret;
		}
		
		Game game = new Game();
		gameForm.update(game);
		boolean ok = false;
		synchronized(this){
			if(gameRepository.findByGamename(gameForm.getGamename()) == null){
				gameRepository.insert(game);
				ok = true;
			}			
		}
		
		if(ok) ret.put("status", "ok");
		else{
			ret.put("status", "fail");
			ret.put("gamename", "exists");
		}

		return ret;
	}
	
	@ResponseBody
	@RequestMapping(value = "{gamename}", method = RequestMethod.PUT)
	public Object put(@PathVariable("gamename") String gamename,@Valid GameEditForm gameForm,BindingResult bindingResult){
		Map<String,String> ret = new HashMap<String,String>();
		if(bindingResult.hasFieldErrors()){
			List<FieldError> errors = bindingResult.getFieldErrors();
			ret.put("status", "fail");
			for(FieldError error : errors){
				ret.put(error.getField(), error.getCode());
			}
			return ret;
		}
		Game game = gameRepository.findByGamenameAndDeled(gamename,false);

		if(game == null){
			ret.put("gamename", "not exists");
			ret.put("status", "fail");
			return ret;
		}

		gameForm.update(game);
		game.setGamename(gamename);
		gameRepository.save(game);	
		ret.put("status", "ok");
		return ret;
	}
	
	@ResponseBody
	@RequestMapping(value = "{gamename}", method = RequestMethod.DELETE)
	public Object delete(@PathVariable("gamename") String gamename){
		Map<String,String> ret = new HashMap<String,String>();
		Game game = gameRepository.findByGamenameAndDeled(gamename, false);
		boolean ok = false;
		synchronized(this){
			if(game != null){
				game.setDeled(true);
				gameRepository.save(game);
				ok = true;
			}			
		}
		
		if(ok)ret.put("status", "ok");
		else ret.put("status", "fail");
		
		return ret;
	}
}

