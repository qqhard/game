package crazy.form;

import org.hibernate.validator.constraints.NotBlank;

public class TeamEntryForm {
	@NotBlank
	private String teamid;

	
	public String getTeamid() {
		return teamid;
	}
	public void setTeamid(String teamid) {
		this.teamid = teamid;
	}
	
}
