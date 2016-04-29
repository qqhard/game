package crazy.action;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import crazy.common.LockPrefix;
import crazy.dao.EntryRepository;
import crazy.dao.GameRepository;
import crazy.dao.TeamRepository;
import crazy.dao.UserRepository;
import crazy.form.EntryForm;
import crazy.form.TeamEntryForm;
import crazy.service.EntryAuthService;
import crazy.service.TeamAuthService;
import crazy.vo.Entry;
import crazy.vo.Game;
import crazy.vo.Team;
import crazy.vo.User;

@RestController
@RequestMapping(value = "/entry")
public class EntryAction {
	private static final Logger log = LoggerFactory.getLogger(EntryAction.class);
	
	@Autowired
	private EntryRepository entryRepository;

	@Autowired
	private TeamRepository teamRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private GameRepository gameRepository;
	
	@Autowired
	private EntryAuthService entryAuthService;
	
	@Autowired
	private TeamAuthService teamAuthService;
	
	@Autowired
	private MongoTemplate mongo;

	@ResponseBody
	@RequestMapping(value = "{gamename}", method = RequestMethod.GET)
	public Object get(@PathVariable("gamename") String gamename) {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		Entry entry = entryRepository.findByUsernameAndGamenameAndDeled(username, gamename, false);
		return entry;
	}

	@ResponseBody
	@RequestMapping(value = "individual", method = RequestMethod.POST)
	public Object postIndividual(@Valid EntryForm entryForm, BindingResult bindingResult) {
		Map<String, String> ret = new HashMap<String, String>();
		if (bindingResult.hasFieldErrors()) {
			List<FieldError> errors = bindingResult.getFieldErrors();
			ret.put("status", "fail");
			for (FieldError error : errors) {
				ret.put(error.getField(), error.getCode());
			}
			return ret;
		}

		String username = SecurityContextHolder.getContext().getAuthentication().getName();

		Game game = gameRepository.findByGamename(entryForm.getGamename());
		if (game == null)
			return new ResponseEntity<Object>(HttpStatus.NOT_FOUND);
		long now = System.currentTimeMillis();
		if (!(game.isDeled() == false && game.getStep() == 2 && now > game.getStartTime() && now < game.getDueTime()))
			return new ResponseEntity<Object>(HttpStatus.FORBIDDEN);

		User user = userRepository.findByUsername(username);
		if (!user.getEmailActivated())
			return new ResponseEntity<Object>(HttpStatus.FORBIDDEN);

		if ((game.getProvinceid() != 0 && game.getProvinceid() != user.getProvinceid())
				|| (game.getCollegeid() != 0 && game.getCollegeid() != user.getCollegeid())
				|| (game.getInstituteid() != 0 && game.getInstituteid() != user.getInstituteid()))
			return new ResponseEntity<Object>(HttpStatus.FORBIDDEN);

		if (!(game.getTeamMin() == 1 && game.getTeamMax() == 1))
			return new ResponseEntity<Object>(HttpStatus.FORBIDDEN);

		String lock = (LockPrefix.USER + username.substring(0, 4)).intern();
		synchronized (lock) {
			Entry entry = entryRepository.findByUsernameAndGamename(username, entryForm.getGamename());
			if (entry == null) {
				entry = entryForm.update(new Entry());
				entry.setUsername(username);
				entryRepository.insert(entry);
				log.info("{} entry {} success！", username, game.getGamename());
				ret.put("status", "ok");
			} else if (entry.getDeled()) {
				entry = entryForm.update(entry);
				entry.setDeled(false);
				entryRepository.save(entry);
				log.info("{} entry {} success！", username, game.getGamename());
				ret.put("status", "ok");
			} else {
				ret.put("status", "fail");
				ret.put("data", "重复报名");
			}
		}

		return ret;
	}

	@ResponseBody
	@RequestMapping(value = "team", method = RequestMethod.POST)
	public Object postTeam(@Valid TeamEntryForm teamEntryForm, BindingResult bindingResult) {
		Map<String, String> ret = new HashMap<String, String>();
		if (bindingResult.hasFieldErrors()) {
			List<FieldError> errors = bindingResult.getFieldErrors();
			ret.put("status", "fail");
			for (FieldError error : errors) {
				ret.put(error.getField(), error.getCode());
			}
			return ret;
		}

		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		Team team = teamRepository.findById(teamEntryForm.getTeamid());
		if(!teamAuthService.checkOwner(username, team)){
			return new ResponseEntity<Object>("权限问题！",HttpStatus.FORBIDDEN);
		}
		if(team.isEntryed()){
			return new ResponseEntity<Object>("请勿重复报名！",HttpStatus.FORBIDDEN);
		}
		if(entryAuthService.checkTeamEntry(team)){
			return new ResponseEntity<Object>("队伍不符合要求！",HttpStatus.FORBIDDEN); 
		}
		
		Query query = new Query(Criteria.where("id").is(teamEntryForm.getTeamid()));
		Update update = new Update().set("entryed", true);
		mongo.updateFirst(query, update, Team.class);
		
		log.info("team {} entry {} success！", teamEntryForm.getTeamid(), team.getGamename());
		ret.put("status", "ok");
		return ret;
	}

}
