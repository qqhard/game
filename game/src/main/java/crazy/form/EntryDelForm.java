package crazy.form;

import java.util.ArrayList;
import java.util.List;

public class EntryDelForm {
	private String users;
	private String gamename;
	
	public List<String> getUsernames(){
		ArrayList<String> ret = new ArrayList<String>();
		if(users!=null && !"".equals(users)){
			for(String part: users.split(",")){
				ret.add(part);
			}
		}
		return ret;
	}
	
	public String getUsers() {
		return users;
	}

	public void setUsers(String users) {
		this.users = users;
	}

	public String getGamename() {
		return gamename;
	}

	public void setGamename(String gamename) {
		this.gamename = gamename;
	}
	
}
