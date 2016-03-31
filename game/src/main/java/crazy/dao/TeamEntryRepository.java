package crazy.dao;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import crazy.vo.TeamEntry;

public interface TeamEntryRepository  extends MongoRepository<TeamEntry, ObjectId>{
	public List<TeamEntry> findByGamenameAndDeled(String gamename,boolean deled);
	@Query("{'teamid':{'$in':?0}}")
	public List<TeamEntry> findByTeamids(List<String> teams);
}
