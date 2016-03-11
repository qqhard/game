package crazy.action;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class IndexAction {
    @RequestMapping(value = "/", method = RequestMethod.GET)
    public ModelAndView showDefaultIndex(ModelAndView model) {
        model.setViewName("index");
        return model;
    }

    @RequestMapping(value = "/index", method = RequestMethod.GET)
    public ModelAndView showIndex(ModelAndView model) {
        model.setViewName("index");
        return model;
    }
}
