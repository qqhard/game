package com.valseek;

public class Test {

	public static void main(String[] args){
		CookieRestTemplate template = new CookieRestTemplate();
		
		template.login("monitor", "12345678");
		
		template.getForEntity("http://valseek.com/gameApi/management/health", String.class);

	}
}
