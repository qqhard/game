package crazy.dao;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import crazy.vo.Message;


public interface MessageRepository  extends MongoRepository<Message, ObjectId>{
	public Message findById(String id);
	public List<Message> findBySender(String sender,MessagePageable pages);
	public int countBySender(String sender);
	public List<Message> findByRecverOrderBySendTimeDesc(String recver);
	public List<Message> findBySenderAndRecver(String sender,String recver);
	public int countByRecverAndReadTime(String recver,long time);
}
