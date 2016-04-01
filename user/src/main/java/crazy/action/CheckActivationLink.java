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
public class CheckActivationLink {

    private static final Logger log = LoggerFactory.getLogger(CheckActivationLink.class);

    @Autowired
    private UserRepository userRepository;

    @ResponseBody
    @RequestMapping(value = "/userApi/{username}/checkActivation/{activationCode}", method = RequestMethod.GET, produces = "application/json")
    public Object checkActivation(@PathVariable("username") String username, @PathVariable("activationCode") String activationCode) {
        Map<String, String> ret = new HashMap<>();
        if (activationCode.trim().length() > 0 && SecurityContextHolder.getContext().getAuthentication().getName().equals(username)) {
            User me = userRepository.findByUsername(username);
            if (me.getRandomEmailActivationCode().equals(activationCode)) {
                me.setEmailActivated(true);
                userRepository.save(me);
                ret.put("status", "ok");
                return ret;
            }
        }
        ret.put("status", "failed");
        return ret;
    }
}
