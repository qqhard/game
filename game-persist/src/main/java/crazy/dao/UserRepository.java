package crazy.dao;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import crazy.vo.User;

public interface UserRepository extends MongoRepository<User, ObjectId> {
    public User findByUsername(String username);
    @Query("{'username':{'$in':?0}}")
    public List<User> findByUsernameInList(List<String> users);
}
