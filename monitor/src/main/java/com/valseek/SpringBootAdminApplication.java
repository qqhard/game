package com.valseek;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.client.DefaultResponseErrorHandler;

import de.codecentric.boot.admin.config.AdminServerProperties;
import de.codecentric.boot.admin.config.EnableAdminServer;
import de.codecentric.boot.admin.registry.StatusUpdater;
import de.codecentric.boot.admin.registry.store.ApplicationStore;

@SpringBootApplication
@EnableAdminServer
public class SpringBootAdminApplication {
    public static void main(String[] args) {
        SpringApplication.run(SpringBootAdminApplication.class, args);
    }
	@Autowired
	private ApplicationStore applicationStore;
	
	@Bean
	public AdminServerProperties adminServerProperties() {
		return new AdminServerProperties();
	}
	
	@Bean
	public StatusUpdater statusUpdater() {
		CookieRestTemplate template = new CookieRestTemplate();
		template.login("monitor", "12345678");
//		System.out.println(template.getForEntity("http://valseek.com/gameApi/management/health", String.class));
//		
		template.getMessageConverters().add(new MappingJackson2HttpMessageConverter());
		template.setErrorHandler(new DefaultResponseErrorHandler() {
			@Override
			protected boolean hasError(HttpStatus statusCode) {
				return false;
			}
		});
		StatusUpdater statusUpdater = new StatusUpdater(template, applicationStore);
		statusUpdater.setStatusLifetime(adminServerProperties().getMonitor().getStatusLifetime());

		return statusUpdater;
	}
}
