package crazy.form;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.validator.constraints.NotBlank;

import crazy.vo.Game;
import crazy.vo.UserDefineForm;

public class GameForm {
	@NotBlank()
	private String gamename;
	@NotBlank()
	private String gametitle;
	@NotBlank()
	private String briefinfo;
	@NotBlank()
	private String gametime;
	@NotBlank()
	private String gameplace;
	private int provinceid;
	private int collegeid;
	private int instituteid;
	private String provincename;
	private String collegename;
	private String institutename;
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
	public Game update(Game game){
		game.setGamename(gamename);
		game.setGametitle(gametitle);
		game.setBriefinfo(briefinfo);
		game.setGametime(gametime);
		game.setGameplace(gameplace);
		game.setProvinceid(provinceid);
		game.setProvincename(provincename);
		game.setCollegeid(collegeid);
		game.setCollegename(collegename);
		game.setInstituteid(instituteid);
		game.setInstitutename(institutename);
		game.setFormList(getUserDefindFormList());
		return game;
	}
	public String getGamename() {
		return gamename;
	}
	public void setGamename(String gamename) {
		this.gamename = gamename;
	}
	public String getGametitle() {
		return gametitle;
	}
	public void setGametitle(String gametitle) {
		this.gametitle = gametitle;
	}
	public String getBriefinfo() {
		return briefinfo;
	}
	public void setBriefinfo(String briefinfo) {
		this.briefinfo = briefinfo;
	}
	public String getGametime() {
		return gametime;
	}
	public void setGametime(String gametime) {
		this.gametime = gametime;
	}
	public String getGameplace() {
		return gameplace;
	}
	public void setGameplace(String gameplace) {
		this.gameplace = gameplace;
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
	public String getUserDefineForm() {
		return userDefineForm;
	}
	public void setUserDefineForm(String userDefineForm) {
		this.userDefineForm = userDefineForm;
	}
	public String getProvincename() {
		return provincename;
	}
	public void setProvincename(String provincename) {
		this.provincename = provincename;
	}
	public String getCollegename() {
		return collegename;
	}
	public void setCollegename(String collegename) {
		this.collegename = collegename;
	}
	public String getInstitutename() {
		return institutename;
	}
	public void setInstitutename(String institutename) {
		this.institutename = institutename;
	}
}
