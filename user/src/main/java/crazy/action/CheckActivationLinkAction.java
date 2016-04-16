package crazy.action;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import crazy.dao.UserRepository;
import crazy.vo.User;

/**
 * Created by g on 4/1/16.
 */
@RestController
public class CheckActivationLinkAction {

    private static final Logger log = LoggerFactory.getLogger(CheckActivationLinkAction.class);

    @Autowired
    private UserRepository userRepository;

    @ResponseBody
    @RequestMapping(value = "/userApi/checkActivation/{activationCode}", method = RequestMethod.GET, produces = "application/json")
    public Object checkActivation(@PathVariable("activationCode") String activationCode) {
    	String username = SecurityContextHolder.getContext().getAuthentication().getName();
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
