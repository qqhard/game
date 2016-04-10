package crazy.service;

import java.util.Map;

public class PhoneSendTask implements Runnable {
	private String phones;
	private String type;
	private Map<String, String> text;
	public PhoneSendTask(String phones,String type,Map<String,String> text){
		this.phones = phones;
		this.type = type;
		this.text = text;
	}
	@Override
	public void run() {
		PhoneMessage.send(phones, type, text);
	}
}
