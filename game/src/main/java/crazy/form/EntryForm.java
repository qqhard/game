package crazy.form;

import java.util.ArrayList;
import java.util.List;

import crazy.vo.UserDefineForm;

public class EntryForm {
	private String username;
	private String gamename;
	private String phone;
	private String email;
	private String userDefineForm;
	public List<UserDefineForm> getUserDefindFormList(){
		List<UserDefineForm> ret = new ArrayList<UserDefineForm>();
		if(userDefineForm !=null && !"".equals(userDefineForm)){
			String[] parts = userDefineForm.split("#");
			for(String part : parts){
				ret.add(new UserDefineForm(part,""));
			}
		}
		return ret;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getGamename() {
		return gamename;
	}
	public void setGamename(String gamename) {
		this.gamename = gamename;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getUserDefineForm() {
		return userDefineForm;
	}
	public void setUserDefineForm(String userDefineForm) {
		this.userDefineForm = userDefineForm;
	}
	
}
