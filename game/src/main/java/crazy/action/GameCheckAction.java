package crazy.action;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import crazy.dao.ApproveRecordRepository;
import crazy.dao.GameRepository;
import crazy.form.GameCheckForm;
import crazy.vo.ApproveRecord;
import crazy.vo.Game;

@RestController
@RequestMapping(value = "/gamecheck")
public class GameCheckAction {
	@Autowired
	private GameRepository gameRepository;
	@Autowired
	private ApproveRecordRepository approveRecordRepository;
	
	@ResponseBody
	@RequestMapping(value = "{gamename}", method = RequestMethod.GET)
	public Object get(@PathVariable("gamename") String gamename, HttpSession session){
		String approver = SecurityContextHolder.getContext().getAuthentication().getName();
		ApproveRecord record = approveRecordRepository.findByGamename(gamename);
		System.out.println(record);
		return record;
	}
	
	@ResponseBody
	@RequestMapping(value = "game/{gamename}", method = RequestMethod.GET)
	public Object getFailed(@PathVariable("gamename") String gamename){
		
		ApproveRecord record = approveRecordRepository.findByGamename(gamename);
		if(record == null) return null;
		return record.getGame();
	}
	
	@ResponseBody
	@RequestMapping(value = "{gamename}", method = RequestMethod.POST)
	public Object post(@PathVariable("gamename") String gamename,
			@Valid GameCheckForm gameCheckForm,BindingResult bindingResult,HttpSession session){
		Game game = gameRepository.findByGamename(gamename);
		
		if(game.getStep() > 1){
			return "fail";
		}
		if(gameCheckForm.getAccepted()){
			game.setStep(2);
			game.setAcceptTime(System.currentTimeMillis());
			
		}else{
			game.setStep(0);
		}
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		gameRepository.save(game);
		ApproveRecord record = new ApproveRecord();
		record = gameCheckForm.update(record);
		record.setGamename(gamename);
		record.setApprover(username);
		record.setGame(game);
		approveRecordRepository.insert(record);
		
		return "ok";
	}
}
