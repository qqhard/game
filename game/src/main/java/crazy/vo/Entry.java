package crazy.vo;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="entry") 
@CompoundIndexes({
	@CompoundIndex(name="user_game", def="{'username':1,'gamename':1}", unique = true)
})
public class Entry {
	@Id
    private String id;
	private String username;
	private String gamename;
	private String phone;
	private String email;
	private List<UserDefineForm> formList;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
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
	public List<UserDefineForm> getFormList() {
		return formList;
	}
	public void setFormList(List<UserDefineForm> formList) {
		this.formList = formList;
	}
	
}
