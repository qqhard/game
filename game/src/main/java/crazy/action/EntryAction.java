package crazy.action;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import crazy.dao.EntryRepository;
import crazy.form.EntryForm;
import crazy.vo.Entry;

@RestController
@RequestMapping(value = "/game/entry")
public class EntryAction {
	@Autowired
	private EntryRepository entryRepository;
	
	@ResponseBody
	@RequestMapping(method = RequestMethod.POST)
	public Object post(@Valid EntryForm entryForm,BindingResult bindingResult,HttpSession session){
		Map<String,String> ret = new HashMap<String,String>();
		if(bindingResult.hasFieldErrors()){
			List<FieldError> errors = bindingResult.getFieldErrors();
			ret.put("status", "fail");
			for(FieldError error : errors){
				ret.put(error.getField(), error.getCode());
			}
			return ret;
		}
		
		
		Entry entry = entryRepository.findByUsernameAndGamename(entryForm.getUsername(), entryForm.getGamename());
		if(entry == null){
			entry = new Entry();
			entry =  entryForm.update(entry);
			entryRepository.insert(entry);
			ret.put("status", "ok");
			return ret;
		}
		
		if(entry.getDeled()){
			entry =  entryForm.update(entry);
			entryRepository.save(entry);
			ret.put("status", "ok");
			return ret;
		}
		
		ret.put("status", "fail");
		ret.put("data", "重复报名");
		return ret;
	}
	

}
