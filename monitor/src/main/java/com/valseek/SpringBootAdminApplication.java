package com.valseek;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import de.codecentric.boot.admin.config.EnableAdminServer;

@SpringBootApplication
@EnableAdminServer
public class SpringBootAdminApplication {
    public static void main(String[] args) {
        SpringApplication.run(SpringBootAdminApplication.class, args);
    }
//	@Autowired
//	private ApplicationStore applicationStore;
//	
//	@Bean
//	public AdminServerProperties adminServerProperties() {
//		return new AdminServerProperties();
//	}
//	
//	@Bean
//	public StatusUpdater statusUpdater() {
//		CookieRestTemplate template = new CookieRestTemplate();
//		template.login("monitor", "12345678");
////		System.out.println(template.getForEntity("http://valseek.com/gameApi/management/health", String.class));
////		
//		template.getMessageConverters().add(new MappingJackson2HttpMessageConverter());
//		template.setErrorHandler(new DefaultResponseErrorHandler() {
//			@Override
//			protected boolean hasError(HttpStatus statusCode) {
//				return false;
//			}
//		});
//		StatusUpdater statusUpdater = new StatusUpdater(template, applicationStore);
//		statusUpdater.setStatusLifetime(adminServerProperties().getMonitor().getStatusLifetime());
//
//		return statusUpdater;
//	}
}
