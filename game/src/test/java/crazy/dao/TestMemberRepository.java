package crazy.dao;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import crazy.GameApplication;
import crazy.vo.Member;
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = GameApplication.class)
@WebAppConfiguration
public class TestMemberRepository {
	@Autowired
	private MemberRepository memberRepository;
	
	@Test
	public void test(){
		for(Member m : memberRepository.findAll()){
			System.out.println(m.getApplyed());
			if(m.getApplyed() == null){
				m.setApplyed(false);
				memberRepository.save(m);
			}
		}
	}
}
