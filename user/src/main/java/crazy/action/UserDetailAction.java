package crazy.action;

import java.util.HashMap;
import java.util.Map;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserDetailAction {
	@ResponseBody
	@RequestMapping(value = "/username", method = RequestMethod.GET)
	public String testUsername() {
		System.out.println(SecurityContextHolder.getContext().getAuthentication().getDetails());
		 
		return SecurityContextHolder.getContext().getAuthentication().getName();
	}
	
    

	@RequestMapping(value = "/userinfo", method = RequestMethod.GET)
//	@PreAuthorize("hasAnyAuthority('adm')")
	@ResponseBody
	public Object testUserinfo() {
		Map<String,String> ret = new HashMap<String,String>();
		ret.put("username", SecurityContextHolder.getContext().getAuthentication().getName());
		SimpleGrantedAuthority obj = (SimpleGrantedAuthority) SecurityContextHolder
				.getContext().getAuthentication()
				.getAuthorities().iterator().next();
		ret.put("role", obj.getAuthority());
		return ret;
		
		
	}
}
