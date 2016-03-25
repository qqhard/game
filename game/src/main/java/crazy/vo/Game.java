package crazy.vo;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="game") 
public class Game {
	@Id
    private String id;
	@Indexed(unique = true) 
	private String gamename;
	@Indexed(unique = false) 
	private String owner;
	private String gametitle;
	private String briefinfo;
	private String gametime;
	private String gameplace;
	private int provinceid;
	private String provincename;
	private int collegeid;
	private String collegename;
	private int instituteid;
	private String institutename;
	private int teamSign;
	private int teamNum;
	private long submitTime;
	private long acceptTime;
	private long startTime;
	private long endTime;
	private long step;
	private boolean deled;
	private List<UserDefineForm> formList;
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
	public String getOwner() {
		return owner;
	}
	public void setOwner(String owner) {
		this.owner = owner;
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
	public String getProvincename() {
		return provincename;
	}
	public void setProvincename(String provincename) {
		this.provincename = provincename;
	}
	public int getCollegeid() {
		return collegeid;
	}
	public void setCollegeid(int collegeid) {
		this.collegeid = collegeid;
	}
	public String getCollegename() {
		return collegename;
	}
	public void setCollegename(String collegename) {
		this.collegename = collegename;
	}
	public int getInstituteid() {
		return instituteid;
	}
	public void setInstituteid(int instituteid) {
		this.instituteid = instituteid;
	}
	public String getInstitutename() {
		return institutename;
	}
	public void setInstitutename(String institutename) {
		this.institutename = institutename;
	}
	public long getSubmitTime() {
		return submitTime;
	}
	public void setSubmitTime(long submitTime) {
		this.submitTime = submitTime;
	}
	public long getAcceptTime() {
		return acceptTime;
	}
	public void setAcceptTime(long acceptTime) {
		this.acceptTime = acceptTime;
	}
	public long getStartTime() {
		return startTime;
	}
	public void setStartTime(long startTime) {
		this.startTime = startTime;
	}
	public long getEndTime() {
		return endTime;
	}
	public void setEndTime(long endTime) {
		this.endTime = endTime;
	}
	public long getStep() {
		return step;
	}
	public void setStep(long step) {
		this.step = step;
	}
	public boolean isDeled() {
		return deled;
	}
	public void setDeled(boolean deled) {
		this.deled = deled;
	}
	public List<UserDefineForm> getFormList() {
		return formList;
	}
	public void setFormList(List<UserDefineForm> formList) {
		this.formList = formList;
	}
	public int getTeamSign() {
		return teamSign;
	}
	public void setTeamSign(int teamSign) {
		this.teamSign = teamSign;
	}
	public int getTeamNum() {
		return teamNum;
	}
	public void setTeamNum(int teamNum) {
		this.teamNum = teamNum;
	}
	
}
