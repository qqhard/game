package crazy.action;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import crazy.form.LoginForm;


@RestController
public class TestAction {
	private static final Logger log = LoggerFactory.getLogger(TestAction.class);
	
	@Autowired
	private SessionRegistry sessionRegistry;
	

	
	@RequestMapping(value = "/test", method = RequestMethod.GET)
	public Map<String,Object> test(
			) {
		Map<String,Object> mv = new  HashMap<String,Object>();
		mv.put("test", "test");
		return mv;
	}
	
	@RequestMapping(value = "/test_post", method = RequestMethod.POST)
	public Map<String,Object> testPost(@Valid LoginForm loginForm,BindingResult bindingResult
			) {
		Map<String,Object> mv = new  HashMap<String,Object>();
		if(bindingResult.hasFieldErrors()){
			System.out.println(loginForm.getPassword());
			List<FieldError> l = bindingResult.getFieldErrors();
			for(FieldError e : l){
				
				System.out.println(e.getDefaultMessage());
				System.out.println(e.getField());
				for(String s : e.getCodes()){
					System.out.println(s);
				}
				
			}
			System.out.println(l);
		}
		mv.put("test", "test");
		return mv;
	}
	
}
