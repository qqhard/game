package crazy.form;

public class GameEditForm {
	public static class DueTime{
		private long dueTime;
		public long getDueTime() {
			return dueTime;
		}

		public void setDueTime(long dueTime) {
			this.dueTime = dueTime;
		}
	}
	public static class GameTime{
		private String gameTime;

		public String getGameTime() {
			return gameTime;
		}

		public void setGameTime(String gameTime) {
			this.gameTime = gameTime;
		}
		
	
	}
	public static class GamePlace{
		private String gamePlace;

		public String getGamePlace() {
			return gamePlace;
		}

		public void setGamePlace(String gamePlace) {
			this.gamePlace = gamePlace;
		}
	
	}
	
	public static class StartTime{
		private long startTime;
		public long getStartTime() {
			return startTime;
		}

		public void setStartTime(long startTime) {
			this.startTime = startTime;
		}
	
	}
	
	public static class EndTime{
		private long endTime;
		public long getEndTime() {
			return endTime;
		}

		public void setEndTime(long endTime) {
			this.endTime = endTime;
		}
	
	}
	
	
}