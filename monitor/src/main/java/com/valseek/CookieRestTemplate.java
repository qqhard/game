package com.valseek;

import java.io.IOException;
import java.net.URI;
import java.util.List;

import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.ClientHttpRequest;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

public class CookieRestTemplate extends RestTemplate {
	private String sessionid =null;
	private String token = null;

	@Override
	protected ClientHttpRequest createRequest(URI url, HttpMethod method) throws IOException {
		ClientHttpRequest request = super.createRequest(url, method);
		System.out.println(url);
		if(sessionid!=null && token!= null){
			
			request.getHeaders().set("Cookie", String.format("SESSION=%s; XSRF-TOKEN=%s", sessionid, token));
			
		}
		
		System.out.println(request.getHeaders());
		return request;
	}
	
	public boolean login(String username,String password){
		ResponseEntity<String> response = super.exchange("http://valseek.com/userApi/username", HttpMethod.GET, null, String.class, String.class);
		setCookie(response);
		MultiValueMap<String, Object> map = new LinkedMultiValueMap<String, Object>();
		map.add("username", username);
		map.add("password", password);
		map.add("_csrf", token);
		
		ResponseEntity<String> response2 = super.postForEntity("http://valseek.com/userApi/login", map, String.class);
		setCookie(response2);
		
		System.out.println("###"+sessionid);
		return false;
	}
	
	private void setCookie(ResponseEntity<String> response){
		List<String> cookies = response.getHeaders().get("Set-Cookie");
		System.out.println(response.getHeaders());
		for(String cookie : cookies){
			String value =  cookie.substring(cookie.indexOf("=")+1, cookie.indexOf(";"));
			if(cookie.startsWith("SESSION")) sessionid = value;
			else if(cookie.startsWith("XSRF-TOKEN")) token = value;
		}
	}
}