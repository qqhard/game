package crazy.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import crazy.dao.ApproveRecordRepository;
import crazy.dao.GamePageable;
import crazy.dao.GameRepository;
import crazy.vo.ApproveRecord;
import crazy.vo.Game;

@RestController
public class GamechecksAction {
	@Autowired
	private GameRepository gameRepository;
	
	@Autowired
	private ApproveRecordRepository approveRecordRepository;
	

	@ResponseBody
	@RequestMapping(value = "/gamechecks/{approver}", method = RequestMethod.GET)
	public Object getMyGamechecks(@PathVariable("approver") String approver){
		if(!approver.equals(SecurityContextHolder.getContext().getAuthentication().getName())){
    		return new ArrayList<Game>();
    	}
		List<ApproveRecord> list = approveRecordRepository.findByApprover(approver);
		return list;
	}
	
	@ResponseBody
	@RequestMapping(value = "/gamechecks", method = RequestMethod.GET)
	public List<Game> getGamechecks(){
		GamePageable page = new GamePageable();
		return gameRepository.findByStep(page, 1).getContent();
	}
}
