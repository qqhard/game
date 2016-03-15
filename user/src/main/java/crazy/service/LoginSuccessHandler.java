package crazy.service;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;

public class LoginSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {
	@Override
	public void onAuthenticationSuccess(HttpServletRequest request,
			HttpServletResponse response,Authentication authentication) throws IOException,ServletException {
		UserLoginDetails user = (UserLoginDetails) authentication.getPrincipal();
		HttpSession httpSession = request.getSession();
		httpSession.setAttribute("login", user.getUsername());
		super.onAuthenticationSuccess(request,response,authentication);
	}
		
}
