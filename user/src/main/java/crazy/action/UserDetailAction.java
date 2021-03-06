package crazy.action;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import crazy.dao.UserRepository;
import crazy.vo.User;

@RestController
public class UserDetailAction {

	@Autowired
	private UserRepository respository;

	@ResponseBody
	@RequestMapping(value = "/userApi/username", method = RequestMethod.GET)
	public Object testUsername() {
		
		SimpleGrantedAuthority obj = (SimpleGrantedAuthority) SecurityContextHolder.getContext().getAuthentication()
				.getAuthorities().iterator().next();
		if("ROLE_ANONYMOUS".equals(obj.getAuthority())){
			return new ResponseEntity<String>(HttpStatus.FORBIDDEN);
		}
		return SecurityContextHolder.getContext().getAuthentication().getName();
	}


	@RequestMapping(value = "/userApi/userrole", method = RequestMethod.GET)
//	@PreAuthorize("hasAnyAuthority('adm')")
	@ResponseBody
	public Object testUserinfo() {
		Map<String, String> ret = new HashMap<String, String>();
		ret.put("username", SecurityContextHolder.getContext().getAuthentication().getName());
		SimpleGrantedAuthority obj = (SimpleGrantedAuthority) SecurityContextHolder.getContext().getAuthentication()
				.getAuthorities().iterator().next();
		ret.put("role", obj.getAuthority());
		return ret;

	}

	@RequestMapping(value = "/userApi/publicinfo/{username}", method = RequestMethod.GET)
	@ResponseBody
	public Object getUserPublicInfo(@PathVariable("username") String username) {
		
		User user = respository.findByUsername(username);
		if(user == null) return null;
		User ret = new User();
		ret.setUsername(username);
		ret.setSociolname(user.getSociolname());
		ret.setStudentid(user.getStudentid());
		ret.setProvinceid(user.getProvinceid());
		ret.setCollegeid(user.getCollegeid());
		ret.setInstituteid(user.getInstituteid());
		return ret;

	}
}
