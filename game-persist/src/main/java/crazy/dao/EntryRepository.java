package crazy.dao;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import crazy.vo.Entry;

public interface EntryRepository  extends MongoRepository<Entry, ObjectId>{
	public Entry findByUsernameAndGamename(String username, String gamename);
	public List<Entry> findByGamenameAndDeled(String gamename,boolean deled);
	public List<Entry> findByUsername(String username);
	@Query("{'deled':false,'gamename':?0,'username':{'$in':?1}}")
	public List<Entry> findByGamenameAndInUsernames(String gamename,List<String> usernames);
}
