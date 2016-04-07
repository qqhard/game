package crazy.form;

import javax.validation.constraints.Pattern;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotBlank;

import crazy.vo.User;

public class UserInfoForm {

    @NotBlank(message = "姓名不能为空")
    private String sociolname;

    @NotBlank(message = "学号不能为空")
    @Pattern(regexp = "\\d{9}", message = "学号格式错误")
    private String studentid;
    @NotBlank(message = "邮箱不能为空")
    @Email(message = "邮箱格式有误")
    private String email;
    @NotBlank(message = "手机号码不能为空")
    @Pattern(regexp = "\\d{11}", message = "手机号码格式错误")
    private String phone;
    private int provinceid;
    private int collegeid;
    private int instituteid;


    public User update(User user) {
        if (!user.getEmail().equals(email)) {
            user.setEmail(email);
            user.setEmailActivated(false);
        }
        user.setPhone(phone);
        user.setSociolname(sociolname);
        user.setStudentid(studentid);
        user.setProvinceid(provinceid);
        user.setCollegeid(collegeid);
        user.setInstituteid(instituteid);
        return user;
    }

    public UserInfoForm() {
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

    public String getSociolname() {
        return sociolname;
    }

    public void setSociolname(String sociolname) {
        this.sociolname = sociolname;
    }

    public String getStudentid() {
        return studentid;
    }

    public void setStudentid(String studentid) {
        this.studentid = studentid;
    }

    public int getProvinceid() {
        return provinceid;
    }

    public void setProvinceid(int provinceid) {
        this.provinceid = provinceid;
    }

    public int getCollegeid() {
        return collegeid;
    }

    public void setCollegeid(int collegeid) {
        this.collegeid = collegeid;
    }

    public int getInstituteid() {
        return instituteid;
    }

    public void setInstituteid(int instituteid) {
        this.instituteid = instituteid;
    }


}
