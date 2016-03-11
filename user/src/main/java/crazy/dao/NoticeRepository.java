package crazy.dao;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import crazy.vo.NoticeVo;


public interface NoticeRepository extends MongoRepository<NoticeVo, ObjectId> {
}