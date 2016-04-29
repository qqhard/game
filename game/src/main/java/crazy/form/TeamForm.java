package crazy.form;

import org.hibernate.validator.constraints.NotBlank;

import crazy.vo.Team;

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
	
	public Team update(Team team){
		team.setCnname(cnname);
		team.setEnname(enname);
		team.setIdentity(identity);
		team.setNowNum(1);
		team.setInfo(info);
		team.setEntryed(false);
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


	
	
}
