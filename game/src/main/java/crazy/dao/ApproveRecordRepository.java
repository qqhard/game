package crazy.dao;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import crazy.vo.ApproveRecord;

public interface ApproveRecordRepository  extends MongoRepository<ApproveRecord, ObjectId>{
	public ApproveRecord findByGamename(String gamename);
	public List<ApproveRecord> findByApprover(String approver);
}
