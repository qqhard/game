package crazy.action;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import crazy.dao.CollegeRepository;
import crazy.dao.InstituteRepository;
import crazy.dao.ProvinceRepository;
import crazy.vo.College;
import crazy.vo.Institute;
import crazy.vo.Province;

@RestController
@RequestMapping(value = "/belong")
public class BelongAction {
	@Autowired
	private ProvinceRepository provinceRepository;
	
	@Autowired
	private CollegeRepository collegeRepository;

	@Autowired
	private InstituteRepository instituteRepository;
	
	@ResponseBody
	@RequestMapping(value = "{provinceid}/{collegeid}/{instituteid}", method = RequestMethod.GET)
	public Object getName(@PathVariable("provinceid") int provinceid,
			@PathVariable("collegeid") int collegeid,
			@PathVariable("instituteid") int instituteid){
		HashMap<String,Object> ret = new HashMap<>();
		if(instituteid != 0){
			Institute institute = instituteRepository.findByInstituteid(instituteid);
			ret.put("provincename", institute.getProvincename());
			ret.put("collegename", institute.getCollegename());
			ret.put("institutename", institute.getInstitutename());
		}else if(collegeid != 0){
			College college = collegeRepository.findByCollegeid(collegeid);
			ret.put("provincename", college.getProvincename());
			ret.put("collegename", college.getCollegename());
			ret.put("institutename", "");
		}else if(provinceid != 0){
			Province province = provinceRepository.findByProvinceid(provinceid);
			ret.put("provincename", province.getName());
			ret.put("collegename", "");
			ret.put("institutename", "");
		}
		return ret;
	}
}
