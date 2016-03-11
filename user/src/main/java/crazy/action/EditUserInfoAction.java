package crazy.action;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import crazy.dao.UserRepository;
import crazy.form.UserInfoForm;
import crazy.vo.User;

@RestController
public class EditUserInfoAction {
    private static final Logger log = LoggerFactory.getLogger(EditUserInfoAction.class);

    @Autowired
    private UserRepository respository;

    @RequestMapping(value = "/editUserInfo/{username}", method = RequestMethod.GET)
    public ModelAndView showUserInfo(@PathVariable("username") String username, UserInfoForm userInfoForm, ModelAndView model, HttpSession httpSession) {
        log.info(username);
        Object has_login_username = httpSession.getAttribute("login");
        if (has_login_username != null) has_login_username = (String) has_login_username;
        if (has_login_username == null || !has_login_username.equals(username)) {
            model.setViewName("error");
            return model;
        }
        userInfoForm.setUser(respository.findByUsername(username));
        model.setViewName("userInfo");
        return model;
    }

    @RequestMapping(value = "/editUserInfo/{username}", method = RequestMethod.POST)
    public ModelAndView doUserInfo(@PathVariable("username") String username, @Valid UserInfoForm userInfoForm, BindingResult bindingResult, ModelAndView model) {
        log.info(username);
        model.setViewName("userInfo");
        if (bindingResult.hasErrors()) {
            log.info("表单错误！");
            model.setViewName("userInfo");
            return model;
        }

        User userVo = respository.findByUsername(username);
        userVo.setEmail(userInfoForm.getEmail());
        userVo.setPhone(userInfoForm.getPhone());
        respository.save(userVo);

        try {
            model.setViewName("redirect:/editUserInfo/" + URLEncoder.encode(username, "UTF-8"));
        } catch (UnsupportedEncodingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        return model;
    }
}
