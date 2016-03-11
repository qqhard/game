package crazy;

import org.junit.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class TestPasswordEncoder {
	@Test
	public void test(){
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		String hashedPassword = encoder.encode("123456");
		System.out.println(hashedPassword);
//		hashedPassword = encoder.encode("123456");
//		System.out.println(hashedPassword);
	}
}
