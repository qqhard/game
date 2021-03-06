package crazy.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configurers.GlobalAuthenticationConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import crazy.filter.CsrfHeaderFilter;
import crazy.service.LoginFailureHandler;
import crazy.service.LoginSuccessHandler;


@Configuration
@EnableWebSecurity
//@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Override
    public void configure(WebSecurity web) throws Exception {  
    	web.ignoring().antMatchers("/image/**","/css/**","/js/**", "/");
    }
	
    @Override
    protected void configure(HttpSecurity http) throws Exception {
    	http
    		.authorizeRequests()
    			.antMatchers("/userApi/register","/userApi/login","/userApi/username").permitAll()
    			.anyRequest()
    			.authenticated();
    	http.addFilterAfter(new CsrfHeaderFilter(), CsrfFilter.class);
    	
    	http.formLogin()
    		.loginProcessingUrl("/userApi/login")
    		.successHandler(loginSuccessHandler())
    		.failureHandler(loginFailureHandler())
    		.permitAll();
    	

    	
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

    	@Autowired
		private UserDetailsService userDetailsService;
    	
    	@Autowired
    	private PasswordEncoder passwordEncoder;
    	
        @Autowired
        public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
            auth.userDetailsService(userDetailsService)
            		.passwordEncoder(passwordEncoder);
            
        }
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
    @Bean
    public LoginSuccessHandler loginSuccessHandler(){
    	return new LoginSuccessHandler();
    }
    @Bean
    public LoginFailureHandler loginFailureHandler(){
    	return new LoginFailureHandler();
    }

}
