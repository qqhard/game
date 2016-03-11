package crazy.form;

import javax.validation.constraints.Pattern;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotBlank;

import crazy.vo.User;

public class UserInfoForm {

    @NotBlank(message = "姓名不能为空")
    private String name;
    @NotBlank(message = "学号不能为空")
    @Pattern(regexp = "\\d{9}", message = "学号格式错误")
    private String stunum;
    @NotBlank(message = "邮箱不能为空")
    @Email(message = "邮箱格式有误")
    private String email;
    @NotBlank(message = "手机号码不能为空")
    @Pattern(regexp = "\\d{11}", message = "手机号码格式错误")
    private String phone;


    public User getUser() {
        User ret = new User();
        ret.setEmail(this.email);
        ret.setPhone(this.phone);
        return ret;
    }

    public void setUser(User user) {
        this.email = user.getEmail();
        this.phone = user.getPhone();
    }

    public UserInfoForm() {
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStunum() {
        return stunum;
    }

    public void setStunum(String stunum) {
        this.stunum = stunum;
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
