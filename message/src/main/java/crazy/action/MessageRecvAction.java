package crazy.action;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import crazy.dao.MessageRepository;
import crazy.vo.Message;

@RestController
@RequestMapping(value = "/message")
public class MessageRecvAction {
	@Autowired
	private MessageRepository messageRepository;
	
	@ResponseBody
	@RequestMapping(value="recv",method = RequestMethod.GET)
	public Object getAll(){
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		return messageRepository.findByRecverOrderBySendTimeDesc(username);
	}	
	
	@ResponseBody
	@RequestMapping(value = "recv/{sender}", method = RequestMethod.GET)
	public Object getFrom(@PathVariable("sender") String sender){
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		return messageRepository.findBySenderAndRecver(sender, username);
	}	
	
	@ResponseBody
	@RequestMapping(value = "recv/count", method = RequestMethod.GET)
	public Object getUnreadCount(){
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		return messageRepository.countByRecverAndReadTime(username, 0);
	}	
	
	@ResponseBody
	@RequestMapping(value = "read/{id}", method = RequestMethod.GET)
	public Object put(@PathVariable("id") String id){
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		Message msg = messageRepository.findById(id);
	
		if(username != null && !username.equals(msg.getRecver()))return 0;
		msg.setReadTime(System.currentTimeMillis());
		messageRepository.save(msg);
		return msg.getReadTime();
	}	
	
}
