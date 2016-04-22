package com.valseek;

import java.util.Arrays;

import org.springframework.http.client.ClientHttpRequestInterceptor;

import de.codecentric.boot.admin.web.BasicAuthHttpRequestInterceptor;

public class Test {

	public static void main(String[] args){
		CookieRestTemplate template = new CookieRestTemplate();
		
		template.login("monitor", "12345678");
		
		System.out.println(template.getForEntity("http://valseek.com/gameApi/management/health", String.class));
		
		template.setInterceptors(Arrays.<ClientHttpRequestInterceptor> asList(
				new BasicAuthHttpRequestInterceptor("monitor", "12345678")));
	}
}
