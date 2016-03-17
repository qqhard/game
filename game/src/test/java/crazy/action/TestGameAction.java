package crazy.action;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
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
public class TestGameAction {
	@Autowired
    private WebApplicationContext context;

    private MockMvc mockMvc;
  
    @Before
    public void setupMockMvc() {
    	 mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
    }

    @Test
    public void testGet() throws Exception {

    	MvcResult ret = mockMvc.perform(get("/game/acm")
                .accept(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print())
                .andReturn();
    	
    }
    
    @Test
    public void testPut() throws Exception {
    	   	
    	MvcResult ret = mockMvc.perform(put("/game/acm")
    			.param("gamePlace", "ddddd")
    			.param("gameTime", "八点")
    			.param("briefinfo", "竞赛")
                .accept(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print())
                .andReturn();
    	
    }
    
    @Test
    public void testPost() throws Exception {

    	
    	MvcResult ret = mockMvc.perform(post("/game")
    			.param("gametitle", "ddd")
    			.param("gameplace", "ddd")
    			.param("gametime", "h点")	
    			.param("gamename", "acm3")
    			.param("briefinfo", "竞赛")
                .accept(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print())
                .andReturn();
    	
    }
}
