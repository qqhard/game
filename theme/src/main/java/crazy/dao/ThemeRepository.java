package crazy.dao;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import crazy.vo.Theme;



public interface ThemeRepository  extends MongoRepository<Theme, ObjectId>{

}
