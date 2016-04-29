package crazy.action;

import java.util.ArrayList;
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
import crazy.dao.MessageRepository;
import crazy.dao.TeamRepository;
import crazy.form.MessageTeamsForm;
import crazy.form.MessageUsersForm;
import crazy.vo.Game;
import crazy.vo.Manager;
import crazy.vo.Member;
import crazy.vo.Message;
import crazy.vo.MessageRecord;
import crazy.vo.Team;

@RestController
@RequestMapping(value = "/message")
public class MessageAction {

	@Autowired
	private MessageRecordRepository messageRecordRepository;

	@Autowired
	private MessageRepository messageRepository;

	@Autowired
	private GameRepository gameRepository;

	@Autowired
	private ManagerRepository managerRepository;

	@Autowired
	private MemberRepository memberRepository;

	@Autowired
	private TeamRepository teamRepository;

	/**
	 * 群发私信
	 * 
	 * @param messagesForm
	 * @param bindingResult
	 * @return
	 */
	@RequestMapping(value = "messages/users", method = RequestMethod.POST)
	public Object sendMessageUsers(@Valid MessageUsersForm messagesForm, BindingResult bindingResult) {
		Game game = gameRepository.findByGamename(messagesForm.getGamename());
		if (game == null)
			return new ResponseEntity<Object>(HttpStatus.NOT_FOUND);
		if (!authCheck(game))
			return new ResponseEntity<Object>(HttpStatus.FORBIDDEN);

		List<Message> msgs = messagesForm.getMessages();
		messageRepository.insert(msgs);
		MessageRecord record = messagesForm.getMessageRecord();
		messageRecordRepository.insert(record);
		return "ok";
	}

	@RequestMapping(value = "messages/teams", method = RequestMethod.POST)
	public Object sendMessageTeams(@Valid MessageTeamsForm messagesForm, BindingResult bindingResult) {
		Game game = gameRepository.findByGamename(messagesForm.getGamename());
		if (game == null)
			return new ResponseEntity<Object>(HttpStatus.NOT_FOUND);
		if (!authCheck(game))
			return new ResponseEntity<Object>(HttpStatus.FORBIDDEN);

		List<String> teamids = Arrays.asList(messagesForm.getTeams().split(","));
		List<Team> teams = teamRepository.findByIds(teamids);
		List<Member> members = memberRepository.findByTeamidsAndAccepted(teamids, true);
		List<String> users = Stream
				.of(members.stream().map(e -> e.getUsername()), teams.stream().map(e -> e.getOwner())).flatMap(e -> e)
				.distinct().collect(Collectors.toList());

		List<Message> messages = new ArrayList<Message>();
		long nowTime = System.currentTimeMillis();
		users.stream().forEach(username -> {
			Message msg = new Message();
			msg.setSender(messagesForm.getSender());
			msg.setRecver(username);
			msg.setSendTime(nowTime);
			msg.setReadTime(0);
			msg.setText(messagesForm.getText());
			messages.add(msg);
		});

		messageRepository.insert(messages);
		MessageRecord record = messagesForm.getMessageRecord();
		messageRecordRepository.insert(record);
		return "ok";
	}

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
