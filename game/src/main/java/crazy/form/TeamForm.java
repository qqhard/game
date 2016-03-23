package crazy.form;

import crazy.vo.Team;

public class TeamForm {
	private String enname;
	private String cnname;
	private String info;
	private int num;
	
	public Team update(Team team){
		team.setCnname(cnname);
		team.setEnname(enname);
		team.setNum(num);
		team.setInfo(info);
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
	public int getNum() {
		return num;
	}
	public void setNum(int num) {
		this.num = num;
	}

	public String getInfo() {
		return info;
	}

	public void setInfo(String info) {
		this.info = info;
	}
	
}
