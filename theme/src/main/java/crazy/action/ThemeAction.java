package crazy.action;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

import javax.validation.Valid;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import crazy.form.HtmlForm;

@RestController
@RequestMapping(value = "/theme")
public class ThemeAction {
	@RequestMapping(value = "{themename}/{gamename}", method = RequestMethod.GET)
	public Object theme(@PathVariable("themename") String themename, @PathVariable("gamename") String gamename,
			ModelAndView model) {
		model.addObject("gamename", gamename);
		model.setViewName(themename);
		return model;
	}

	@ResponseBody
	@RequestMapping(value = "{themename}/{gamename}", method = RequestMethod.POST)
	public Object save(@Valid HtmlForm form, BindingResult bindingResult, @PathVariable("themename") String themename,
			@PathVariable("gamename") String gamename) {

		
		String html = filter(form.getContext());

		File dir = new File("/home/hard/Project/page/" + gamename);
		if (!dir.exists())
			dir.mkdir();
		File file = new File("/home/hard/Project/page/" + gamename + "/index.html");
		if (file.exists())
			file.delete();
		dumps(html, "/home/hard/Project/page/" + gamename + "/index.html");
		return html;
	}

	private boolean dumps(String html, String path) {
		FileWriter fileWritter = null;
		BufferedWriter bufferWritter = null;
		try {
			fileWritter = new FileWriter(new File(path));
			bufferWritter = new BufferedWriter(fileWritter);
			bufferWritter.write(html);
		} catch (IOException e) {
			return false;
		} finally {
			try {
				bufferWritter.close();
			} catch (IOException e) {
				return false;
			}
		}
		return true;
	}

	private String filter(String html) {
		Document doc = Jsoup.parse(html);
		doc.getElementsByAttributeValue("class", "veditdiv_control_board").remove();
		doc.getElementsByAttributeValue("src", "http://domain.com/static/veditdiv.js").remove();
		String result = doc.html();
		return result;
	}
}
