package crazy.dao;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.domain.Sort.Order;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import crazy.GameApplication;
import crazy.vo.Game;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = GameApplication.class)
@WebAppConfiguration
public class TestGameRepository {
	@Autowired
	private GameRepository gameRepository;
	@Test
	public void test(){
		for(int i=0;i<100;i++){
			Game game = new Game();
			game.setGamename("acm"+i);
			game.setOwner("hard");
			game.setAccepted(true);
			game.setBriefinfo("程序竞赛");
			game.setEndTime(1000);
			game.setGameplace("实验室");
			game.setGametime("六点到五点");
			game.setStartTime(10);
			//gameRepository.insert(game);
		}
		
		
		List<Game> list = gameRepository.findAll();
		for(Game g : list){
			System.out.println(g.getGamename());
		}
		
	}
	@Test
	public void testFindAll(){
		GamePageable pageable = new GamePageable();
		List<Order> orders = new ArrayList<Order>();  
		orders.add(new Order(Direction.ASC, "gamename"));  
		pageable.setSort(new Sort(orders));  
		Page<Game> page = gameRepository.findAll(pageable);
		for(Game game: page.getContent()){
			System.out.println(game.getGamename());
		}
	}
	
}
