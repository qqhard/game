package crazy.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.BasicQuery;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import crazy.dao.UserRepository;
import crazy.vo.User;

@Service
public class CheckService {
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private MongoTemplate mongo;

	public void test() {
		List<User> list = userRepository.findAll();
		list.forEach(e->System.out.println(e.getEmail()));
	}
	
	public void checkEmail(String username,String code){
		if(username == null || code == null)return ;
		Query query = new BasicQuery(String.format("{username:'%s'}", username));
		User me = mongo.findOne(query, User.class);
		if(me == null) return ;
		if(me.getRandomEmailActivationCode() == null)return ;
		if (me.getRandomEmailActivationCode().equals(code)) {
            Update update = new Update().set("emailActivated", true);
            mongo.updateFirst(query, update, User.class);
        }
	}
}
