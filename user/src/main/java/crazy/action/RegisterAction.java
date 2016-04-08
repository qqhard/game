package crazy.action;

import java.util.HashMap;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import crazy.dao.UserRepository;
import crazy.form.RegisterForm;
import crazy.vo.User;

@RestController
@RequestMapping(value = "/userApi/register")
public class RegisterAction {

    @Autowired
    private UserRepository respository;

    @Autowired
    private PasswordEncoder encoder;

    @RequestMapping(method = RequestMethod.POST)
    public Object post(@Valid RegisterForm registerForm, BindingResult bindlingResult) {
        HashMap<String, Object> ret = new HashMap<>();

        if (bindlingResult.hasFieldErrors()) {
            List<FieldError> errors = bindlingResult.getFieldErrors();
            ret.put("status", "fail");
            for (FieldError error : errors) {
                ret.put(error.getField(), error.getCode());
            }
            return ret;
        }

        String lock = ("user_" + registerForm.getUsername().substring(0, 4)).intern();

        synchronized (lock) {
            User user = respository.findByUsername(registerForm.getUsername());
            if (user != null) {
                ret.put("data", "用户名已经被占用");
                ret.put("status", "fail");
            } else {
                user = registerForm.update(new User());
                user.setAuthentications("USER");
                user.setPassword(encoder.encode(user.getPassword()));
                respository.insert(user);
                ret.put("status", "ok");
            }
        }

        return ret;
    }
}
