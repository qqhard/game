package crazy.action;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.boot.test.WebIntegrationTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import crazy.GameApplication;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = GameApplication.class)
@WebIntegrationTest("server.port:0")
public class TestOnlyGetAction {
	@Autowired
    private WebApplicationContext context;

    private MockMvc mockMvc;
  
    @Before
    public void setupMockMvc() {
    	 mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
    }

    @Test
    public void testGetProvinces() throws Exception {

    	MvcResult ret = mockMvc.perform(get("/provinces")
                .accept(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print())
                .andReturn();
    	
    }
    
    @Test
    public void testGetColleges() throws Exception {

    	MvcResult ret = mockMvc.perform(get("/colleges/3")
                .accept(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print())
                .andReturn();
    	
    }
    
    @Test
    public void testGetInstitutes() throws Exception {

    	MvcResult ret = mockMvc.perform(get("/institutes/3")
                .accept(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print())
                .andReturn();
    	
    }
}
