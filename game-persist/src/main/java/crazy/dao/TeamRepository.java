package crazy.dao;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import crazy.vo.Team;

public interface TeamRepository  extends MongoRepository<Team, ObjectId>{
	public List<Team> findByEntryed(boolean entryed);
	public List<Team> findByLeader(String leader);
	public List<Team> findByLeaderAndEntryed(String leader,Boolean entryed);
	public Team findById(String id);
	@Query("{'id':{'$in':?0}}")
	public List<Team> findByIds(List<String> ids);
}
