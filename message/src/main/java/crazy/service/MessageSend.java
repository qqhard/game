package crazy.service;

import java.util.concurrent.LinkedBlockingQueue;

public class MessageSend {
	private static LinkedBlockingQueue<Runnable> queue = new LinkedBlockingQueue<Runnable>();

	public static Runnable get(){
		try {
			return queue.take();
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	
	public static void sendByEmail(String addr,String title,String body){
		try {
			queue.put(new EmailSendTask(addr, title, body));
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
