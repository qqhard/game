package crazy.action;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
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

import crazy.config.Common;
import crazy.form.HtmlForm;

@RestController
@RequestMapping(value = "/theme")
public class ThemeAction {
	@RequestMapping(value = "{themename}/{gamename}", method = RequestMethod.GET)
	public Object theme(@PathVariable("themename") String themename, @PathVariable("gamename") String gamename,
			ModelAndView model) {

		File page = new File(Common.GameWebPage()+gamename+"/index.html");
		File theme = new File(Common.GameWebPage()+gamename+"/theme.txt");
		String html = "";
		if(page.exists() && theme.exists() && getText(theme).equals(themename)){
			html = getText(page);
			html = append(html);
		}else{
			File temp = new File(Common.GameWebStatic()+themename+"/index.htm");
			if(temp.exists()){
				html = getText(temp);
			}
		}
		model.addObject("context", html);
		model.setViewName("empty");
		return model;
	}
	
	private String getText(File file){
		FileReader fileReader = null;
		BufferedReader bufferReader = null;
		try {
			fileReader = new FileReader(file);
			bufferReader = new BufferedReader(fileReader);
			StringBuilder sb = new StringBuilder();
			bufferReader.lines().forEach(e -> sb.append(e+"\n"));
			return sb.toString();
		} catch (IOException e) {
			return "";
		} finally {
			try {
				bufferReader.close();
			} catch (IOException e) {
				return "";
			}
		}
	}

	@ResponseBody
	@RequestMapping(value = "{themename}/{gamename}", method = RequestMethod.POST)
	public Object save(@Valid HtmlForm form, BindingResult bindingResult, @PathVariable("themename") String themename,
			@PathVariable("gamename") String gamename) {

		
		String html = filter(form.getContext());
		html = "<!DOCTYPE html>"+html;

		File dir = new File(Common.GameWebPage() + gamename);
		if (!dir.exists())
			dir.mkdir();
		File file = new File(Common.GameWebPage() + gamename + "/index.html");
		if (file.exists())
			file.delete();
		dumps(themename, Common.GameWebPage() + gamename + "/theme.txt");
		dumps(html, Common.GameWebPage() + gamename + "/index.html");
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
		doc.getElementsByAttributeValue("class", "veditdiv_control_ico").remove();
		doc.getElementsByAttributeValue("class", "veditdiv_control_board").remove();
		doc.getElementsByAttributeValue("src", "http://valseek.com/static/vEdit.js").remove();
		String result = doc.html();
		return result;
	}
	
	private String append(String html){
		Document doc = Jsoup.parse(html);
		doc.body().append("<script type=\"text/javascript\" src=\"http://valseek.com/static/vEdit.js\"></script>");
		return doc.html();
	}
}
