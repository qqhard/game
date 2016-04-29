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
import org.springframework.web.bind.annotation.RestController;

import crazy.dao.GameRepository;
import crazy.dao.ManagerRepository;
import crazy.dao.MemberRepository;
import crazy.dao.MessageRecordRepository;
import crazy.dao.TeamRepository;
import crazy.dao.UserRepository;
import crazy.form.EmailTeamsForm;
import crazy.form.EmailUsersForm;
import crazy.service.MessageSend;
import crazy.vo.Game;
import crazy.vo.Manager;
import crazy.vo.Member;
import crazy.vo.MessageRecord;
import crazy.vo.Team;

@RestController
@RequestMapping(value = "/message")
public class EmailAction {
	@Autowired
	private MessageRecordRepository messageRecordRepository;

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

	/**
	 * 群发邮件
	 * 
	 * @param emailForm
	 * @param bindingResult
	 * @return
	 */
	@RequestMapping(value = "email/users", method = RequestMethod.POST)
	public Object sendEmailUsers(@Valid EmailUsersForm emailForm, BindingResult bindingResult) {
		Game game = gameRepository.findByGamename(emailForm.getGamename());
		if (game == null)
			return new ResponseEntity<Object>(HttpStatus.NOT_FOUND);
		if (!authCheck(game))
			return new ResponseEntity<Object>(HttpStatus.FORBIDDEN);
		
		String[] temp = emailForm.getUsers().split(",");
		List<String> users = Arrays.asList(temp);
		MessageRecord record = new MessageRecord();
		record = emailForm.update(record);
		record.setUsers(users);
		messageRecordRepository.insert(record);
		
		Object[] addrs = userRepository.findByUsernameInList(users).stream().map(e -> e.getEmail()).toArray();
		for (Object addr : addrs) {
			MessageSend.sendByEmail((String) addr, emailForm.getTitle(), emailForm.getBody());
		}
		return "ok";
	}
	
	@RequestMapping(value = "email/teams", method = RequestMethod.POST)
	public Object sendEmailTeams(@Valid EmailTeamsForm emailForm, BindingResult bindingResult) {
		Game game = gameRepository.findByGamename(emailForm.getGamename());
		if (game == null)
			return new ResponseEntity<Object>(HttpStatus.NOT_FOUND);
		if (!authCheck(game))
			return new ResponseEntity<Object>(HttpStatus.FORBIDDEN);
		
		List<String> teamids = Arrays.asList(emailForm.getTeams().split(","));
		List<Team> teams = teamRepository.findByIds(teamids);
		List<Member> members = memberRepository.findByTeamidsAndAccepted(teamids, true);
		List<String> users = Stream
				.of(members.stream().map(e -> e.getUsername()), teams.stream().map(e -> e.getOwner())).flatMap(e -> e)
				.distinct().collect(Collectors.toList());

		MessageRecord record = new MessageRecord();
		record = emailForm.update(record);
		record.setUsers(users);
		messageRecordRepository.insert(record);
		Object[] addrs = userRepository.findByUsernameInList(users).stream().map(e -> e.getEmail()).toArray();
		for (Object addr : addrs) {
			MessageSend.sendByEmail((String) addr, emailForm.getTitle(), emailForm.getBody());
		}
		return "ok";
	}
}
