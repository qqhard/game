package crazy.action;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import crazy.dao.NoticeRepository;
import crazy.vo.NoticeVo;

@RestController
public class NoticeAction {
    @Autowired
    private NoticeRepository respository;

    @RequestMapping(value = "notice", method = RequestMethod.GET)
    public ModelAndView showNotice(ModelAndView model) {

        NoticeVo noticeVo = respository.findOne(new ObjectId("56758f0ec8309913024a1082"));
        model.addObject("notice", noticeVo.getNotice());
        model.setViewName("notice");
        return model;
    }
}
