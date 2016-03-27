package crazy.form;

import java.util.ArrayList;
import java.util.List;

import crazy.vo.TeamEntry;
import crazy.vo.UserDefineForm;

public class TeamEntryForm {
	private String gamename;
	private String username;
	private String teamid;
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

	public String getGamename() {
		return gamename;
	}
	public void setGamename(String gamename) {
		this.gamename = gamename;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getTeamid() {
		return teamid;
	}
	public void setTeamid(String teamid) {
		this.teamid = teamid;
	}
	public String getForms() {
		return forms;
	}
	public void setForms(String forms) {
		this.forms = forms;
	}
	
}
