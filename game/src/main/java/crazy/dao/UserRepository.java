package crazy.dao;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import crazy.vo.User;

public interface UserRepository extends MongoRepository<User, ObjectId> {
    public User findByUsername(String username);
}
