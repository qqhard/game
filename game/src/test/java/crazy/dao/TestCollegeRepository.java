package crazy.dao;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.data.domain.Sort;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import crazy.GameApplication;
import crazy.vo.College;
import crazy.vo.Institute;
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = GameApplication.class)
@WebAppConfiguration
public class TestCollegeRepository {
	@Autowired
	private ProvinceRepository provinceRepository;
	
	@Autowired
	private CollegeRepository collegeRepository;

	@Autowired
	private InstituteRepository instituteRepository;
	
	@Test
	public void testFindByProvinceid(){
		Sort sort = new Sort(Sort.Direction.DESC, "collegeid");
		List<College> list = collegeRepository.findByProvinceid(3, sort);
		list.stream().limit(10)
					.map(val -> val.getProvinceid()+" "+val.getCollegeid())
					.forEach(val->System.out.println(val));
		list.stream().limit(2)
					.map(val -> val.getProvincename()+ " " +val.getCollegename())
					.forEach(val->System.out.println(val));
					
	}
	@Test
	public void testFindById(){
		College college = collegeRepository.findById("56d2cbcabc87555b88fa5cda");
		System.out.println(college.getCollegename());
		System.out.println(college.getProvincename());
	}
	@Test
	public void testFindByCollegeid(){
		
	}
}
