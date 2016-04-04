package crazy.dao;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import crazy.GameApplication;
import crazy.vo.User;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = GameApplication.class)
@WebAppConfiguration
public class TestUserRepository {
	@Autowired
	private UserRepository userRepository;
	

	
	@Test
	public void test(){
		List<String> list = new ArrayList<String>();
		list.add("hard");
		list.add("hard4");
		List<User> users = userRepository.findByUsernameInList(list);
		for(User user : users){
			System.out.println(user.getSociolname()+" "+user.getUsername());
		}
	}
	
}
