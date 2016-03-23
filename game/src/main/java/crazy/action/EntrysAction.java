package crazy.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import crazy.dao.EntryRepository;
import crazy.dao.GameRepository;
import crazy.form.EntryDelForm;
import crazy.vo.Entry;
import crazy.vo.Game;

@RestController
public class EntrysAction {
	@Autowired
	private EntryRepository entryRepository;
	
	@Autowired
	private GameRepository gameRepository;
	
	private static final Map<String,Integer> STATE_TO_STEP = new HashMap<String,Integer>(){
		private static final long serialVersionUID = -900316470475740462L;
	{
		put("submited",1);
		put("accepted",2);
		put("stated",3);
		put("ended",4);
	}};
	
	@ResponseBody
	@RequestMapping(value = "/game/userentrys/{participant}", method = RequestMethod.GET)
	public List<Game> getUserEntrys(@PathVariable("participant") String participant, 
			@RequestParam(value = "pagenum",required=false) Integer pagenum,
			@RequestParam("state") String state){
		List<Entry> entrys = entryRepository.findByUsername(participant);
		List<Game> games = new ArrayList<Game>();
		
		Integer step = STATE_TO_STEP.get(state);
		if(step == null) return games;
		
		for(Entry entry : entrys){
			Game g = gameRepository.findByGamenameAndStep(entry.getGamename(), step);
			if(g != null) games.add(g);
		}
		return games;
	}
	
	@ResponseBody
	@RequestMapping(value = "/game/gameentrys/{gamename}", method = RequestMethod.GET)
	public List<Entry> getGameEntrys(@PathVariable("gamename") String gamename){
		List<Entry> entrys = entryRepository.findByGamenameAndDeled(gamename,false);
		return entrys;
	}
	
	
	@ResponseBody
	@RequestMapping(value = "/game/entrys", method = RequestMethod.POST)
	public Object delete(@Valid EntryDelForm entryDelForm,BindingResult bindingResult){
		List<String> usernames = entryDelForm.getUsernames();
		List<Entry> deledEntrys = new ArrayList<Entry>();
		for(String username: usernames){
			Entry entry = entryRepository.findByUsernameAndGamename(username, entryDelForm.getGamename());
			entry.setDeled(true);
			deledEntrys.add(entry);
		}
		entryRepository.save(deledEntrys);
		return "ok";
	}
}
