package crazy.dao;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import crazy.GameApplication;
import crazy.vo.ApproveRecord;
import crazy.vo.Game;
import crazy.vo.Rating;
import crazy.vo.RatingStat;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = GameApplication.class)
@WebAppConfiguration
public class TestApproveRecordRepository {
	@Autowired
	private GameRepository gameRepository;
	
	@Autowired
	private ApproveRecordRepository approveRecordRepository;
    
    @Autowired
    private MongoTemplate mongo;
    
//	@Test
//	public void test(){
//		mongo.updateMulti(new Query(), new Update().set("score", 0).set("num", 0), RatingStat.class);
//	}
}
