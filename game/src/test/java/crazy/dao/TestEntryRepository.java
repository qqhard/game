package crazy.dao;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import crazy.GameApplication;
import crazy.vo.Entry;
import crazy.vo.UserDefineForm;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = GameApplication.class)
@WebAppConfiguration
public class TestEntryRepository {
	@Autowired
	private EntryRepository entryRepository;
	@Test
	public void testFindByUsername(){
		
		List<Entry> list = entryRepository.findByUsername("hard");
		for(Entry e : list){
			System.out.println(e.getUsername());
			for(UserDefineForm f : e.getFormList()){
				System.out.println(f.getName()+" "+f.getValue());
			}
		}
	}
	
	@Test
	public void testFindAll(){
		
		List<Entry> list = entryRepository.findAll();
		for(Entry e : list){
			System.out.println(e.getDeled());
		}
	}
}
