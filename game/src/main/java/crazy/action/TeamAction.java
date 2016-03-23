package crazy.action;

import java.util.HashMap;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import crazy.dao.TeamRepository;
import crazy.form.TeamForm;
import crazy.vo.Team;

@RestController
public class TeamAction {
	@Autowired
	private TeamRepository teamRepository;
	
	
	
	@ResponseBody
	@RequestMapping(value="/game/team", method = RequestMethod.POST)
	public Object post(@Valid TeamForm teamForm, BindingResult bindingResult){
		HashMap<String,Object> ret = new HashMap<>();
		
		if(bindingResult.hasFieldErrors()){
			ret.put("status", "fail");
			return ret;
		}
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		Team team = new Team();
		team = teamForm.update(team);
		team.setLeader(username);
		team.setEntryed(false);
		teamRepository.insert(team);
		ret.put("status", "ok");
		
		return ret;
	}
	
	@ResponseBody
	@RequestMapping(value="/game/team/{teamid}", method = RequestMethod.GET)
	public Object get(@PathVariable("teamid") String teamid){
		return teamRepository.findById(teamid);
	}
	
	@ResponseBody
	@RequestMapping(value="/game/teams", method = RequestMethod.GET)
	public Object gets(){
		return teamRepository.findByEntryed(false);
	}
	
	@ResponseBody
	@RequestMapping(value="/game/teams/{leader}", method = RequestMethod.GET)
	public Object getMyTeams(@PathVariable("leader") String leader,@RequestParam("entryed") Boolean entryed){
		return teamRepository.findByLeaderAndEntryed(leader,entryed);
	}
}
