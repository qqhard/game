package crazy.dao;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;

import crazy.vo.Institute;

public interface InstituteRepository  extends MongoRepository<Institute, ObjectId>{
	public List<Institute> findByCollegeid(int collegeid,Sort sorter);
	public Institute findById(String id);
	public Institute findByInstituteid(int id);
}
