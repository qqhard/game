package crazy.action;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import crazy.dao.UserRepository;
import crazy.form.LoginForm;
import crazy.vo.User;

@RestController
public class LoginAction {
    private static final Logger log = LoggerFactory.getLogger(LoginAction.class);

    @Autowired
    private UserRepository respository;
    
    @Autowired
	protected SessionRegistry sessionRegistry;
    
    @Autowired
    BCryptPasswordEncoder encoder;

    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public ModelAndView showLogin(ModelAndView model, LoginForm loginForm) {
        log.info("登陆页面请求");

        model.setViewName("login");
        return model;
    }


//    @RequestMapping(value = "/logout", method = RequestMethod.GET)
//    public ModelAndView doLogout(ModelAndView model, HttpSession httpSession) {
//        log.info("登陆页面请求");
//        httpSession.removeAttribute("login");
//        model.setViewName("redirect:/");
//        return model;
//    }

    @RequestMapping(value = "/login2", method = RequestMethod.POST)
    public ModelAndView doLogin(@Valid LoginForm loginForm, BindingResult bindlingResult, ModelAndView model, HttpSession httpSession) {
        log.info("post请求到达登陆函数");
        System.out.println("################哈哈哈哈哈############");
        if (bindlingResult.hasErrors()) {
            model.setViewName("login");
            return model;
        }
        User user = respository.findByUsername(loginForm.getUsername());
        if (user == null || !encoder.matches(loginForm.getPassword(), user.getPassword())) {
            bindlingResult.rejectValue("password", "用户名或密码错误", "用户名或密码错误");
            model.setViewName("login");
            return model;
        }

        httpSession.setAttribute("login", user.getUsername());

        try {
            model.setViewName("redirect:/editUserInfo/" + URLEncoder.encode(user.getUsername(), "UTF-8"));
        } catch (UnsupportedEncodingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return model;

    }
}
