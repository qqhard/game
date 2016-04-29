package crazy.form;

import crazy.vo.MessageRecord;

public class EmailUsersForm {
	private String users;
	private String title;
	private String body;
	private String sender;
	private String gamename;

	public MessageRecord update(MessageRecord record) {
		record.setTitle(title);
		record.setGamename(gamename);
		record.setBody(body);
		record.setSender(sender);
		record.setSendtime(System.currentTimeMillis());
		return record;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getBody() {
		return body;
	}

	public void setBody(String body) {
		this.body = body;
	}

	public String getUsers() {
		return users;
	}

	public void setUsers(String users) {
		this.users = users;
	}

	public String getSender() {
		return sender;
	}

	public void setSender(String sender) {
		this.sender = sender;
	}

	public String getGamename() {
		return gamename;
	}

	public void setGamename(String gamename) {
		this.gamename = gamename;
	}

}
