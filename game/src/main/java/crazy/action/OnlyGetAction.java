package crazy.action;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
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
public class OnlyGetAction {
	@Autowired
	private ProvinceRepository provinceRepository;
	
	@Autowired
	private CollegeRepository collegeRepository;
	
	@Autowired
	private InstituteRepository instituteRepository;
	
	@ResponseBody
	@RequestMapping(value="/provinces", method = RequestMethod.GET)
	public List<Province> getProvinces(){
		Sort sorter = new Sort(Sort.Direction.ASC, "id");
		return provinceRepository.findAll(sorter);
	}
	
	@ResponseBody
	@RequestMapping(value="/colleges/{provinceid}", method = RequestMethod.GET)
	public List<College> getColleges(@PathVariable("provinceid") int provinceid){
		Sort sorter = new Sort(Sort.Direction.ASC, "collegeid");
		return collegeRepository.findByProvinceid(provinceid,sorter);
	}
	
	@ResponseBody
	@RequestMapping(value="/institutes/{collegeid}", method = RequestMethod.GET)
	public List<Institute> getInstitutes(@PathVariable("collegeid") int collegeid){
		Sort sorter = new Sort(Sort.Direction.ASC, "collegeid");
		return instituteRepository.findByCollegeid(collegeid,sorter);
	}
}
