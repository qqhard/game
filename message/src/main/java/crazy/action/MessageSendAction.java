package crazy.action;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import crazy.dao.MessagePageable;
import crazy.dao.MessageRecordRepository;
import crazy.dao.MessageRepository;
import crazy.form.EmailForm;
import crazy.form.MessageForm;
import crazy.form.MessagesForm;
import crazy.service.MessageSend;
import crazy.vo.Message;
import crazy.vo.MessageRecord;

@RestController
@RequestMapping(value = "/message")
public class MessageSendAction {
	@Autowired
	private MessageRecordRepository messageRecordRepository;
	
	@Autowired
	private MessageRepository messageRepository;
	
	
	@ResponseBody
	@RequestMapping(value="send", method = RequestMethod.GET)
	public Object getAll(@RequestParam(value="pageSize",required=false) Integer pageSize,
			@RequestParam(value="currentPage",required=false) Integer currentPage){
		Map<String,Object> ret = new HashMap<String,Object>();
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		MessagePageable page = new MessagePageable();
		if(pageSize != null)page.setPageSize(pageSize);
		if(currentPage != null)page.setPageNumber(currentPage);
		ret.put("totalCount", messageRepository.countBySender(username));
		ret.put("data",  messageRepository.findBySender(username,page));
		return ret;
	}	
	
	
	@ResponseBody
	@RequestMapping(value = "email", method = RequestMethod.POST)
	public Object sendEmail(@Valid EmailForm emailForm,BindingResult bindingResult){
		MessageRecord record = new MessageRecord();
		record = emailForm.update(record);
		messageRecordRepository.insert(record);
		
		String[] addrs = emailForm.getAddrs().split(",");
		for(String addr : addrs){
			MessageSend.sendByEmail(addr, emailForm.getTitle(), emailForm.getBody());
		}
		return "ok";
	}
	
	@ResponseBody
	@RequestMapping(value = "message", method = RequestMethod.POST)
	public Object sendMessage(@Valid MessageForm messageForm,BindingResult bindingResult){
		Message msg = new Message();
		msg = messageForm.update(msg);
		messageRepository.insert(msg);
		return "ok";
	}
	
	@ResponseBody
	@RequestMapping(value = "messages", method = RequestMethod.POST)
	public Object sendMessages(@Valid MessagesForm messagesForm,BindingResult bindingResult){
		List<Message> msgs = messagesForm.getMessages();
		messageRepository.insert(msgs);
		MessageRecord record = messagesForm.getMessageRecord();
		messageRecordRepository.insert(record);
		return "ok";
	}
}
