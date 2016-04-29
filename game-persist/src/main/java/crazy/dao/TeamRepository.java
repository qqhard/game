package crazy.dao;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import crazy.vo.Team;

public interface TeamRepository  extends MongoRepository<Team, ObjectId>{
	public List<Team> findByEntryed(boolean entryed);
	public List<Team> findByOwner(String owner);
	public List<Team> findByOwnerAndEntryed(String owner,Boolean entryed);
	public Team findById(String id);
	@Query("{'id':{'$in':?0}}")
	public List<Team> findByIds(List<String> ids);
	public List<Team> findByGamenameAndEntryedAndDeled(String gamename,boolean entryed,boolean deled);
}
