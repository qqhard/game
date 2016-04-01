package crazy.action;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;
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
import crazy.form.PhoneForm;
import crazy.service.MessageSend;
import crazy.service.PhoneMessage;
import crazy.vo.Message;
import crazy.vo.MessageRecord;
import org.json.JSONObject;

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
		page.setSort(new Sort(new Order("sendTime").with(Sort.Direction.DESC)));
	
		if(pageSize != null)page.setPageSize(pageSize);
		if(currentPage != null)page.setPageNumber(currentPage);
		ret.put("totalCount", messageRepository.countBySender(username));
		ret.put("data",  messageRepository.findBySender(username,page));
		return ret;
	}	
	
	
	@RequestMapping(value = "phone", method = RequestMethod.POST)
	public @ResponseBody Object sendPhone(@Valid PhoneForm phoneForm,BindingResult bindingResult){
		System.out.println(phoneForm.getText());
		PhoneMessage.send(phoneForm.getPhones(), phoneForm.getType(), phoneForm.getText());
		return "ok";
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
		String sender = SecurityContextHolder.getContext().getAuthentication().getName();
		Message msg = new Message();
		msg = messageForm.update(msg);
		msg.setSender(sender);
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
