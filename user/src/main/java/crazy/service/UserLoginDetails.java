package crazy.service;

import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class UserLoginDetails implements UserDetails{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String username;
	private String password;
	private boolean enabled;
	private boolean locked;
	private List<GrantedAuthority> authorities;
	
	
	/**
	 * 构造函数
	 */
	public UserLoginDetails(){}
	public UserLoginDetails(String username,String password,boolean enabled,boolean locked){
		this.username = username;
		this.password = password;
		this.enabled = enabled;
		this.locked = locked;
	}
	
	
	/**
	 * 用户名唯一
	 */
	
	@Override  
	public boolean equals(Object rhs) {  
	    if (rhs instanceof UserLoginDetails) {  
	        return username.equals(((UserLoginDetails) rhs).username);  
	    }  
	    return false;  
	}  
	@Override  
	public int hashCode() {  
	    return username.hashCode();  
	}

	/**
	 * getter方法
	 */
	
	@Override
	public String getPassword() {
		// TODO Auto-generated method stub
		return password;
	}

	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return username;
	}

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return enabled;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return locked;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return enabled;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return enabled;
	}
	
	@Override
	public List<GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return authorities;
	}
	
	/**
	 * setter方法
	 */
	
	public void setUsername(String username) {
		this.username = username;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	public void setAuthorities(List<GrantedAuthority> authorities) {
		this.authorities = authorities;
	}

	public void setLocked(boolean locked) {
		this.locked = locked;
	}
	

}
