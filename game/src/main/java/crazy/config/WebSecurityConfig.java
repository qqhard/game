package crazy.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;


@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Override
    public void configure(WebSecurity web) throws Exception {  
    	web.ignoring().antMatchers("/image/**","/css/**","/js/**", "/");
    }
	
    @Override
    protected void configure(HttpSecurity http) throws Exception {
      	http
      		.authorizeRequests()
				.antMatchers("/games","/teams","/game/*","/game/detail/*").permitAll()
//				.antMatchers("/management/**").hasAuthority("SUPERUSER")
				.anyRequest()
				.authenticated();
      	
    }
    

    @Bean
    public PasswordEncoder passwordEncoder(){
    	PasswordEncoder passwordEncoder=new BCryptPasswordEncoder(4);
    	return passwordEncoder;
    }
    

    @Bean
    public SessionRegistry sessionRegistry(){
    	SessionRegistry sessionRegistry=new SessionRegistryImpl();
    	return sessionRegistry;
    }



}