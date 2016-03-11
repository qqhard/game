package crazy.config;


import org.springframework.beans.factory.support.ManagedProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSenderImpl;

/**
 * Created by g on 12/21/15.
 */
@Configuration
public class MailConfig {

    @Bean
    JavaMailSenderImpl mailSender() {
        JavaMailSenderImpl mail = new JavaMailSenderImpl();
        mail.setHost("smtp.qq.com");
        mail.setPort(587);
        mail.setUsername("396731979@qq.com");
        mail.setPassword("6ycanVArSsY6");
        ManagedProperties p = new ManagedProperties();
        p.setProperty("mail.smtp.starttls.enable", "true");
        mail.setJavaMailProperties(p);
        return mail;
    }

}
