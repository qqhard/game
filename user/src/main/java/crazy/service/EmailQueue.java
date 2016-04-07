package crazy.service;

import java.util.concurrent.LinkedBlockingQueue;

/**
 * Created by g on 4/1/16.
 */
public class EmailQueue {
    private static LinkedBlockingQueue<Runnable> queue = new LinkedBlockingQueue<>();

    public static Runnable pop() {
        try {
            return queue.take();
        } catch (InterruptedException e) {
            e.printStackTrace();
            return null;
        }
    }

    public static void push(String to, String title, String body) {
        try {
            queue.put(new EmailSender(to, title, body));
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

}
