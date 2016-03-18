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
import crazy.vo.UserDefineForm;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = GameApplication.class)
@WebAppConfiguration
public class TestGameRepository {
	@Autowired
	private GameRepository gameRepository;
	@Test
	public void test(){
		Game g =gameRepository.findByGamename("acm12");
		g.setGametitle("acm校赛");
		gameRepository.save(g);
	}
	@Test
	public void testInsert(){
		
		Game game = new Game();
		game.setGamename("acm14");
		game.setOwner("hard");
		game.setStep(4);
		game.setBriefinfo("程序竞赛");
		game.setEndTime(1000);
		game.setGameplace("实验室");
		game.setGametime("六点到五点");
		game.setStartTime(10);
		List<UserDefineForm> list = new ArrayList<UserDefineForm>();
		list.add(new UserDefineForm("phone",""));
		game.setFormList(list);
		gameRepository.insert(game);
		
		
		
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
			
			for(UserDefineForm form: game.getFormList()){
				System.out.println(form.getName());
			}
		}
	}
	@Test
	public void testFindSubmited(){
		GamePageable pageable = new GamePageable();
		List<Order> orders = new ArrayList<Order>();  
		orders.add(new Order(Direction.ASC, "gamename"));  
		Page<Game> page =  gameRepository.findByStep(pageable, 2);
		for(Game game: page.getContent()){
			System.out.println(game.getGamename());
			
			for(UserDefineForm form: game.getFormList()){
				System.out.println(form.getName());
			}
		}
	}
	@Test
	public void testFindAccepted(){
		GamePageable pageable = new GamePageable();
		List<Order> orders = new ArrayList<Order>();  
		orders.add(new Order(Direction.ASC, "gamename"));  
		Page<Game> page = gameRepository.findByStep(pageable, 2);
		for(Game game: page.getContent()){
			System.out.println(game.getGamename());
			
			for(UserDefineForm form: game.getFormList()){
				System.out.println(form.getName());
			}
		}
	}
}
