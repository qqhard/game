package crazy.action;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
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
	@RequestMapping(value="/game/members/{teamid}", method = RequestMethod.GET)
	public Object gets(@PathVariable("teamid") String teamid){
		return memberRepository.findByTeamidAndAccepted(teamid,true);
	}
	
	@ResponseBody
	@RequestMapping(value="/game/members/apply/{teamid}", method = RequestMethod.GET)
	public Object getApplys(@PathVariable("teamid") String teamid){
		return memberRepository.findByTeamidAndApplyed(teamid, true);
	}
	
	@ResponseBody
	@RequestMapping(value="/game/members/invite/{teamid}", method = RequestMethod.GET)
	public Object getInvites(@PathVariable("teamid") String teamid){
		return memberRepository.findByTeamidAndInvited(teamid, true);
	}
	
	
	@ResponseBody
	@RequestMapping(value="/game/member/apply/{teamid}", method = RequestMethod.POST)
	public Object postApply(@PathVariable("teamid") String teamid){
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		String ret = "ok";
		String lock = teamid.substring(0, 4).intern();
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
	@RequestMapping(value="/game/member/invite/{teamid}/{username}", method = RequestMethod.POST)
	public Object postInvite(@PathVariable("teamid") String teamid,@PathVariable("username") String username){
		User user = userRepository.findByUsername(username);
		if(user == null)return "用户不存在！";
		String ret = "ok";
		String lock = teamid.substring(0, 4).intern();
		synchronized(lock){
			Member member = memberRepository.findByTeamidAndUsername(teamid, username);
			if(member == null){
				member = new Member();
				member.setAccepted(false);
				member.setInvited(true);
				member.setUsername(username);
				member.setTeamid(teamid);
				memberRepository.insert(member);
			}else if(member.getAccepted()){
				ret = "你已经是该队伍的一员！";
			}else if(member.getInvited()){
				ret = "请勿重复邀请！";
			}else{
				member.setInvited(true);
				memberRepository.save(member);
			}
		}
		return ret;
	}
	
	@ResponseBody
	@RequestMapping(value="/game/member/memaccept/{memberid}", method = RequestMethod.POST)
	public Object postMemberAccept(@PathVariable("memberid") String memberid){
		Member member = memberRepository.findById(memberid);
		if(member == null)return "fail";
		String ret = "ok";
		Team team = teamRepository.findById(member.getTeamid());
		
		String lock = team.getId().substring(0,4).intern();
		synchronized(lock){
			int now_num = memberRepository.countByTeamidAndAccepted(team.getId(), true);
			if(now_num >= team.getNum()) {
				ret = "人数已经达到上限！";
			}else{
				member.setAccepted(true);
				memberRepository.save(member);
			}
		}
		return ret;
	}
	
	@ResponseBody
	@RequestMapping(value="/game/member/leaaccept/{memberid}", method = RequestMethod.POST)
	public Object postLeaderAccept(@PathVariable("memberid") String memberid){
		Member member = memberRepository.findById(memberid);
		if(member == null)return "fail";
		String ret = "ok";
		Team team = teamRepository.findById(member.getTeamid());
		
		String lock = team.getId().substring(0,4).intern();
		synchronized(lock){
			int now_num = memberRepository.countByTeamidAndAccepted(team.getId(), true);
			if(now_num >= team.getNum()) {
				ret = "人数已经达到上限！";
			}else{
				member.setAccepted(true);
				memberRepository.save(member);
			}
		}
		
		return ret;
	}
	
	@ResponseBody
	@RequestMapping(value="/game/member/memrefuse/{memberid}", method = RequestMethod.POST)
	public Object postMemberRefuse(@PathVariable("memberid") String memberid){
		Member member = memberRepository.findById(memberid);
		if(member == null)return "fail";
		String ret = "ok";
		
		String lock = memberid.substring(0,4).intern();
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
	@RequestMapping(value="/game/member/learefuse/{memberid}", method = RequestMethod.POST)
	public Object postLeaderRefuse(@PathVariable("memberid") String memberid){
		Member member = memberRepository.findById(memberid);
		if(member == null)return "fail";
		String ret = "ok";
		
		String lock = memberid.substring(0,4).intern();
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
	@RequestMapping(value="/game/member/learevoke/{memberid}", method = RequestMethod.POST)
	public Object postLeaderRevoke(@PathVariable("memberid") String memberid){
		Member member = memberRepository.findById(memberid);
		if(member == null)return "fail";
		String ret = "ok";
		
		String lock = memberid.substring(0,4).intern();
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
}
