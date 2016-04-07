package crazy.action;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import crazy.dao.UserRepository;
import crazy.form.LoginForm;

@RestController
public class LoginAction {
    private static final Logger log = LoggerFactory.getLogger(LoginAction.class);

    @Autowired
    private UserRepository respository;
    
    @Autowired
	protected SessionRegistry sessionRegistry;
    
    @Autowired
    BCryptPasswordEncoder encoder;
/*
    @RequestMapping(value = "/userApi/login", method = RequestMethod.GET)
    public ModelAndView showLogin(ModelAndView model, LoginForm loginForm) {
        log.info("登陆页面请求");

        model.setViewName("login");
        return model;
    }
 */
 
}
