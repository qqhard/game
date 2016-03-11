package crazy.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import crazy.dao.UserRepository;
import crazy.vo.User;

@Service
public class UserLoginServiceImpl implements UserDetailsService {
	
	@Autowired
	private UserRepository userDao;
	
	
	@Override
	public UserDetails loadUserByUsername(String username)   throws UsernameNotFoundException, DataAccessException {
		
		User user = userDao.findByUsername(username);
		
		if(user!=null){

			 UserLoginDetails userLogin = 
					 new UserLoginDetails(
						 user.getUsername(),
						 user.getPassword(),
						 user.isEnabled(),
						 user.isLocked()
					 );
			 
			 List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
			 userLogin.setAuthorities(authorities);
			 
			 return userLogin;
		}else{
			throw new UsernameNotFoundException(username);
		}
		
	}
}
