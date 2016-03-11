package crazy;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.springframework.web.client.RestTemplate;


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