package crazy.action;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.session.SessionInformation;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import crazy.service.UserLoginDetails;

@RestController
public class TestAction {
	private static final Logger log = LoggerFactory.getLogger(TestAction.class);
	
	@Autowired
	private SessionRegistry sessionRegistry;

	@RequestMapping(value = "/userApi/failure", method = RequestMethod.GET)
	public String testT() {
		return "test";
	}
	
	@RequestMapping(value = "/tests", method = RequestMethod.GET)
	public String test() {
		int s = sessionRegistry.getAllPrincipals().size();

		log.info("####################" + s);
		List<Object> list = sessionRegistry.getAllPrincipals();
		for (Object o : list) {
			UserLoginDetails p = (UserLoginDetails) o;
			log.info(p.getUsername());
		}
		return "test";
	}
	
	@RequestMapping(value = "/test2", method = RequestMethod.GET)
	public String test2() {
		
		
		 List<Object> userList=sessionRegistry.getAllPrincipals();  
		 
		 for(int i=0; i<userList.size(); i++){    
			 UserLoginDetails userTemp=(UserLoginDetails) userList.get(i);        
		                
	            List<SessionInformation> sessionInformationList = sessionRegistry.getAllSessions(userTemp, false);   
	            log.info("session数量"+sessionInformationList.size());
	            if (sessionInformationList!=null) {     
	                for (int j=0; j<sessionInformationList.size(); j++) {    
	                    sessionInformationList.get(j).expireNow();  
	                    log.info("SessionId"+sessionInformationList.get(j).getSessionId());
	                    sessionRegistry.removeSessionInformation(sessionInformationList.get(j).getSessionId());    
  
	            
	                }    
	            }    
		         
		    }    
		
	
		return "test2";
	}
}
