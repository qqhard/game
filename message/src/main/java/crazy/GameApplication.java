package crazy;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import crazy.service.MessageSend;


@SpringBootApplication
public class GameApplication {

    public static void main(String[] args) {
    	ExecutorService fixedThreadPool = Executors.newFixedThreadPool(4);
    	new Thread(()->{
    		while(true){
    			Runnable task = MessageSend.get();
    			System.out.println("send");
    			if(task != null)
    				fixedThreadPool.execute(task);
    		}
    	}).start();
        SpringApplication.run(GameApplication.class, args);
    }
}
