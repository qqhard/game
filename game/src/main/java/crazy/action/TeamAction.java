package crazy.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

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

import crazy.dao.MemberRepository;
import crazy.dao.TeamRepository;
import crazy.form.TeamForm;
import crazy.vo.Member;
import crazy.vo.Team;

@RestController
public class TeamAction {
	@Autowired
	private TeamRepository teamRepository;

	@Autowired
	private MemberRepository memberRepository;

	@ResponseBody
	@RequestMapping(value = "/team", method = RequestMethod.POST)
	public Object post(@Valid TeamForm teamForm, BindingResult bindingResult) {
		HashMap<String, Object> ret = new HashMap<>();

		if (bindingResult.hasFieldErrors()) {
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
		ret.put("data", team.getId());
		return ret;
	}

	@ResponseBody
	@RequestMapping(value = "/team/{teamid}", method = RequestMethod.GET)
	public Object get(@PathVariable("teamid") String teamid) {
		return teamRepository.findById(teamid);
	}

	@ResponseBody
	@RequestMapping(value = "/teams", method = RequestMethod.GET)
	public Object gets() {
		return teamRepository.findByEntryed(false);
	}

	@ResponseBody
	@RequestMapping(value = "/teams/{leader}", method = RequestMethod.GET)
	public Object getMyTeams(@PathVariable("leader") String leader, @RequestParam("entryed") Boolean entryed) {
		return teamRepository.findByLeaderAndEntryed(leader, entryed);
	}

	@ResponseBody
	@RequestMapping(value = "/teams/membered", method = RequestMethod.GET)
	public Object getMyMemberTeams() {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		List<Member> members = memberRepository.findByUsernameAndAccepted(username,true);
		List<Team> ret = new ArrayList<Team>();
		for (Member member : members) {
			Team team = teamRepository.findById(member.getTeamid());
			if (team != null) {
				ret.add(team);
			}
		}
		return ret;
	}
	
	@ResponseBody
	@RequestMapping(value = "/teams/invited", method = RequestMethod.GET)
	public Object getMyInvitedTeams() {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		List<Member> members = memberRepository.findByUsernameAndInvited(username, true);
		List<HashMap<String,Object> > ret = new ArrayList<>();
		for (Member member : members) {
			Team team = teamRepository.findById(member.getTeamid());
			if (team != null) {
				HashMap<String,Object> map = new HashMap<>();
				map.put("id", team.getId());
				map.put("cnname", team.getCnname());
				map.put("enname", team.getEnname());
				map.put("info", team.getInfo());
				map.put("limitNum", team.getLimitNum());
				map.put("nowNum", team.getNowNum());
				map.put("leader", team.getLeader());
				map.put("memberid", member.getId());
				ret.add(map);
			}
		}
		return ret;
	}
}
