package crazy.service;

import com.aliyuncs.DefaultAcsClient;
import com.aliyuncs.IAcsClient;
import com.aliyuncs.dm.model.v20151123.SingleSendMailRequest;
import com.aliyuncs.dm.model.v20151123.SingleSendMailResponse;
import com.aliyuncs.exceptions.ClientException;
import com.aliyuncs.exceptions.ServerException;
import com.aliyuncs.profile.DefaultProfile;
import com.aliyuncs.profile.IClientProfile;
import org.springframework.stereotype.Service;

public class EmailSender implements Runnable{
    private String title;
    private String body;
    private String addr;
    public EmailSender(String addr,String title,String body){
        this.addr = addr;
        this.body = body;
        this.title = title;
    }
    @Override
    public void run() {
        IClientProfile profile = DefaultProfile.getProfile("cn-hangzhou", "bsR8ExAjBhVoCJpz", "AO1L9hnVnDnELDqE2CHYKYXcN9b9RR");
        IAcsClient client = new DefaultAcsClient(profile);
        SingleSendMailRequest request = new SingleSendMailRequest();
        try {
            request.setAccountName("game@nphard.cn");
            request.setAddressType(0);
            request.setTagName("game");
            request.setReplyToAddress(true);
            request.setToAddress(addr);
            request.setSubject(title);
            request.setHtmlBody(body);
            @SuppressWarnings("unused")
            SingleSendMailResponse httpResponse = client.getAcsResponse(request);
        } catch (ServerException e) {
            e.printStackTrace();
        }
        catch (ClientException e) {
            e.printStackTrace();
        }
    }
}
