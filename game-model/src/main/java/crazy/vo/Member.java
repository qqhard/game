package crazy.vo;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="member") 
public class Member {
	@Id
	private String id;
	private String teamid;
	private String username;
	private Boolean accepted;
	private Boolean applyed;
	private Boolean invited;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getTeamid() {
		return teamid;
	}
	public void setTeamid(String teamid) {
		this.teamid = teamid;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public Boolean getAccepted() {
		return accepted;
	}
	public void setAccepted(Boolean accepted) {
		this.accepted = accepted;
	}
	public Boolean getApplyed() {
		return applyed;
	}
	public void setApplyed(Boolean applyed) {
		this.applyed = applyed;
	}
	public Boolean getInvited() {
		return invited;
	}
	public void setInvited(Boolean invited) {
		this.invited = invited;
	}
	
}
