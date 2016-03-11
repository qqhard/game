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
	private String briefinfo;
	private String gameTime;
	private String gamePlace;
	private int startTime;
	private int endTime;
	private boolean accepted;
	private boolean deled;
	public boolean isDeled() {
		return deled;
	}
	public void setDeled(boolean deled) {
		this.deled = deled;
	}
	private List<String> forms;
	private List<String> limits;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getOwner() {
		return owner;
	}
	public void setOwner(String owner) {
		this.owner = owner;
	}
	public String getGamename() {
		return gamename;
	}
	public void setGamename(String gamename) {
		this.gamename = gamename;
	}
	public String getBriefinfo() {
		return briefinfo;
	}
	public void setBriefinfo(String briefinfo) {
		this.briefinfo = briefinfo;
	}
	public String getGameTime() {
		return gameTime;
	}
	public void setGameTime(String gameTime) {
		this.gameTime = gameTime;
	}
	public String getGamePlace() {
		return gamePlace;
	}
	public void setGamePlace(String gamePlace) {
		this.gamePlace = gamePlace;
	}
	public int getStartTime() {
		return startTime;
	}
	public void setStartTime(int startTime) {
		this.startTime = startTime;
	}
	public int getEndTime() {
		return endTime;
	}
	public void setEndTime(int endTime) {
		this.endTime = endTime;
	}
	public boolean isAccepted() {
		return accepted;
	}
	public void setAccepted(boolean accepted) {
		this.accepted = accepted;
	}
	public List<String> getForms() {
		return forms;
	}
	public void setForms(List<String> forms) {
		this.forms = forms;
	}
	public List<String> getLimits() {
		return limits;
	}
	public void setLimits(List<String> limits) {
		this.limits = limits;
	}
	
}
