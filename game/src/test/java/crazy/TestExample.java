package crazy;


import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.HashMap;
import java.util.Map;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.boot.test.TestRestTemplate;
import org.springframework.boot.test.WebIntegrationTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.context.WebApplicationContext;
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = GameApplication.class)
@WebIntegrationTest("server.port:0")
public class TestExample {
		@Autowired
	    private WebApplicationContext context;
	    @Value("${local.server.port}")
	    private int port;

	    private MockMvc mockMvc;
	    private RestTemplate restTemplate = new TestRestTemplate();

	    @Before
	    public void setupMockMvc() {
	    	 mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
	    }

	    @Test
	    public void webappPublisherApi() throws Exception {
	        //MockHttpServletRequestBuilder.accept方法是设置客户端可识别的内容类型
	        //MockHttpServletRequestBuilder.contentType,设置请求头中的Content-Type字段,表示请求体的内容类型
	    	MvcResult ret = mockMvc.perform(get("/test")
	                .accept(MediaType.APPLICATION_JSON_UTF8))
	                .andExpect(status().isOk())
	                .andDo(MockMvcResultHandlers.print())
	                .andReturn();
	    	
	    }
	    
	    @Test
	    public void testPost() throws Exception {
	        //MockHttpServletRequestBuilder.accept方法是设置客户端可识别的内容类型
	        //MockHttpServletRequestBuilder.contentType,设置请求头中的Content-Type字段,表示请求体的内容类型

	    	MvcResult ret = mockMvc.perform(post("/test_post")
	    			.accept(MediaType.APPLICATION_JSON)
	    			.param("username", "")  
	                .param("password", "1234"))
	                .andExpect(status().isOk())
	                .andDo(MockMvcResultHandlers.print())
	                .andReturn();
	    	
	    }


	    @Test
	    public void webappBookIsbnApi() {
	    	Map<String,String> body = new HashMap<String,String>();
	    	body.put("username", "hard");
	    	body.put("password", "12345678");
	    	String ret = restTemplate.getForObject("http://localhost:"+port+"/test", String.class, new String[]{});
	    	System.out.println(ret);
	    	ret = restTemplate.postForObject("http://localhost:"+port+"/test_post", body, String.class);
	    	System.out.print(ret);
	    }


}
