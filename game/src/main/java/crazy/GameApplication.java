package crazy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import crazy.GameApplication;


@SpringBootApplication
//@EnableScheduling
//@ImportResource("classpath:SpringContext.xml")
public class GameApplication {

    public static void main(String[] args) {
        SpringApplication.run(GameApplication.class, args);
    }
}
