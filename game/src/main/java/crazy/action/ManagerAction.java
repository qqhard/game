package crazy.action;

import javax.validation.Valid;

import org.bson.types.ObjectId;
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

import crazy.dao.GameRepository;
import crazy.dao.ManagerRepository;
import crazy.dao.UserRepository;
import crazy.form.ManagerForm;
import crazy.vo.Game;
import crazy.vo.Manager;
import crazy.vo.User;

@RestController
public class ManagerAction {
	@Autowired
	private ManagerRepository managerRepository;

	@Autowired
	private GameRepository gameRepository;

	@Autowired
	private UserRepository userRepository;

	@ResponseBody
	@RequestMapping(value = "/managers/{gamename}", method = RequestMethod.GET)
	public Object gets(@PathVariable("gamename") String gamename) {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		Game game = gameRepository.findByGamename(gamename);
		if (game == null)
			return new ResponseEntity<Object>(HttpStatus.NOT_FOUND);
		if (username.equals(game.getOwner())) {
			return managerRepository.findByGamename(gamename);
		}
		Manager manager = managerRepository.findByGamenameAndUsername(gamename, username);
		if (manager != null) {
			return managerRepository.findByGamename(gamename);
		}
		return new ResponseEntity<Object>(HttpStatus.FORBIDDEN);
	}

	@ResponseBody
	@RequestMapping(value = "/manager", method = RequestMethod.POST)
	public Object post(@Valid ManagerForm form, BindingResult bindingResult) {
		System.out.println(form.getGamename());
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		Game game = gameRepository.findByGamename(form.getGamename());
		if (game == null)
			return new ResponseEntity<Object>(HttpStatus.NOT_FOUND);
		if (!username.equals(game.getOwner()))
			new ResponseEntity<Object>(HttpStatus.FORBIDDEN);
		User user = userRepository.findByUsername(form.getUsername());
		if (user == null)
			return new ResponseEntity<Object>(HttpStatus.NOT_FOUND);
		
		String lock = ("mana_"+game.getId().substring(game.getId().length() - 4)).intern();
		boolean ok = true;
		Manager manager = null;
		synchronized(lock){
			manager = managerRepository.findByGamenameAndUsername(form.getGamename(), form.getUsername());
			if(manager != null) ok = false;
			else{
				manager = form.update(new Manager());
				managerRepository.insert(manager);
			}
		}
		if(ok)return manager;
		else return new ResponseEntity<Object>(HttpStatus.CONFLICT);
	}

	@ResponseBody
	@RequestMapping(value = "/manager/{managerid}", method = RequestMethod.PUT)
	public Object del(@PathVariable("managerid") String managerid) {
		Manager manager = managerRepository.findOne(new ObjectId(managerid));
		if (manager == null)
			return new ResponseEntity<Object>(HttpStatus.NOT_FOUND);
		Game game = gameRepository.findByGamename(manager.getGamename());
		if (game == null)
			return new ResponseEntity<Object>(HttpStatus.NOT_FOUND);
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		if (!username.equals(game.getOwner()))
			new ResponseEntity<Object>(HttpStatus.FORBIDDEN);
		managerRepository.delete(new ObjectId(managerid));
		return "ok";
	}

}
