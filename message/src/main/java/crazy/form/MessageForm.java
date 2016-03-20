package crazy.form;

import crazy.vo.Message;

public class MessageForm {
	private String sender;
	private String recver;
	private String text; 
	
	public Message update(Message msg){
		msg.setSender(sender);
		msg.setRecver(recver);
		msg.setSendTime(System.currentTimeMillis());
		return msg;	
	}
	
	public String getSender() {
		return sender;
	}
	public void setSender(String sender) {
		this.sender = sender;
	}
	public String getRecver() {
		return recver;
	}
	public void setRecver(String recver) {
		this.recver = recver;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}

}
