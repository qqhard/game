package crazy.action;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import crazy.dao.UserRepository;
import crazy.form.RegisterForm;
import crazy.utils.SendNotificationMail;
import crazy.vo.User;

@RestController
@RequestMapping(value = "/register")
public class RegisterAction {
    private static final Logger log = LoggerFactory.getLogger(RegisterAction.class);

    @Autowired
    private SendNotificationMail mail;

    @Autowired
    private UserRepository respository;
    
    @Autowired
    private PasswordEncoder encoder;

    @RequestMapping(method = RequestMethod.GET)
    public Model showRegister(Model model, RegisterForm registerForm) {
        return model;
    }

    @RequestMapping(method = RequestMethod.POST)
    public ModelAndView doRegister(@Valid RegisterForm registerForm, BindingResult bindlingResult, ModelAndView model, HttpSession httpSession) {
        log.info("post请求到达用户注册函数");

        if (!registerForm.getPassword().equals(registerForm.getRePassword())) {
            bindlingResult.rejectValue("rePassword", "两次密码不一致", "两次密码不一致");
            model.setViewName("register");
            return model;
        }

        if (bindlingResult.hasErrors()) {
            log.info("表单错误");
            model.setViewName("register");
            return model;
        }

        User registerInDB = respository.findByUsername(registerForm.getUsername());

        if (registerInDB != null) {
            bindlingResult.rejectValue("username", "用户名被占用", "用户名被占用");
            model.setViewName("register");
            return model;
        }
        
        log.info(registerForm.getUsername()+"表单验证成功");
        
        User newUser = registerForm.getUser();
        newUser.setPassword(encoder.encode(newUser.getPassword()));
        newUser.setAuthentications("USER");
        respository.save(newUser);
        
        httpSession.setAttribute("login", registerForm.getUsername());

        model.setViewName("redirect:/");

        return model;
    }
}
