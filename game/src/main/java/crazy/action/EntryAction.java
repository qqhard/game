package crazy.action;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import crazy.form.EntryForm;

@RestController
@RequestMapping(value = "/entry")
public class EntryAction {
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
		return ret;
	}
}
