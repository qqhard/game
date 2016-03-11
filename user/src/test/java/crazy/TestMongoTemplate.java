package crazy;

import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;

import static org.springframework.data.mongodb.core.query.Criteria.where;

import java.net.UnknownHostException;
import java.util.List;

import org.junit.Test;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.SimpleMongoDbFactory;


import com.mongodb.MongoClient;

import crazy.dao.Customer;


public class TestMongoTemplate {

    @Test
    public void test() throws UnknownHostException {
        MongoOperations mongoOps = new MongoTemplate(new SimpleMongoDbFactory(new MongoClient(), "game"));
        mongoOps.insert(new Customer("a", "b"));
        mongoOps.updateFirst(new Query(where("firstName").is("a")), new Update().set("lastName", "c"), Customer.class);
        List<Customer> cus = mongoOps.findAll(Customer.class);
        System.out.println(cus.size());
    }
}
