package crazy.dao;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import crazy.GameApplication;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = GameApplication.class)
@WebAppConfiguration
public class TestTeamRepository {
	@Autowired
	private TeamRepository teamRepository;

	@Autowired
	private MemberRepository memberRepository;
	@Test
	public void test(){
	
	}
}
