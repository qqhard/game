package crazy.form;

import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotBlank;

import crazy.vo.User;

public class RegisterForm {
    @Size(min=4, max=20, message = "用户名过短或过长")
    @Pattern(regexp = "[a-zA-Z0-9_]+", message = "用户名只能为数字字母和下划线")
    private String username;

    @Size(min = 8,max = 50, message = "密码位数过短或过长")
    private String password;
    
    @Size(min = 8,max = 50, message = "确认密码位数过短或过长")
    private String rePassword;
    
    @NotBlank(message = "邮箱不能为空")
    @Email(message = "邮箱格式有误")
    private String email;
    
    @NotBlank(message = "手机号码不能为空")
    @Pattern(regexp = "\\d{11}", message = "手机号码格式错误")
    private String phone;


    public User getUser() {
        User ret = new User();
        ret.setUsername(this.username);
        ret.setPassword(this.password);
        ret.setEmail(this.email);
        ret.setPhone(this.phone);
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

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }


}
