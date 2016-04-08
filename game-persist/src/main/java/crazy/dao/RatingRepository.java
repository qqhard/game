package crazy.dao;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import crazy.vo.Rating;

public interface RatingRepository extends MongoRepository<Rating, ObjectId>{
	public Rating findByGamenameAndUsername(String gamename,String username);
}
