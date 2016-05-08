package crazy.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.configurers.GlobalAuthenticationConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;


@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Override
    public void configure(WebSecurity web) throws Exception {  
    	web.ignoring().antMatchers("/image/**","/css/**","/js/**");
    }
	
    @Override
    protected void configure(HttpSecurity http) throws Exception {
    	http
    		.authorizeRequests()
    			.antMatchers("/userApi/register","/userApi/login","/userApi/username").permitAll()
    			.anyRequest()
    			.authenticated();
    	http
    		.logout()
    			.logoutUrl("/userApi/logout")
    			.logoutSuccessUrl("/")
    			.invalidateHttpSession(true)
    			.logoutRequestMatcher(new AntPathRequestMatcher("/userApi/logout"));

    }
    
 
    @Configuration
    protected static class AuthenticationConfiguration extends
            GlobalAuthenticationConfigurerAdapter {
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
