package crazy.action;

import java.util.HashMap;
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
import crazy.dao.MessageRepository;
import crazy.form.MessageForm;
import crazy.vo.Message;

@RestController
@RequestMapping(value = "/message")
public class MessageSendAction {

	@Autowired
	private MessageRepository messageRepository;
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

}
