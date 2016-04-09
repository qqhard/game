package crazy.form;

public class GameEditForm {

	public static class GameTime {
		private String gameTime;

		public String getGameTime() {
			return gameTime;
		}

		public void setGameTime(String gameTime) {
			this.gameTime = gameTime;
		}

	}

	public static class GamePlace {
		private String gamePlace;

		public String getGamePlace() {
			return gamePlace;
		}

		public void setGamePlace(String gamePlace) {
			this.gamePlace = gamePlace;
		}

	}

	public static class AllTime {
		private long startTime;
		private long dueTime;
		private long endTime;

		public long getDueTime() {
			return dueTime;
		}

		public void setDueTime(long dueTime) {
			this.dueTime = dueTime;
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

	}

}
