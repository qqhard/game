package crazy.action;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import crazy.dao.GameRepository;
import crazy.dao.ManagerRepository;
import crazy.dao.MessagePageable;
import crazy.dao.MessageRecordRepository;
import crazy.dao.MessageRepository;
import crazy.dao.UserRepository;
import crazy.form.EmailForm;
import crazy.form.MessageForm;
import crazy.form.MessagesForm;
import crazy.form.PhoneForm;
import crazy.service.MessageSend;
import crazy.service.PhoneMessage;
import crazy.vo.Game;
import crazy.vo.Manager;
import crazy.vo.Message;
import crazy.vo.MessageRecord;
import crazy.vo.User;

@RestController
@RequestMapping(value = "/message")
public class MessageSendAction {
	@Autowired
	private MessageRecordRepository messageRecordRepository;

	@Autowired
	private MessageRepository messageRepository;

	@Autowired
	private GameRepository gameRepository;

	@Autowired
	private ManagerRepository managerRepository;

	@Autowired
	private UserRepository userRepository;

	@ResponseBody
	@RequestMapping(value = "send", method = RequestMethod.GET)
	public Object getAll(@RequestParam(value = "pageSize", required = false) Integer pageSize,
			@RequestParam(value = "currentPage", required = false) Integer currentPage) {
		Map<String, Object> ret = new HashMap<String, Object>();
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		MessagePageable page = new MessagePageable();
		page.setSort(new Sort(new Order("sendTime").with(Sort.Direction.DESC)));

		if (pageSize != null)
			page.setPageSize(pageSize);
		if (currentPage != null)
			page.setPageNumber(currentPage);
		ret.put("totalCount", messageRepository.countBySender(username));
		ret.put("data", messageRepository.findBySender(username, page));
		return ret;
	}

	/**
	 * 群发短信
	 * 
	 * @param phoneForm
	 * @param bindingResult
	 * @return
	 */
	@RequestMapping(value = "phone", method = RequestMethod.POST)
	public @ResponseBody Object sendPhone(@Valid PhoneForm phoneForm, BindingResult bindingResult) {
		Game game = gameRepository.findByGamename(phoneForm.getGamename());
		if (game == null)
			return new ResponseEntity<Object>(HttpStatus.NOT_FOUND);
		if (!authCheck(game))
			return new ResponseEntity<Object>(HttpStatus.FORBIDDEN);

		PhoneMessage.send(phoneForm.getPhones(), phoneForm.getType(), phoneForm.getText());
		return "ok";
	}

	/**
	 * 群发邮件
	 * 
	 * @param emailForm
	 * @param bindingResult
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "email", method = RequestMethod.POST)
	public Object sendEmail(@Valid EmailForm emailForm, BindingResult bindingResult) {
		Game game = gameRepository.findByGamename(emailForm.getGamename());
		if (game == null)
			return new ResponseEntity<Object>(HttpStatus.NOT_FOUND);
		if (!authCheck(game))
			return new ResponseEntity<Object>(HttpStatus.FORBIDDEN);

		MessageRecord record = new MessageRecord();
		record = emailForm.update(record);
		messageRecordRepository.insert(record);

		List<String> users = Arrays.asList(emailForm.getUsers().split(","));
		Object[] addrs = userRepository.findByUsernameInList(users).stream().map(e -> e.getEmail()).toArray();
		for(Object addr : addrs){
			MessageSend.sendByEmail((String)addr, emailForm.getTitle(),
			emailForm.getBody());
		}
		return "ok";
	}

	/**
	 * 发送私信
	 * 
	 * @param messageForm
	 * @param bindingResult
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "message", method = RequestMethod.POST)
	public Object sendMessage(@Valid MessageForm messageForm, BindingResult bindingResult) {
		String sender = SecurityContextHolder.getContext().getAuthentication().getName();
		Message msg = new Message();
		msg = messageForm.update(msg);
		msg.setSender(sender);
		messageRepository.insert(msg);

		return "ok";
	}

	/**
	 * 群发私信
	 * 
	 * @param messagesForm
	 * @param bindingResult
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "messages", method = RequestMethod.POST)
	public Object sendMessages(@Valid MessagesForm messagesForm, BindingResult bindingResult) {
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
