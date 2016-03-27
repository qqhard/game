package crazy.vo;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="team_entry") 
public class TeamEntry {
	@Id
	private String id;
	private String gamename;
	private Boolean deled;
	private String teamCnname;
	private String teamEnname;
	private String teamInfo;
	private Integer teamNum;
	private List<String> users;
	private List<String> emails;
	private List<String> phones;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getGamename() {
		return gamename;
	}
	public void setGamename(String gamename) {
		this.gamename = gamename;
	}
	public Boolean getDeled() {
		return deled;
	}
	public void setDeled(Boolean deled) {
		this.deled = deled;
	}
	public String getTeamCnname() {
		return teamCnname;
	}
	public void setTeamCnname(String teamCnname) {
		this.teamCnname = teamCnname;
	}
	public String getTeamEnname() {
		return teamEnname;
	}
	public void setTeamEnname(String teamEnname) {
		this.teamEnname = teamEnname;
	}
	public String getTeamInfo() {
		return teamInfo;
	}
	public void setTeamInfo(String teamInfo) {
		this.teamInfo = teamInfo;
	}
	public Integer getTeamNum() {
		return teamNum;
	}
	public void setTeamNum(Integer teamNum) {
		this.teamNum = teamNum;
	}
	public List<String> getUsers() {
		return users;
	}
	public void setUsers(List<String> users) {
		this.users = users;
	}
	public List<String> getEmails() {
		return emails;
	}
	public void setEmails(List<String> emails) {
		this.emails = emails;
	}
	public List<String> getPhones() {
		return phones;
	}
	public void setPhones(List<String> phones) {
		this.phones = phones;
	}
	
}
