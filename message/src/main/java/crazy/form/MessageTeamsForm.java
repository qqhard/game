package crazy.form;

import crazy.vo.MessageRecord;

public class MessageTeamsForm {
	private String gamename;
	private String sender;
	private String teams;
	private String text;
	
	public MessageRecord getMessageRecord(){
		MessageRecord record = new MessageRecord();
		record.setBody(text);
		record.setTitle(gamename+" messages");
		record.setGamename(gamename);
		record.setSender(sender);
		record.setSendtime(System.currentTimeMillis());
		return record;
	}
	
	public String getGamename() {
		return gamename;
	}
	public void setGamename(String gamename) {
		this.gamename = gamename;
	}
	public String getSender() {
		return sender;
	}
	public void setSender(String sender) {
		this.sender = sender;
	}

	public String getTeams() {
		return teams;
	}

	public void setTeams(String teams) {
		this.teams = teams;
	}

	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	
}
