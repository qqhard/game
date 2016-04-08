package crazy.dao;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import crazy.vo.Group;
public interface GroupRepository extends MongoRepository<Group, ObjectId> {

}
