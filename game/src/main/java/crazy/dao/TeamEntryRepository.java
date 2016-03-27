package crazy.dao;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import crazy.vo.TeamEntry;

public interface TeamEntryRepository  extends MongoRepository<TeamEntry, ObjectId>{
	public TeamEntry findByTeamidAndGamename(String teamid, String gamename);
	public List<TeamEntry> findByGamenameAndDeled(String gamename,boolean deled);
}
