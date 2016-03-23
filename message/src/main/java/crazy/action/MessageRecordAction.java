package crazy.action;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import crazy.dao.MessageRecordRepository;

@RestController
@RequestMapping(value = "/message/record")
public class MessageRecordAction {
	@Autowired
	private MessageRecordRepository messageRecordRepository;
	
	@ResponseBody
	@RequestMapping(value = "{gamename}",method = RequestMethod.GET)
	public Object get(@PathVariable("gamename") String gamename){
		
		return messageRecordRepository.findByGamenameOrderBySendtimeDesc(gamename);
	}	
}
