package crazy.form;

import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.NotBlank;

import crazy.vo.User;

public class RegisterForm {
	@Size(min = 4, max = 20, message = "用户名过短或过长")
	@Pattern(regexp = "[a-zA-Z0-9_]+", message = "用户名只能为数字字母和下划线")
	private String username;

	@NotBlank
	private String email;

	@NotBlank
	private String password;

	@NotBlank
	private String rePassword;

	public User update(User user) {
		User ret = new User();
		ret.setUsername(this.username);
		ret.setPassword(this.password);
		ret.setEmail(email);
		ret.setEmailActivated(false);
		ret.setLocked(true);
		ret.setEnabled(true);
		return ret;
	}

	public RegisterForm() {
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRePassword() {
		return rePassword;
	}

	public void setRePassword(String rePassword) {
		this.rePassword = rePassword;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

}
