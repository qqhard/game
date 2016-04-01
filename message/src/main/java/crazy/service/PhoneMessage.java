package crazy.service;

import java.util.HashMap;
import java.util.Map;

import org.json.JSONObject;

import com.taobao.api.ApiException;
import com.taobao.api.DefaultTaobaoClient;
import com.taobao.api.TaobaoClient;
import com.taobao.api.request.AlibabaAliqinFcSmsNumSendRequest;
import com.taobao.api.response.AlibabaAliqinFcSmsNumSendResponse;

public class PhoneMessage {
	@SuppressWarnings({ "unused", "serial" })
	private static HashMap<String,String> map = new HashMap<String,String>(){{
		put("time","SMS_6420108");
		put("place","SMS_6450184");
		put("remind","SMS_7205107");
		put("notice","SMS_7170148");
	}};
	private static void aliSend(String phones,String template,String text){
		TaobaoClient client = new DefaultTaobaoClient("http://gw.api.taobao.com/router/rest", "23330502", "f2f879fd712b0aa707815e6487d7b509");
		AlibabaAliqinFcSmsNumSendRequest req = new AlibabaAliqinFcSmsNumSendRequest();
		req.setSmsType("normal");
		req.setSmsFreeSignName("校园赛事");
		req.setSmsParam(text);
		req.setRecNum(phones);
		req.setSmsTemplateCode(template);
		try {
			AlibabaAliqinFcSmsNumSendResponse response = client.execute(req);
			System.out.println(response.getResult());
		} catch (ApiException e) {
			e.printStackTrace();
		}
	}
	
	public static void send(String phones,String type,Map<String,String> params){
		String template = map.get(type);
		String text = (new JSONObject(params)).toString();
		if(template != null){
			aliSend(phones,template,text);
		}
	}

}
