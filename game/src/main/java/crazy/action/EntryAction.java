package crazy.action;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import crazy.dao.EntryRepository;
import crazy.form.EntryDelForm;
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
		Entry entry = new Entry();
		entry =  entryForm.update(entry);
		ret.put("status", "ok");
		try{
			entryRepository.insert(entry);
		}catch(DuplicateKeyException e){
			ret.put("status", "fail");
			ret.put("data", "重复报名");
		}
		return ret;
	}
	
	@ResponseBody
	@RequestMapping(value="{gamename}",method = RequestMethod.DELETE)
	public Object delete(@Valid EntryDelForm entryDelForm,BindingResult bindingResult){
		
		return bindingResult;
	}
}
