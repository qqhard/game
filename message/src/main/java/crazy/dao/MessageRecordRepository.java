package crazy.dao;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import crazy.vo.MessageRecord;


public interface MessageRecordRepository  extends MongoRepository<MessageRecord, ObjectId>{
	public List<MessageRecord> findByGamename(String gamename);
}
