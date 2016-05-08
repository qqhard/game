package crazy.form;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.validator.constraints.NotBlank;

import crazy.vo.Team;
import crazy.vo.UserDefineForm;

public class TeamForm {
	@NotBlank
	private String enname;
	@NotBlank
	private String cnname;
	@NotBlank
	private String gamename;
	@NotBlank
	private String identity;
	@NotBlank
	private String info;
	
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
	
	public Team update(Team team){
		team.setCnname(cnname);
		team.setEnname(enname);
		team.setIdentity(identity);
		team.setNowNum(1);
		team.setInfo(info);
		team.setEntryed(false);
		team.setFormList(getUserDefindFormList());
		team.setApplyTime(System.currentTimeMillis());
		return team;
	}

	public String getEnname() {
		return enname;
	}

	public void setEnname(String enname) {
		this.enname = enname;
	}

	public String getCnname() {
		return cnname;
	}

	public void setCnname(String cnname) {
		this.cnname = cnname;
	}

	public String getIdentity() {
		return identity;
	}

	public void setIdentity(String identity) {
		this.identity = identity;
	}

	public String getInfo() {
		return info;
	}

	public void setInfo(String info) {
		this.info = info;
	}

	public String getGamename() {
		return gamename;
	}

	public void setGamename(String gamename) {
		this.gamename = gamename;
	}

	public String getForms() {
		return forms;
	}

	public void setForms(String forms) {
		this.forms = forms;
	}


	
	
}
