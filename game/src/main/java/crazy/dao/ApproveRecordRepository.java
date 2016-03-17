package crazy.dao;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import crazy.vo.ApproveRecord;

public interface ApproveRecordRepository  extends MongoRepository<ApproveRecord, ObjectId>{
	public ApproveRecord findByApproverAndGamename(String approver, String gamename);
}
