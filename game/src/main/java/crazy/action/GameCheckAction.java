package crazy.action;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
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
		String approver = (String)session.getAttribute("username");
		ApproveRecord record = approveRecordRepository.findByApproverAndGamename(approver, gamename);
		return record;
	}
	
	@ResponseBody
	@RequestMapping(value = "{gamename}", method = RequestMethod.POST)
	public Object post(@PathVariable("gamename") String gamename,
			@Valid GameCheckForm gameCheckForm,BindingResult bindingResult,HttpSession session){
		Game game = gameRepository.findByGamename(gamename);
		
		if(game.getStep() != 1){
			return "fail";
		}
		game.setStep(2);
		game.setAcceptTime(System.currentTimeMillis());
		gameRepository.save(game);
		
		ApproveRecord record = new ApproveRecord();
		record = gameCheckForm.update(record);
		record.setGamename(gamename);
		record.setApprover((String)session.getAttribute("username"));
		approveRecordRepository.insert(record);
		
		return "ok";
	}
}
