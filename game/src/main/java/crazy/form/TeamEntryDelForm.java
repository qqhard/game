package crazy.form;

import java.util.ArrayList;
import java.util.List;

public class TeamEntryDelForm {
	private String teams;
	private String gamename;
	
	public List<String> getTeamids(){
		ArrayList<String> ret = new ArrayList<String>();
		if(teams!=null && !"".equals(teams)){
			for(String part: teams.split(",")){
				ret.add(part);
			}
		}
		return ret;
	}
	
	
	public String getTeams() {
		return teams;
	}


	public void setTeams(String teams) {
		this.teams = teams;
	}


	public String getGamename() {
		return gamename;
	}

	public void setGamename(String gamename) {
		this.gamename = gamename;
	}
}
