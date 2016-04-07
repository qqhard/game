package crazy;

import crazy.service.EmailQueue;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;


@SpringBootApplication
//@EnableScheduling
//@ImportResource("classpath:SpringContext.xml")
public class GameApplication {

    public static void main(String[] args) {

        ExecutorService fixedThreadPool = Executors.newFixedThreadPool(4);
        new Thread(() -> {
            while (true) {
                Runnable task = EmailQueue.pop();
                System.out.println("send");
                if (task != null)
                    fixedThreadPool.execute(task);
            }
        }).start();
        SpringApplication.run(GameApplication.class, args);
    }
}
