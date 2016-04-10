package crazy.common;

public class LockPrefix {
	public static final String TEAM = "t_";
	public static final String GAME = "g_";
	public static final String USER = "u_";
	public static final String ENTRY = "e_";
	public static String lockTeam(String teamid){
		return (TEAM+teamid.substring(teamid.length()-4));
	}
	public static String lockTeamEntry(String gamename){
		return (GAME+gamename.substring(0,4));
	}
}
