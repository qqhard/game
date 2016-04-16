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
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by g on 4/1/16.
 */
@RestController
public class SendActivationEmailAction {

    private static final Logger log = LoggerFactory.getLogger(SendActivationEmailAction.class);

    @Autowired
    private UserRepository userRepository;

    @ResponseBody
    @RequestMapping(value = "/userApi/emailActivation", method = RequestMethod.POST, produces = "application/json")
    public Object emailActivation(HttpServletRequest request) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
    	Map<String, String> ret = new HashMap<>();
        if (!username.equals(SecurityContextHolder.getContext().getAuthentication().getName())) {
            ret.put("status", "fail");
            ret.put("message", "没有权限");
            return ret;
        }
        User me = userRepository.findByUsername(username);
        if (me.getEmailActivated()) {
            ret.put("status", "fail");
            ret.put("message", "您的邮箱已被验证");
            return ret;
        }

        // check whether it has email
        if (me.getEmail() == null || !(me.getEmail().contains("@") && me.getEmail().contains("."))) {
            ret.put("status", "fail");
            ret.put("message", "请先填写您的邮箱地址");
            return ret;
        }

        // check datetime
        long nowTimestamp = new Date().getTime();
        long timeDelta = nowTimestamp - me.getEmailSentTimestamp();
        if (timeDelta / 1000 / 60 < 1) {
            ret.put("status", "fail");
            ret.put("message", "1分钟内只能发送一封验证邮件");
            return ret;
        }

        me.setRandomEmailActivationCode();
        String activationCode = me.getRandomEmailActivationCode();
        userRepository.save(me);
        String url = "http://valseek.com/checkEmailActivationCode-" + username + "-" + activationCode + ".html";
        EmailQueue.push(me.getEmail(), "来自Game Factory的验证邮件", "你好，" + me.getUsername() + "，您的邮箱验证地址是： " + url);
        me.setEmailSentTimestamp(nowTimestamp);
        userRepository.save(me);
        ret.put("status", "ok");
        ret.put("message", "验证邮件已发送到您的邮箱: " + me.getEmail());
        return ret;
    }
}
