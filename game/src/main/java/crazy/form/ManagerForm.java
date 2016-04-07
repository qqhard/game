package crazy.form;

import crazy.vo.Manager;

public class ManagerForm {
	private String gamename;
	private String username;
	
	public Manager update(Manager manager){
		manager.setGamename(gamename);
		manager.setUsername(username);
		return manager;
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
	
}
