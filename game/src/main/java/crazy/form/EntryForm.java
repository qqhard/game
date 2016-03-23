package crazy.form;

import java.util.ArrayList;
import java.util.List;

import crazy.vo.Entry;
import crazy.vo.UserDefineForm;

public class EntryForm {
	private String username;
	private String gamename;
	private String phone;
	private String email;
	private String forms;
	public List<UserDefineForm> getUserDefindFormList(){
		List<UserDefineForm> ret = new ArrayList<UserDefineForm>();
		if(forms !=null && !"".equals(forms)){
			String[] parts = forms.split("#");
			for(String part : parts){
				if(part.contains("=")){
					String[] tmp = part.split("=");
					ret.add(new UserDefineForm(tmp[0], tmp.length > 1? tmp[1]: ""));
				}		
			}
		}
		return ret;
	}
	public Entry update(Entry entry){
		entry.setUsername(username);
		entry.setGamename(gamename);
		entry.setEmail(email);
		entry.setPhone(phone);
		entry.setDeled(false);
		entry.setFormList(getUserDefindFormList());
		return entry;
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
	public String getForms() {
		return forms;
	}
	public void setForms(String forms) {
		this.forms = forms;
	}

}
