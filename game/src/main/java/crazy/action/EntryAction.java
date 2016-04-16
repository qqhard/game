package crazy.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
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
import crazy.dao.MemberRepository;
import crazy.dao.TeamEntryRepository;
import crazy.dao.TeamRepository;
import crazy.dao.UserRepository;
import crazy.form.EntryForm;
import crazy.form.TeamEntryForm;
import crazy.vo.Entry;
import crazy.vo.Game;
import crazy.vo.Member;
import crazy.vo.Team;
import crazy.vo.TeamEntry;
import crazy.vo.User;

@RestController
@RequestMapping(value = "/game/entry")
public class EntryAction {
	
	private static final Logger log = LoggerFactory.getLogger(EntryAction.class);
	@Autowired
	private TeamEntryRepository teamEntryRepository;

	@Autowired
	private EntryRepository entryRepository;

	@Autowired
	private TeamRepository teamRepository;

	@Autowired
	private MemberRepository memberRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private GameRepository gameRepository;
	

	@ResponseBody
	@RequestMapping(value = "{gamename}", method = RequestMethod.GET)
	public Object get(@PathVariable("gamename") String gamename) {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		Entry entry = entryRepository.findByUsernameAndGamename(username, gamename);
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

		if (!(game.getTeamSign() == 0 && game.getTeamNum() == 1))
			return new ResponseEntity<Object>(HttpStatus.FORBIDDEN);

		String lock = (LockPrefix.USER + username.substring(0, 4)).intern();
		synchronized (lock) {
			Entry entry = entryRepository.findByUsernameAndGamename(username, entryForm.getGamename());
			if (entry == null) {
				entry = entryForm.update(new Entry());
				entry.setUsername(username);
				entryRepository.insert(entry);
				ret.put("status", "ok");
			} else if (entry.getDeled()) {
				entry = entryForm.update(entry);
				entry.setDeled(false);
				entryRepository.save(entry);
				ret.put("status", "ok");
			} else {
				ret.put("status", "fail");
				ret.put("data", "重复报名");
			}
		}

		return ret;
	}

	private TeamEntry buildTeamEntry(TeamEntryForm teamEntryForm, Team team) {
		TeamEntry teamEntry = new TeamEntry();
		teamEntry.setDeled(false);
		teamEntry.setGamename(teamEntryForm.getGamename());
		teamEntry.setTeamid(teamEntryForm.getTeamid());
		teamEntry.setTeamCnname(team.getCnname());
		teamEntry.setTeamEnname(team.getEnname());
		teamEntry.setTeamInfo(team.getInfo());
		teamEntry.setTeamNum(team.getNowNum());
		teamEntry.setUsers(new ArrayList<String>());
		teamEntry.setEmails(new ArrayList<String>());
		teamEntry.setPhones(new ArrayList<String>());
		return teamEntry;
	}

	private boolean checkGameNumLimit(Game game, Team team) {
		if (game.getTeamSign() == 0 && team.getNowNum() == game.getTeamNum()) {
			return true;
		} else if (game.getTeamSign() == 1 && team.getNowNum() < game.getTeamNum()) {
			return true;
		} else if (game.getTeamSign() == 2 && team.getNowNum() > game.getTeamNum()) {
			return true;
		}
		return false;
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
		Game game = gameRepository.findByGamename(teamEntryForm.getGamename());
		if (game == null)
			return new ResponseEntity<Object>(HttpStatus.NOT_FOUND);
		long now = System.currentTimeMillis();
		if (!(game.isDeled() == false && game.getStep() == 2 && now > game.getStartTime() && now < game.getDueTime()))
			return new ResponseEntity<Object>(HttpStatus.FORBIDDEN);

		String teamLock = (LockPrefix.TEAM
				+ teamEntryForm.getTeamid().substring(teamEntryForm.getTeamid().length() - 4)).intern();
		synchronized (teamLock) {
			Team team = teamRepository.findById(teamEntryForm.getTeamid());
			if (team == null || team.getEntryed())
				return new ResponseEntity<Object>(HttpStatus.NOT_FOUND);
			if (!username.equals(team.getLeader()))
				return new ResponseEntity<Object>(HttpStatus.FORBIDDEN);
			if(!checkGameNumLimit(game, team))
				return new ResponseEntity<Object>(HttpStatus.FORBIDDEN);
			
			String entryLock = LockPrefix.lockTeamEntry(game.getGamename()).intern();
			synchronized (entryLock) {
				List<Member> members = memberRepository.findByTeamidAndAccepted(team.getId(), true);
				List<String> userQuery = members.stream().map(e -> e.getUsername()).collect(Collectors.toList());
				userQuery.add(team.getLeader());
				
				List<Entry> entrys = entryRepository.findByGamenameAndInUsernames(game.getGamename(), userQuery);
				if (entrys.size() > 0) {
					ret.put("status", "fail");
					ret.put("data", "队伍中有已经参赛的成员！");
					return ret;
				}

				TeamEntry teamEntry = buildTeamEntry(teamEntryForm, team);
				List<User> users = userRepository.findByUsernameInList(userQuery);
				for (User user : users) {
					teamEntry.getUsers().add(user.getUsername());
					teamEntry.getPhones().add(user.getPhone());
					teamEntry.getEmails().add(user.getEmail());
				}
				teamEntryRepository.insert(teamEntry);

				entrys = userQuery.stream().map(e -> {
					Entry entry = new Entry();
					entry.setGamename(game.getGamename());
					entry.setUsername(e);
					entry.setDeled(false);
					return entry;
				}).collect(Collectors.toList());
				entryRepository.save(entrys);

			}
			
			team.setGamename(game.getGamename());
			team.setEntryed(true);
			teamRepository.save(team);
		}

		
		ret.put("status", "ok");
		return ret;
	}

}
