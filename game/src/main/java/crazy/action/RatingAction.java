package crazy.action;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.BasicQuery;
import org.springframework.data.mongodb.core.query.BasicUpdate;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import crazy.dao.RatingRepository;
import crazy.form.RatingForm;
import crazy.vo.Rating;
import crazy.vo.RatingStat;

@RestController()
@RequestMapping(value = "/rating")
public class RatingAction {
	@Autowired
	private MongoTemplate mongo;
	
	@Autowired
	private RatingRepository ratingRepository;
	
	@ResponseBody
	@RequestMapping(value="{gamename}/user",method = RequestMethod.GET)
	public Object getGameUser(@PathVariable("gamename") String gamename){
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		return ratingRepository.findByGamenameAndUsername(gamename, username);
	}
	
	@ResponseBody
	@RequestMapping(value="{gamename}/game",method = RequestMethod.GET)
	public Object getGame(@PathVariable("gamename") String gamename){
		BasicQuery query = new BasicQuery(String.format("{gamename:'%s'}", gamename));
		return mongo.findOne(query, RatingStat.class);
	}
	
	
	@ResponseBody
	@RequestMapping(method = RequestMethod.PUT)
	public Object put(@Valid RatingForm form,BindingResult bindingResult){
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		String lock = ("rat_" + form.getGamename()).intern();
		BasicQuery query = new BasicQuery(String.format("{gamename:'%s'}", form.getGamename()));
		Update update = new Update().inc("num", 1).inc("score", form.getScore());
		synchronized(lock){
			Rating rating = ratingRepository.findByGamenameAndUsername(form.getGamename(), username);
			if(rating == null){
				mongo.updateFirst(query, update, RatingStat.class);
				rating = form.update(new Rating());
				rating.setUsername(username);
				ratingRepository.insert(rating);
			}else{
				int change = form.getScore() - rating.getScore();
				update =  new Update().inc("score", change);
				mongo.updateFirst(query, update, RatingStat.class);
				rating = form.update(rating);
				rating.setUsername(username);
				ratingRepository.save(rating);
			}
		}
		return "ok";
	}
}
