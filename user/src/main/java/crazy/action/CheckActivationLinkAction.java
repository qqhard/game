package crazy.action;

import crazy.dao.UserRepository;
import crazy.vo.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by g on 4/1/16.
 */
@RestController
public class CheckActivationLinkAction {

    private static final Logger log = LoggerFactory.getLogger(CheckActivationLinkAction.class);

    @Autowired
    private UserRepository userRepository;

    @ResponseBody
    @RequestMapping(value = "/userApi/{username}/checkActivation/{activationCode}", method = RequestMethod.GET, produces = "application/json")
    public Object checkActivation(@PathVariable("username") String username, @PathVariable("activationCode") String activationCode) {
        Map<String, String> ret = new HashMap<>();
        if (activationCode.trim().length() > 0 && SecurityContextHolder.getContext().getAuthentication().getName().equals(username)) {
            User me = userRepository.findByUsername(username);
            if (me.getEmailActivated()) {
                ret.put("status", "ok");
                ret.put("message", "已通过验证");
                return ret;
            }
            if (me.getRandomEmailActivationCode().equals(activationCode)) {
                me.setEmailActivated(true);
                userRepository.save(me);
                ret.put("status", "ok");
                ret.put("message", "您的邮箱已通过验证");
                return ret;
            }
        }
        ret.put("status", "fail");
        ret.put("message", "验证失败");
        return ret;
    }
    
    @ResponseBody
    @RequestMapping(value = "/userApi/emailActivation", method = RequestMethod.GET)
    public Object getIsEmailActivation(){
    	String username = SecurityContextHolder.getContext().getAuthentication().getName();
    	User user = userRepository.findByUsername(username);
    	return user.getEmailActivated();
    }
    
}
