package crazy.action;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import crazy.dao.GameRepository;
import crazy.dao.ManagerRepository;
import crazy.dao.MemberRepository;
import crazy.dao.TeamRepository;
import crazy.dao.UserRepository;
import crazy.form.PhoneTeamsForm;
import crazy.form.PhoneUsersForm;
import crazy.service.MessageSend;
import crazy.vo.Game;
import crazy.vo.Manager;
import crazy.vo.Member;
import crazy.vo.Team;

@RestController
@RequestMapping(value = "/message")
public class PhoneAction {
	@Autowired
	private GameRepository gameRepository;

	@Autowired
	private ManagerRepository managerRepository;

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private MemberRepository memberRepository;
	
	@Autowired
	private TeamRepository teamRepository;
	/**
	 * 群发短信
	 * 
	 * @param phoneForm
	 * @param bindingResult
	 * @return
	 */
	@RequestMapping(value = "phone/users", method = RequestMethod.POST)
	public @ResponseBody Object sendPhoneUsers(@Valid PhoneUsersForm phoneForm, BindingResult bindingResult) {
		Game game = gameRepository.findByGamename(phoneForm.getGamename());
		if (game == null)
			return new ResponseEntity<Object>(HttpStatus.NOT_FOUND);
		if (!authCheck(game))
			return new ResponseEntity<Object>(HttpStatus.FORBIDDEN);

		List<String> users = Arrays.asList(phoneForm.getUsers().split(","));
		List<String> phoneList = userRepository.findByUsernameInList(users).stream().distinct().map(e -> e.getPhone())
				.collect(Collectors.toList());
		String phones = String.join(",", phoneList) ;
		MessageSend.sendByPhone(phones, phoneForm.getType(), phoneForm.getText());
		// PhoneMessage.send(phones, phoneForm.getType(), phoneForm.getText());
		return "ok";
	}
	@RequestMapping(value = "phone/teams", method = RequestMethod.POST)
	public @ResponseBody Object sendPhoneTeams(@Valid PhoneTeamsForm phoneForm, BindingResult bindingResult) {
		Game game = gameRepository.findByGamename(phoneForm.getGamename());
		if (game == null)
			return new ResponseEntity<Object>(HttpStatus.NOT_FOUND);
		if (!authCheck(game))
			return new ResponseEntity<Object>(HttpStatus.FORBIDDEN);
		
		List<String> teamids = Arrays.asList(phoneForm.getTeams().split(","));
		List<Team> teams = teamRepository.findByIds(teamids);
		List<Member> members = memberRepository.findByTeamidsAndAccepted(teamids, true);
		List<String> users = Stream
				.of(members.stream().map(e -> e.getUsername()), teams.stream().map(e -> e.getOwner())).flatMap(e -> e)
				.distinct().collect(Collectors.toList());
		List<String> phoneList = userRepository.findByUsernameInList(users).stream().distinct().map(e -> e.getPhone())
				.collect(Collectors.toList());
		System.out.println(phoneList);
		String phones = String.join(",", phoneList);
		MessageSend.sendByPhone(phones, phoneForm.getType(), phoneForm.getText());
		// PhoneMessage.send(phones, phoneForm.getType(), phoneForm.getText());
		return "ok";
	}
	/**
	 * 检验权限
	 * 
	 * @param game
	 * @return
	 */
	private boolean authCheck(Game game) {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		if (game.getOwner().equals(username)) {
			return true;
		}
		Manager manager = managerRepository.findByGamenameAndUsername(game.getGamename(), username);
		if (manager != null) {
			return true;
		}
		return false;
	}
}
