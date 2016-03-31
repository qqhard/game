package crazy.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import crazy.dao.EntryRepository;
import crazy.dao.MemberRepository;
import crazy.dao.TeamEntryRepository;
import crazy.dao.TeamRepository;
import crazy.dao.UserRepository;
import crazy.form.EntryForm;
import crazy.form.TeamEntryForm;
import crazy.vo.Entry;
import crazy.vo.Member;
import crazy.vo.Team;
import crazy.vo.TeamEntry;
import crazy.vo.User;

@RestController
@RequestMapping(value = "/game/entry")
public class EntryAction {
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
	
	@ResponseBody
	@RequestMapping(value="individual", method = RequestMethod.POST)
	public Object postIndividual(@Valid EntryForm entryForm,BindingResult bindingResult){
		Map<String,String> ret = new HashMap<String,String>();
		if(bindingResult.hasFieldErrors()){
			List<FieldError> errors = bindingResult.getFieldErrors();
			ret.put("status", "fail");
			for(FieldError error : errors){
				ret.put(error.getField(), error.getCode());
			}
			return ret;
		}
		
		
		Entry entry = entryRepository.findByUsernameAndGamename(entryForm.getUsername(), entryForm.getGamename());
		if(entry == null){
			entry = new Entry();
			entry =  entryForm.update(entry);
			entryRepository.insert(entry);
			ret.put("status", "ok");
			return ret;
		}
		
		if(entry.getDeled()){
			entry =  entryForm.update(entry);
			entryRepository.save(entry);
			ret.put("status", "ok");
			return ret;
		}
		
		ret.put("status", "fail");
		ret.put("data", "重复报名");
		return ret;
	}
	
	@ResponseBody
	@RequestMapping(value="team", method = RequestMethod.POST)
	public Object postTeam(@Valid TeamEntryForm teamEntryForm,BindingResult bindingResult){
		Map<String,String> ret = new HashMap<String,String>();
		if(bindingResult.hasFieldErrors()){
			List<FieldError> errors = bindingResult.getFieldErrors();
			ret.put("status", "fail");
			for(FieldError error : errors){
				ret.put(error.getField(), error.getCode());
			}
			return ret;
		}
		
		String lock = teamEntryForm.getTeamid().substring(teamEntryForm.getTeamid().length() - 4).intern();
		boolean flag = true;
		Team team = null;
		synchronized(lock){
			team = teamRepository.findById(teamEntryForm.getTeamid());
			ret.put("status", "fail");
			if(team == null){
				ret.put("data", "队伍不存在!");
			}else if(!team.getLeader().equals(SecurityContextHolder.getContext().getAuthentication().getName())){
				ret.put("data", "队伍权限问题！");
			}else if(team.getEntryed()){
				ret.put("data", "队伍已经参与其他赛事!");
			}else{
				team.setEntryed(true);
				team.setGamename(teamEntryForm.getGamename());
				flag = false;
				teamRepository.save(team);
			}
		}
		if(flag) return ret;
		
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
	
		
		List<Member> members = memberRepository.findByTeamidAndAccepted(team.getId(), true);
		List<String> usernames = new ArrayList<String>();
		usernames.add(team.getLeader());
		for(Member mem: members){
			usernames.add(mem.getUsername());
		}
		List<User> users = userRepository.findByUsernameInList(usernames);
		for(User user : users){
			teamEntry.getUsers().add(user.getUsername());
			teamEntry.getPhones().add(user.getPhone());
			teamEntry.getEmails().add(user.getEmail());
		}
		teamEntryRepository.save(teamEntry);
		ret.put("status", "ok");
		return ret;
	}

}
