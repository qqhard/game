package crazy;

import org.junit.Test;

import com.taobao.api.ApiException;
import com.taobao.api.DefaultTaobaoClient;
import com.taobao.api.TaobaoClient;
import com.taobao.api.request.AlibabaAliqinFcSmsNumSendRequest;
import com.taobao.api.response.AlibabaAliqinFcSmsNumSendResponse;

public class TestPhone {
	@Test
	public void test() throws ApiException {
		TaobaoClient client = new DefaultTaobaoClient("http://gw.api.taobao.com/router/rest", "23330502", "f2f879fd712b0aa707815e6487d7b509");
		AlibabaAliqinFcSmsNumSendRequest req = new AlibabaAliqinFcSmsNumSendRequest();
		req.setSmsType("normal");
		req.setSmsFreeSignName("身份验证");
		req.setSmsParam("{'code':'逗比','product':'crazy_game赛事平台'}");
		req.setRecNum("18369183362,15588376937");
		req.setSmsTemplateCode("SMS_6390093");
		AlibabaAliqinFcSmsNumSendResponse response = client.execute(req);
	}
}
