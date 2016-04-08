package crazy.action;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import crazy.dao.UserRepository;
import crazy.form.EmailForm;
import crazy.form.UserInfoForm;
import crazy.vo.User;

@RestController
public class UserInfoAction {


    @Autowired
    private UserRepository respository;

    @ResponseBody
    @RequestMapping(value = "/userApi/userinfo/{username}", method = RequestMethod.GET)
    public Object get(@PathVariable("username") String username) {
        if (!username.equals(SecurityContextHolder.getContext().getAuthentication().getName())) {
            return "fail";
        }

        User user = respository.findByUsername(username);
        Map<String, Object> userMap = new HashMap<>();
        userMap.put("authentications", user.getAuthentications());
        userMap.put("collegeid", user.getCollegeid());
        userMap.put("email", user.getEmail());
        userMap.put("instituteid", user.getInstituteid());
        userMap.put("locked", user.isLocked());
        userMap.put("phone", user.getPhone());
        userMap.put("provinceid", user.getProvinceid());
        userMap.put("sociolname", user.getSociolname());
        userMap.put("studentid", user.getStudentid());
        userMap.put("username", user.getUsername());
        userMap.put("isEmailActivated", user.getEmailActivated());
        return userMap;

    }


    @ResponseBody
    @RequestMapping(value = "/userApi/userinfo/{username}", method = RequestMethod.PUT)
    @PreAuthorize("authentication.name == username")
    public Object put(@PathVariable("username") String username, UserInfoForm userInfoForm, BindingResult bindingResult) {
        Map<String, String> ret = new HashMap<String, String>();
        if (!username.equals(SecurityContextHolder.getContext().getAuthentication().getName())) {
            ret.put("status", "fail");
            return ret;
        }

        if (bindingResult.hasFieldErrors()) {
            List<FieldError> errors = bindingResult.getFieldErrors();
            ret.put("status", "fail");
            for (FieldError error : errors) {
                ret.put(error.getField(), error.getCode());
            }
            return ret;
        }

        User user = respository.findByUsername(username);
        user = userInfoForm.update(user);
        respository.save(user);
        ret.put("status", "ok");
        return ret;

    }
    
    @ResponseBody
    @RequestMapping(value = "/userApi/userinfo/email", method = RequestMethod.PUT)
    public Object putEmail(@Valid EmailForm emailForm, BindingResult bindingResult) {
        Map<String, String> ret = new HashMap<String, String>();
      
        if (bindingResult.hasFieldErrors()) {
            List<FieldError> errors = bindingResult.getFieldErrors();
            ret.put("status", "fail");
            for (FieldError error : errors) {
                ret.put(error.getField(), error.getCode());
            }
            return ret;
        }
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        User user = respository.findByUsername(username);
        user.setEmail(emailForm.getEmail());
        respository.save(user);
        
        ret.put("status", "ok");
        return ret;

    }
    
    


}
