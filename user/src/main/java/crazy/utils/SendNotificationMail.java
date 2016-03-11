package crazy.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Component;


/**
 * Created by LackOfDream on 12/21/15.
 */
@Component
public class SendNotificationMail implements Runnable {
    @Autowired
    private JavaMailSenderImpl mailSender;
    private SimpleMailMessage message;

    public SendNotificationMail() {
        this.message = new SimpleMailMessage();
    }

    public SendNotificationMail(SendNotificationMail mail) {
        this.mailSender = mail.mailSender;
        this.message = new SimpleMailMessage(mail.message);
    }

    public void setMailInfo(String toMail, String name, String idNumber) {
        this.message.setSubject("新生杯报名成功");
        this.message.setFrom("396731979@qq.com");
        this.message.setTo(toMail);
        this.message.setText(name + " (" + idNumber + ") 已成功注" +
                "册2015年ACM新生杯程序设计竞赛。\n" +
                "请确认姓名学号无误，如有错误，" +
                "请登录 http://acm.nphard.me 修改。\n" +
                "热身赛时间为12月26日9点-11点，正式赛时间" +
                "为12月26日13点-17点。\n如有问题，请拨打 13176800982");
    }

    @Override
    public void run() {
        try {
            System.out.println("===============Starting===================");
            System.out.println("Send to: " + this.message.getTo()[0]);
            this.mailSender.send(this.message);
            System.out.println("==================Sent=====================");
        } catch (MailException e) {
            e.printStackTrace();
        }
    }
}
