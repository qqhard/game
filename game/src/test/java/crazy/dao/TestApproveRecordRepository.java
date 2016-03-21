package crazy.dao;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import crazy.GameApplication;
import crazy.vo.ApproveRecord;
import crazy.vo.Game;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = GameApplication.class)
@WebAppConfiguration
public class TestApproveRecordRepository {
	@Autowired
	private GameRepository gameRepository;
	
	@Autowired
	private ApproveRecordRepository approveRecordRepository;
	
	@Test
	public void test(){
		
	}
}
