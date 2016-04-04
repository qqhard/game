package crazy.form;

import crazy.vo.Rating;

public class RatingForm {
	private String gamename;
	private int score;

	public Rating update(Rating rating) {
		rating.setGamename(gamename);
		rating.setScore(score);
		return rating;
	}

	public String getGamename() {
		return gamename;
	}

	public void setGamename(String gamename) {
		this.gamename = gamename;
	}

	public int getScore() {
		return score;
	}

	public void setScore(int score) {
		this.score = score;
	}
}
