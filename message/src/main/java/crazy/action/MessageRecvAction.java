package crazy.action;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import crazy.dao.MessageRepository;

@RestController
@RequestMapping(value = "/message/recv")
public class MessageRecvAction {
	@Autowired
	private MessageRepository messageRepository;
	
	@ResponseBody
	@RequestMapping(method = RequestMethod.GET)
	public Object getAll(){
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		return messageRepository.findByRecver(username);
	}	
	
	@ResponseBody
	@RequestMapping(value = "{sender}", method = RequestMethod.GET)
	public Object getFrom(@PathVariable("sender") String sender){
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		return messageRepository.findBySenderAndRecver(sender, username);
	}	
}
