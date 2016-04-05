package crazy;

import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.List;

import org.apache.commons.io.IOUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.junit.Test;

public class TestTT {

	
	@Test
	public void test() throws IOException {
		File file = new File("/tmp/acm");
		FileReader reader = new FileReader(file);
		List<String> list = IOUtils.readLines(reader);
		String html = "";
		for(String s : list){
			html += s;
		}

		Document doc = Jsoup.parse(html);//解析HTML字符串返回一个Document实现
		
		doc.getElementsByAttributeValue("class", "veditdiv_control_board").remove();
		doc.getElementsByAttributeValue("src", "http://domain.com/static/veditdiv.js").remove();
		String result = doc.html();
		System.out.println(result);
	}
}
