package crazy.dao;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import crazy.vo.Manager;

public interface ManagerRepository extends MongoRepository<Manager, ObjectId> {

	public List<Manager> findByGamename(String gamename);

	public Manager findByGamenameAndUsername(String gamename, String username);
	
	public List<Manager> findByUsername(String username);
}
