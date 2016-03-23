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
//		Member m = new Member();
//		m.setTeamid("56f201bd7c9ac26de900d696");
//		m.setAccepted(false);
//		m.setApplyed(false);
//		m.setUsername("hard4");
//		memberRepository.insert(m);
	}
}
