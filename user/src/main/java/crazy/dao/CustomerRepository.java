package crazy.dao;


import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CustomerRepository extends MongoRepository<Customer, ObjectId> {

    public Customer findByFirstName(String firstName);

    public List<Customer> findByLastName(String lastName);

}