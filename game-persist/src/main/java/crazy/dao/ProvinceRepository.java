package crazy.dao;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import crazy.vo.Province;

public interface ProvinceRepository extends MongoRepository<Province, ObjectId>{
	public Province findById(String id);
	@Query("{'provinceid':{'$in':?0}}")
	public List<Province> findByInProvinceids(List<Integer> provinceids);
	public Province findByProvinceid(int provinceid);
	public List<Province> findAll();
}
