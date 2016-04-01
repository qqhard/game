package crazy.action;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import crazy.dao.MemberRepository;
import crazy.dao.TeamRepository;
import crazy.dao.UserRepository;
import crazy.vo.Member;
import crazy.vo.Team;
import crazy.vo.User;

@RestController
public class MemberAction {
	@Autowired
	private MemberRepository memberRepository;
	@Autowired
	private TeamRepository teamRepository;
	@Autowired
	private UserRepository userRepository;
	
	@ResponseBody
	@RequestMapping(value="/members/{teamid}", method = RequestMethod.GET)
	public Object gets(@PathVariable("teamid") String teamid){
		return memberRepository.findByTeamidAndAccepted(teamid,true);
	}
	
	@ResponseBody
	@RequestMapping(value="/members/apply/{teamid}", method = RequestMethod.GET)
	public Object getApplys(@PathVariable("teamid") String teamid){
		return memberRepository.findByTeamidAndApplyed(teamid, true);
	}
	
	@ResponseBody
	@RequestMapping(value="/members/invite/{teamid}", method = RequestMethod.GET)
	public Object getInvites(@PathVariable("teamid") String teamid){
		return memberRepository.findByTeamidAndInvited(teamid, true);
	}
	
	
	@ResponseBody
	@RequestMapping(value="/member/apply/{teamid}", method = RequestMethod.POST)
	public Object postApply(@PathVariable("teamid") String teamid){
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		String ret = "ok";
		Team team = teamRepository.findById(teamid);
		if(team == null) return "fail";
		
		String lock = teamid.substring(teamid.length() - 4).intern();
		synchronized(lock){
			Member member = memberRepository.findByTeamidAndUsername(teamid, username);
			if(member == null){
				member = new Member();
				member.setAccepted(false);
				member.setApplyed(true);
				member.setUsername(username);
				member.setTeamid(teamid);
				memberRepository.insert(member);
			}else if(member.getAccepted()){
				ret = "你已经是该队伍的一员！";
			}else if(member.getApplyed()){
				ret = "请勿重复申请！";
			}else{
				member.setApplyed(true);
				memberRepository.save(member);
			}
		}
		return ret;
	}
	
	@ResponseBody
	@RequestMapping(value="/member/invite/{teamid}/{username}", method = RequestMethod.POST)
	public Object postInvite(@PathVariable("teamid") String teamid,@PathVariable("username") String username){
		HashMap<String,Object> ret = new HashMap<>();
		User user = userRepository.findByUsername(username);
		if(user == null){
			ret.put("status", "fail");
			ret.put("data", "用户不存在");
			return ret;
		}
		
		Team team = teamRepository.findById(teamid);
		if(team == null) return "fail";
		if(!team.getLeader().equals(SecurityContextHolder.getContext().getAuthentication().getName()))
			return new ResponseEntity<Object>(HttpStatus.FORBIDDEN);
		
		ret.put("status", "ok");
		String lock = teamid.substring(teamid.length() - 4).intern();
		synchronized(lock){
			Member member = memberRepository.findByTeamidAndUsername(teamid, username);
			if(member == null){
				member = new Member();
				member.setAccepted(false);
				member.setInvited(true);
				member.setUsername(username);
				member.setTeamid(teamid);
				memberRepository.insert(member);
				ret.put("data", member);
			}else if(member.getAccepted()){
				ret.put("status", "fail");
				ret.put("data", "你已经是该队伍的一员！");
			}else if(member.getInvited()){
				ret.put("status", "fail");
				ret.put("data", "请勿重复邀请！");
			}else{
				member.setInvited(true);
				memberRepository.save(member);
				ret.put("data", member);
			}
		}
		return ret;
	}
	
	@ResponseBody
	@RequestMapping(value="/member/memaccept/{memberid}", method = RequestMethod.POST)
	public Object postMemberAccept(@PathVariable("memberid") String memberid){
		Member member = memberRepository.findById(memberid);
		if(member == null)return "fail";
		String ret = "ok";
		Team team = teamRepository.findById(member.getTeamid());
		if(team == null)return "fail";
		if(!member.getUsername().equals(SecurityContextHolder.getContext().getAuthentication().getName()))
			return new ResponseEntity<Object>(HttpStatus.FORBIDDEN);
		
		String lock = team.getId().substring(team.getId().length() - 4).intern();
		synchronized(lock){
			int nowNum = memberRepository.countByTeamidAndAccepted(team.getId(), true);
			if(nowNum + 1 >= team.getLimitNum()) {
				ret = "人数已经达到上限！";
			}else{
				member.setAccepted(true);
				team.setNowNum(nowNum + 2);
				memberRepository.save(member);
				teamRepository.save(team);
			}
		}
		return ret;
	}
	
	@ResponseBody
	@RequestMapping(value="/member/leaaccept/{memberid}", method = RequestMethod.POST)
	public Object postLeaderAccept(@PathVariable("memberid") String memberid){
		Member member = memberRepository.findById(memberid);
		if(member == null)return "fail";
		String ret = "ok";
		Team team = teamRepository.findById(member.getTeamid());
		if(team == null)return "fail";
		if(!team.getLeader().equals(SecurityContextHolder.getContext().getAuthentication().getName()))
			return new ResponseEntity<Object>(HttpStatus.FORBIDDEN);
		
		String lock = team.getId().substring(team.getId().length() - 4).intern();
		synchronized(lock){
			int nowNum = memberRepository.countByTeamidAndAccepted(team.getId(), true);
			if(nowNum + 1 >= team.getLimitNum()) {
				ret = "人数已经达到上限！";
			}else{
				member.setAccepted(true);
				team.setNowNum(nowNum + 2);
				memberRepository.save(member);
				teamRepository.save(team);
			}
		}
		
		return ret;
	}
	
	@ResponseBody
	@RequestMapping(value="/member/memrefuse/{memberid}", method = RequestMethod.POST)
	public Object postMemberRefuse(@PathVariable("memberid") String memberid){
		Member member = memberRepository.findById(memberid);
		if(member == null)return "fail";
		String ret = "ok";
		
		Team team = teamRepository.findById(member.getTeamid());
		if(team == null)return "fail";
		if(!team.getLeader().equals(SecurityContextHolder.getContext().getAuthentication().getName()))
			return new ResponseEntity<Object>(HttpStatus.FORBIDDEN);
		
		String lock = team.getId().substring(team.getId().length() - 4).intern();
		synchronized(lock){
			if(member.getAccepted()){
				ret = "用户已经在队伍中！";
			}else{
				member.setInvited(false);
				memberRepository.save(member);
			}
		}
		return ret;
	}
	
	@ResponseBody
	@RequestMapping(value="/member/learefuse/{memberid}", method = RequestMethod.POST)
	public Object postLeaderRefuse(@PathVariable("memberid") String memberid){
		Member member = memberRepository.findById(memberid);
		if(member == null)return "fail";
		String ret = "ok";
		
		Team team = teamRepository.findById(member.getTeamid());
		if(team == null)return "fail";
		if(!team.getLeader().equals(SecurityContextHolder.getContext().getAuthentication().getName()))
			return new ResponseEntity<Object>(HttpStatus.FORBIDDEN);
		
		String lock = team.getId().substring(team.getId().length() - 4).intern();
		synchronized(lock){
			if(member.getAccepted()){
				ret = "用户已经在队伍中！";
			}else{
				member.setApplyed(false);
				memberRepository.save(member);
			}
		}
		return ret;
	}
	
	@ResponseBody
	@RequestMapping(value="/member/learevoke/{memberid}", method = RequestMethod.POST)
	public Object postLeaderRevoke(@PathVariable("memberid") String memberid){
		Member member = memberRepository.findById(memberid);
		if(member == null)return "fail";
		String ret = "ok";
		
		Team team = teamRepository.findById(member.getTeamid());
		if(team == null)return "fail";
		if(!team.getLeader().equals(SecurityContextHolder.getContext().getAuthentication().getName()))
			return new ResponseEntity<Object>(HttpStatus.FORBIDDEN);
		
		String lock = team.getId().substring(team.getId().length() - 4).intern();
		synchronized(lock){
			if(member.getAccepted()){
				ret = "用户已经在队伍中！";
			}else{
				member.setInvited(false);
				memberRepository.save(member);
			}
		}
		return ret;
	}
	
	@ResponseBody
	@RequestMapping(value="/member/delete/{memberid}", method = RequestMethod.POST)
	public Object postDel(@PathVariable("memberid") String memberid){
		Member member = memberRepository.findById(memberid);
		System.out.println(memberid);
		if(member == null)return "fail";
		String ret = "ok";
		Team team = teamRepository.findById(member.getTeamid());
		if(!team.getLeader().equals(SecurityContextHolder.getContext().getAuthentication().getName()))
			return new ResponseEntity<Object>(HttpStatus.FORBIDDEN);
		
		String lock = team.getId().substring(team.getId().length() - 4).intern();
		synchronized(lock){
			if(member.getAccepted()){
				member.setAccepted(false);
				member.setInvited(false);
				member.setApplyed(false);
				memberRepository.save(member);
				team.setNowNum(team.getNowNum() - 1);
				teamRepository.save(team);
			}else{
				ret = "该队员已经不在队伍中!";
			}
		}
		return ret;
	}
}
