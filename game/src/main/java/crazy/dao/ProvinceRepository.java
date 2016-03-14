package crazy.dao;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import crazy.vo.Province;

public interface ProvinceRepository extends MongoRepository<Province, ObjectId>{
	public Province findById(String id);
	public Province findByProvinceid(int provinceid);
	public List<Province> findAll();
}
