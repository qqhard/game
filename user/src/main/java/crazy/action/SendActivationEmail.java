package crazy.action;

import crazy.dao.UserRepository;
import crazy.service.EmailQueue;
import crazy.vo.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by g on 4/1/16.
 */
@RestController
public class SendActivationEmail {

    private static final Logger log = LoggerFactory.getLogger(SendActivationEmail.class);

    @Autowired
    private UserRepository userRepository;

    @ResponseBody
    @RequestMapping(value = "/userApi/{username}/emailActivation", method = RequestMethod.GET, produces = "application/json")
    public Object emailActivation(@PathVariable("username") String username, HttpServletRequest request) {
        Map<String, String> ret = new HashMap<>();
        if (!username.equals(SecurityContextHolder.getContext().getAuthentication().getName())) {
            ret.put("status", "fail");
            return ret;
        }
        User me = userRepository.findByUsername(username);
        if (me.getEmailActivated()) {
            ret.put("status", "fail");
            return ret;
        }
        log.debug(me.getRandomEmailActivationCode());
        me.setRandomEmailActivationCode();
        String activationCode = me.getRandomEmailActivationCode();
        userRepository.save(me);
        String url = "http://"+request.getLocalName()+":"+request.getLocalPort()+"/userApi/"+username+"/checkActivation/"+activationCode;
        EmailQueue.push(me.getEmail(), "test email activation", url);
        return ret;
    }
}
