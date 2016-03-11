package crazy.action;

import java.util.HashMap;
import java.util.Map;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserDetailAction {
	@RequestMapping(value = "/get_username", method = RequestMethod.GET)
	public String testUsername() {
		System.out.println(SecurityContextHolder.getContext().getAuthentication().getDetails());
		 
		return SecurityContextHolder.getContext().getAuthentication().getName();
	}
	@RequestMapping(value = "/get_userinfo", method = RequestMethod.GET)
	public String testUserinfo() {
		Map<String,String> ret = new HashMap<String,String>();
		Object obj = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		if( obj instanceof UserDetails){
			return ((UserDetails)obj).getUsername();
		}
		return String.valueOf(obj);
		
	}
}
