package crazy.dao;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import crazy.vo.College;

public interface CollegeRepository  extends MongoRepository<College, ObjectId>{
	public List<College> findByProvinceid(int provinceid,Sort sorter);
	@Query("{'collegeid':{'$in':?0}}")
	public List<College> findByInCollegeids(List<Integer> collegeids);
	public College findById(String id);
	public College findByCollegeid(int i);
}
