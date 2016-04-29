package crazy.form;

import java.util.Map;

import crazy.vo.MessageRecord;

public class PhoneUsersForm {
	private String users;
	private String type;
	private Map<String, String> text;
	private String sender;
	private String gamename;

	public MessageRecord update(MessageRecord record) {
		record.setTitle(gamename + "的群发短信");
		record.setGamename(gamename);

		record.setSender(sender);
		record.setSendtime(System.currentTimeMillis());
		return record;
	}

	public String getUsers() {
		return users;
	}

	public void setUsers(String users) {
		this.users = users;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Map<String, String> getText() {
		return text;
	}

	public void setText(Map<String, String> text) {
		this.text = text;
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
