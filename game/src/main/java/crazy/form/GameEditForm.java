package crazy.form;

import org.hibernate.validator.constraints.NotBlank;

import crazy.vo.Game;

public class GameEditForm {
	@NotBlank()
	private String gamename;
	@NotBlank()
	private String briefinfo;
	@NotBlank()
	private String gameTime;
	@NotBlank()
	private String gamePlace;
	private String forms;
	private String limits;

	public void update(Game game) {
		game.setDeled(false);
		game.setBriefinfo(briefinfo);
		game.setGameTime(gameTime);
		game.setGamePlace(gamePlace);
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

	public String getForms() {
		return forms;
	}

	public void setForms(String forms) {
		this.forms = forms;
	}

	public String getLimits() {
		return limits;
	}

	public void setLimits(String limits) {
		this.limits = limits;
	}

}
