package crazy.action;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import crazy.dao.UserRepository;
import crazy.vo.User;

@RestController
public class UserListAction {
    @Autowired
    private UserRepository respository;

    @RequestMapping(value = "userList", method = RequestMethod.GET)
    public ModelAndView showRegister(ModelAndView model) {
        List<User> userList = respository.findAll();
        model.addObject("userList", userList);
        model.setViewName("userList");
        return model;
    }
}
