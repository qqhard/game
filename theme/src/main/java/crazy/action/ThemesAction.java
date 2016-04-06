package crazy.action;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import crazy.dao.ThemeRepository;

@RestController
@RequestMapping(value = "/theme/themes")
public class ThemesAction {
	@Autowired
	private ThemeRepository themeRepository;
	
	@RequestMapping(method = RequestMethod.GET)
	public Object get() {
		return themeRepository.findAll();
	}

}
