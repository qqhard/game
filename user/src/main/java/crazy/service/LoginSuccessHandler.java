package crazy.service;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.web.util.WebUtils;

public class LoginSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {
	@Autowired
	private CheckService checkService;
    
    private void parseQuery(String username,String query) throws Exception {
    	String[] parts = query.split("&");
    	for(String part : parts){
    		if(part.contains("=")){
    			String left = part.split("=")[0];
    			String right = part.split("=")[1];
    			if("checkEmail".equals(left)){
    				checkService.checkEmail(username,right);
    			}
    		}
    	}
    }
	
	@Override
	public void onAuthenticationSuccess(HttpServletRequest request,
			HttpServletResponse response,Authentication authentication) throws IOException,ServletException {
		UserLoginDetails user = (UserLoginDetails) authentication.getPrincipal();
		
		Cookie cookie = WebUtils.getCookie(request, "username");
		if (cookie == null || !cookie.getValue().equals(user.getUsername())) {
			cookie =new Cookie("username",user.getUsername());
			cookie.setPath("/");
			response.addCookie(cookie);
		}
		
		

		String query = request.getQueryString();
		if(query != null){
			try {
				parseQuery(user.getUsername(),query);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
			
		
		response.setStatus(HttpServletResponse.SC_OK);
		response.getWriter().print("{\"success\": true}");
		response.getWriter().flush();
		
		super.onAuthenticationSuccess(request,response,authentication);
	}
	
}
