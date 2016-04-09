package crazy.action;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.BasicQuery;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.mongodb.WriteResult;

import crazy.dao.ApproveRecordRepository;
import crazy.dao.GameRepository;
import crazy.form.GameEditForm;
import crazy.form.GameForm;
import crazy.vo.Game;

@RestController
@RequestMapping(value = "/game")
public class GameAction {
	@Autowired
	private GameRepository gameRepository;

	@Autowired
	private ApproveRecordRepository approveRecordRepository;
	
	@Autowired
	private MongoTemplate mongo;

	@ResponseBody
	@RequestMapping(value = "{gamename}", method = RequestMethod.GET)
	public Object get(@PathVariable("gamename") String gamename) {
		Game game = gameRepository.findByGamenameAndDeled(gamename, false);
		return game;
	}

	@ResponseBody
	@RequestMapping(method = RequestMethod.POST)
	public Object post(@Valid GameForm gameForm, BindingResult bindingResult, HttpSession session) {
		Map<String, String> ret = new HashMap<String, String>();
		if (bindingResult.hasFieldErrors()) {
			List<FieldError> errors = bindingResult.getFieldErrors();
			ret.put("status", "fail");
			for (FieldError error : errors) {
				ret.put(error.getField(), error.getCode());
			}
			return ret;
		}

		Game game = new Game();
		gameForm.update(game);
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		game.setOwner(username);
		game.setSubmitTime(System.currentTimeMillis());
		game.setStartTime(game.getSubmitTime() + 3600 * 24 * 7 * 1000);
		game.setDueTime(game.getSubmitTime() + 3600 * 24 * 7 * 1000 * 2);
		game.setEndTime(game.getSubmitTime() + 3600 * 24 * 7 * 1000 * 3);
		game.setDeled(false);
		game.setStep(1);

		boolean ok = false;
		String lock = ("game_"+game.getGamename().substring(0, 4)).intern();
		synchronized (lock) {
			if (gameRepository.findByGamename(gameForm.getGamename()) == null) {
				gameRepository.insert(game);
				ok = true;
			}
		}

		if (ok)
			ret.put("status", "ok");
		else {
			ret.put("status", "fail");
			ret.put("gamename", "exists");
		}

		return ret;
	}

	@ResponseBody
	@RequestMapping(value = "{gamename}", method = RequestMethod.PUT)
	public Object put(@PathVariable("gamename") String gamename, @Valid GameForm gameForm,
			BindingResult bindingResult) {
		Map<String, String> ret = new HashMap<String, String>();
		if (bindingResult.hasFieldErrors()) {
			List<FieldError> errors = bindingResult.getFieldErrors();
			ret.put("status", "fail");
			for (FieldError error : errors) {
				ret.put(error.getField(), error.getCode());
			}
			return ret;
		}

		Game game = gameRepository.findByGamenameAndDeled(gamename, false);

		if (game == null) {
			ret.put("gamename", "not exists");
			ret.put("status", "fail");
			return ret;
		}

		if (game.getStep() != 0) {
			ret.put("step", "error");
			ret.put("status", "fail");
			return ret;
		}

		gameForm.update(game);
		game.setStep(1);
		game.setSubmitTime(System.currentTimeMillis());
		game.setAcceptTime(0);
		approveRecordRepository.deleteByGamename(gamename);
		gameRepository.save(game);
		ret.put("status", "ok");
		return ret;
	}


	
	@ResponseBody
	@RequestMapping(value = "{gamename}/alltime", method = RequestMethod.PUT)
	public Object putAlltime(@PathVariable("gamename") String gamename, @Valid GameEditForm.AllTime form,
			BindingResult bind) {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		BasicQuery query = new BasicQuery(String.format("{gamename:'%s',owner:'%s'}", gamename, username));
		Update update = new Update()
					.set("startTime", form.getStartTime())
					.set("dueTime", form.getDueTime())
					.set("endTime", form.getEndTime());
		WriteResult ret = mongo.updateFirst(query, update, Game.class);
		return ret.isUpdateOfExisting();
	}
	

	@ResponseBody
	@RequestMapping(value = "{gamename}/gametime", method = RequestMethod.PUT)
	public Object putGametime(@PathVariable("gamename") String gamename, @Valid GameEditForm.GameTime form,
			BindingResult bind) {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		BasicQuery query = new BasicQuery(String.format("{gamename:'%s',owner:'%s'}", gamename, username));
		Update update = new Update().set("gametime", form.getGameTime());
		WriteResult ret = mongo.updateFirst(query, update, Game.class);
		return ret.isUpdateOfExisting();
	}

	@ResponseBody
	@RequestMapping(value = "{gamename}/gameplace", method = RequestMethod.PUT)
	public Object putGameplace(@PathVariable("gamename") String gamename, @Valid GameEditForm.GamePlace form,
			BindingResult bind) {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		BasicQuery query = new BasicQuery(String.format("{gamename:'%s',owner:'%s'}", gamename, username));
		Update update = new Update().set("gameplace", form.getGamePlace());
		WriteResult ret = mongo.updateFirst(query, update, Game.class);
		return ret.isUpdateOfExisting();
	}

	@ResponseBody
	@RequestMapping(value = "{gamename}", method = RequestMethod.DELETE)
	public Object delete(@PathVariable("gamename") String gamename) {
		Map<String, String> ret = new HashMap<String, String>();
		Game game = gameRepository.findByGamenameAndDeled(gamename, false);
		boolean ok = false;
		synchronized (this) {
			if (game != null) {
				game.setDeled(true);
				gameRepository.save(game);
				ok = true;
			}
		}

		if (ok)
			ret.put("status", "ok");
		else
			ret.put("status", "fail");

		return ret;
	}
}
