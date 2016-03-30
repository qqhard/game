package crazy.form;

import crazy.vo.Message;

public class MessageForm {
	private String recver;
	private String text; 
	
	public Message update(Message msg){
		msg.setRecver(recver);
		msg.setText(text);
		msg.setReadTime(0);
		msg.setSendTime(System.currentTimeMillis());
		return msg;	
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
