package crazy.form;

import java.util.ArrayList;
import java.util.List;

import crazy.vo.Message;
import crazy.vo.MessageRecord;

public class MessagesForm {
	private String gamename;
	private String sender;
	private String users;
	private String text;
	
	public MessageRecord getMessageRecord(){
		MessageRecord record = new MessageRecord();
		record.setBody(text);
		record.setTitle(gamename+" messages");
		record.setGamename(gamename);
		record.setUsers(users);
		record.setSender(sender);
		return record;
	}
	
	public List<Message> getMessages(){
		List<Message> ret = new ArrayList<Message>();
		String[] parts = users.split(",");
		for(String part: parts){
			Message msg = new Message();
			msg.setSender(sender);
			msg.setRecver(part);
			msg.setSendTime(System.currentTimeMillis());
			msg.setReadTime(0);
			msg.setText(text);
			ret.add(msg);
		}
		return ret;
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
	
	public String getUsers() {
		return users;
	}

	public void setUsers(String users) {
		this.users = users;
	}

	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	
}
