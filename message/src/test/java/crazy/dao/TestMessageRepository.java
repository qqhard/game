package crazy.dao;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import crazy.GameApplication;
import crazy.vo.Message;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = GameApplication.class)
@WebAppConfiguration
public class TestMessageRepository {
	@Autowired
	private MessageRepository messageDao;
	
	@Test
	public void test() {
		int a = messageDao.countByRecverAndReadTime("lackofdream", 0);
		System.out.println(a);
	}
	
	@Test
	public void testFindAll() {
		List<Message> list = messageDao.findAll();
		for(Message m : list){
			System.out.println(m.getRecver() + " " +m.getReadTime());
		}
	}
}
