package crazy.action;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import crazy.form.GameDetailForm;
import crazy.vo.Game;
import crazy.vo.GameDetail;

@RestController
public class GameDetailAction {
	@Autowired
	private MongoTemplate mongo;

	@RequestMapping(value = "game/detail/{gamename}", method = RequestMethod.GET)
	public Object get(@PathVariable("gamename") String gamename){
		Query query = new Query().addCriteria(Criteria.where("gamename").is(gamename));
		GameDetail gameDetail = mongo.findOne(query, GameDetail.class);
		return gameDetail;
	}
	
	@RequestMapping(value = "game/detail/{gamename}", method = RequestMethod.PUT)
	public Object put(@PathVariable("gamename") String gamename,@Valid GameDetailForm form,BindingResult bind){
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		Query query = new Query().addCriteria(Criteria.where("gamename").is(gamename).and("owner").is(username));
		boolean hasAuth = mongo.exists(query, Game.class);
		if(!hasAuth) return new ResponseEntity<Object>(HttpStatus.FORBIDDEN);
		query = new Query().addCriteria(Criteria.where("gamename").is(gamename));
		Update update = new Update().set("text", form.getText());
		mongo.upsert(query, update, GameDetail.class);
		return "ok";
	}
}
