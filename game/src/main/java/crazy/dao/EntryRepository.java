package crazy.dao;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import crazy.vo.Entry;

public interface EntryRepository  extends MongoRepository<Entry, ObjectId>{
	public Entry findByUsernameAndGamename(String username, String gamename);
	public List<Entry> findByGamename(String gamename);
	public List<Entry> findByUsername(String username);
}
