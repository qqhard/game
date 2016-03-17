package crazy;

import org.junit.Before;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;


public abstract class AbstractClientTest {

    static RestTemplate restTemplate;
    ObjectMapper objectMapper;//JSON
    String baseUri = "http://localhost:8080/";

    @Before
    public void setUp() throws Exception {
        objectMapper = new ObjectMapper(); //需要添加jackson jar包
        restTemplate = new RestTemplate();
    }
}