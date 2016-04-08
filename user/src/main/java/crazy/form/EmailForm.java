package crazy.form;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotBlank;

public class EmailForm {
	@NotBlank(message = "邮箱不能为空")
	@Email(message = "邮箱格式有误")
	private String email;

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	
}
