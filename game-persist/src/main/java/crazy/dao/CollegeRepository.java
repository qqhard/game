package crazy.dao;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;

import crazy.vo.College;

public interface CollegeRepository  extends MongoRepository<College, ObjectId>{
	public List<College> findByProvinceid(int provinceid,Sort sorter);
	public College findById(String id);
	public College findByCollegeid(int i);
}
