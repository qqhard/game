package crazy.vo;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigInteger;
import java.security.SecureRandom;

@Document(collection = "user")
public class User {
    @Id
    private String id;
    @Indexed(unique = true)
    private String username;
    private String password;
    private String email;
    private String phone;
    private String sociolname;
    private String studentid;
    private String authentications;
    private boolean emailActivated;
    private String randomEmailActivationCode;
    private long emailSentTimestamp;


    private int provinceid;
    private int collegeid;
    private int instituteid;

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

    private boolean enabled;
    private boolean locked;


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

    public String getId() {
        return id;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public boolean isLocked() {
        return locked;
    }

    public void setLocked(boolean locked) {
        this.locked = locked;
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

    public String getAuthentications() {
        return authentications;
    }

    public void setAuthentications(String authentications) {
        this.authentications = authentications;
    }

    public boolean getEmailActivated() {
        return this.emailActivated;
    }

    public void setEmailActivated(boolean emailActivated) {
        this.emailActivated = emailActivated;
    }

    public String getRandomEmailActivationCode() {
        return randomEmailActivationCode;
    }

    public void setRandomEmailActivationCode() {
        this.setEmailActivated(false);
        this.randomEmailActivationCode = new BigInteger(130, new SecureRandom()).toString(32);
    }

    public long getEmailSentTimestamp() {
        return emailSentTimestamp;
    }

    public void setEmailSentTimestamp(long emailSentTimestamp) {
        this.emailSentTimestamp = emailSentTimestamp;
    }
}
