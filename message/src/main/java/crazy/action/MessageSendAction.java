package crazy.action;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import crazy.dao.MessageRecordRepository;
import crazy.form.EmailForm;
import crazy.service.MessageSend;
import crazy.vo.MessageRecord;

@RestController
@RequestMapping(value = "/message")
public class MessageSendAction {
	@Autowired
	private MessageRecordRepository messageRecordRepository;
	
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
	
}
