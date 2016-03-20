package crazy.dao;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import crazy.vo.Message;


public interface MessageRepository  extends MongoRepository<Message, ObjectId>{
	public List<Message> findBySender(String sender);
	public List<Message> findByRecver(String recver);
	public List<Message> findBySenderAndRecver(String sender,String recver);
}
