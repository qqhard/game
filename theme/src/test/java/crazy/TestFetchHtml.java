package crazy;

import java.io.IOException;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.junit.Test;

public class TestFetchHtml {
	@Test
	public void test() throws IOException{
		Document doc = Jsoup.connect("https://www.gupshup.io/developer/home").get();
		String result = doc.html();
		System.out.println(result);
	}
}
