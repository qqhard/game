package crazy;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class HelloMessageService{
	@PreAuthorize("autheticated")
	public String getMessage(){
		Authentication authentication = (Authentication) SecurityContextHolder.getContext();
		return "hello"+authentication;
	}
}
