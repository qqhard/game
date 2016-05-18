package crazy.action;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import crazy.dao.CollegeRepository;
import crazy.dao.InstituteRepository;
import crazy.dao.ProvinceRepository;
import crazy.dao.TeamRepository;
import crazy.dao.UserRepository;
import crazy.vo.College;
import crazy.vo.Entry;
import crazy.vo.Game;
import crazy.vo.Group;
import crazy.vo.Institute;
import crazy.vo.Province;
import crazy.vo.Team;
import crazy.vo.User;
import crazy.vo.UserDefineForm;

@RestController
@RequestMapping("excel")
public class ExcelAction {
	@Autowired
	private MongoTemplate mongo;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private TeamRepository teamRepository;

	@Autowired
	private InstituteRepository instituteRepository;
	
	@Autowired
	private CollegeRepository collegeRepository;

	@Autowired
	private ProvinceRepository provinceRepository;

	@RequestMapping(value = "{gamename}/individual", method = RequestMethod.GET)
	public Object getIndividual(@PathVariable("gamename") String gamename, HttpServletResponse res) throws IOException {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		Query query = new Query(Criteria.where("gamename").is(gamename).and("owner").is(username));
		boolean hasAuth = mongo.exists(query, Game.class);
		if (!hasAuth)
			return new ResponseEntity<String>("仅赛事举办者拥有权限", HttpStatus.FORBIDDEN);

		query = new Query(Criteria.where("gamename").is(gamename).and("deled").is(false));
		List<Entry> entrys = mongo.find(query, Entry.class);
		List<String> usernames = entrys.stream().map(e -> e.getUsername()).collect(Collectors.toList());
		query = new Query(Criteria.where("username").in(usernames));
		List<User> users = userRepository.findByUsernameInList(usernames);
		List<Integer> provinceIds = users.stream().map(e -> e.getProvinceid()).filter(e -> e != null).distinct()
				.collect(Collectors.toList());
		List<Integer> collegeIds = users.stream().map(e -> e.getCollegeid()).filter(e -> e != null).distinct()
				.collect(Collectors.toList());
		List<Integer> instituteIds = users.stream().map(e -> e.getInstituteid()).filter(e -> e != null).distinct()
				.collect(Collectors.toList());
		
		List<Province> provinces = provinceRepository.findByInProvinceids(provinceIds);
		List<College> colleges = collegeRepository.findByInCollegeids(collegeIds);
		List<Institute> institutes = instituteRepository.findByInInstituteids(instituteIds);
		Map<Integer,String> provinceIdToName = provinces.stream().collect(Collectors.toMap(e->e.getProvinceid(), e->e.getName()));
		Map<Integer,String> collegeIdToName = colleges.stream().collect(Collectors.toMap(e->e.getCollegeid(), e->e.getCollegename()));
		Map<Integer,String> instituteIdToName = institutes.stream().collect(Collectors.toMap(e->e.getInstituteid(), e->e.getInstitutename()));
		
		String[] titleArray = { "用户名", "姓名", "学号", "邮箱", "电话", "省份", "学校", "学院" };
		HashMap<String, User> usernameToUserMap = new HashMap<String, User>();
		users.forEach(user -> usernameToUserMap.put(user.getUsername(), user));
		HashMap<String, String[]> map = new HashMap<>();

		entrys.forEach(entry -> {
			String[] tmp = new String[8];
			User user = usernameToUserMap.get(entry.getUsername());
			tmp[0] = entry.getUsername();
			tmp[1] = user.getSociolname();
			tmp[2] = user.getStudentid();
			tmp[3] = user.getEmail();
			tmp[4] = user.getPhone();
			tmp[5] = provinceIdToName.get(user.getProvinceid());
			tmp[6] = collegeIdToName.get(user.getCollegeid());
			tmp[7] = instituteIdToName.get(user.getInstituteid());
			map.put(entry.getId(), tmp);
		});

		query = new Query(Criteria.where("gamename").is(gamename));
		List<Group> groups = mongo.find(query, Group.class);

		HSSFWorkbook workbook = new HSSFWorkbook();

		List<String[]> context = map.values().stream().collect(Collectors.toList());
		addSheet("全部参赛者", titleArray, context, workbook);

		for (Group group : groups) {
			context = group.getEntryids().stream().map(e -> map.get(e)).filter(e -> e != null)
					.collect(Collectors.toList());
			if (context.size() > 0)
				addSheet(group.getGroupname(), titleArray, context, workbook);
		}

		ByteArrayOutputStream out = new ByteArrayOutputStream();
		try {
			workbook.write(out);
		} catch (IOException e1) {
			e1.printStackTrace();
		} finally {
			workbook.close();
		}

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
		headers.setContentDispositionFormData("attachment", gamename + ".xls");

		return new ResponseEntity<byte[]>(out.toByteArray(), headers, HttpStatus.CREATED);
	}

	@RequestMapping(value = "{gamename}/team", method = RequestMethod.GET)
	public Object getTeam(@PathVariable("gamename") String gamename, HttpServletResponse res) throws IOException {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		Query query = new Query(Criteria.where("gamename").is(gamename).and("owner").is(username));
		Game game = mongo.findOne(query, Game.class);
		if (game == null)
			return new ResponseEntity<String>("仅赛事举办者拥有权限", HttpStatus.FORBIDDEN);

		query = new Query(Criteria.where("gamename").is(gamename).and("deled").is(false));
		List<Team> teams = teamRepository.findByGamenameAndEntryedAndDeled(gamename, true, false);
		// List<String> teamids =
		// teams.stream().map(e->e.getId()).collect(Collectors.toList());
		// List<Member> members =
		// memberRepository.findByTeamidsAndAccepted(teamids, true);
		// List<String> usernames =
		// members.stream().map(e->e.getUsername()).distinct().collect(Collectors.toList());
		// List<User> users = userRepository.findByUsernameInList(usernames);

		List<String> teamTitleList = Stream
				.of(Arrays.asList("英文名", "中文名", "拥有者", "队伍简介").stream(),
						game.getFormList().stream().map(e -> e.getName()))
				.flatMap(titles -> titles).collect(Collectors.toList());
		String[] teamTitles = (String[]) teamTitleList.toArray(new String[teamTitleList.size()]);

		HashMap<String, String[]> map = new HashMap<>();
		int col = 4 + game.getFormList().size();
		teams.forEach(team -> {
			String[] tmp = new String[col];
			tmp[0] = team.getEnname();
			tmp[1] = team.getCnname();
			tmp[2] = team.getOwner();
			tmp[3] = team.getInfo();
			int cnt = 4;
			for (UserDefineForm form : team.getFormList()) {
				tmp[cnt++] = form.getValue();
			}
			map.put(team.getId(), tmp);
		});

		query = new Query(Criteria.where("gamename").is(gamename));
		List<Group> groups = mongo.find(query, Group.class);

		HSSFWorkbook workbook = new HSSFWorkbook();

		List<String[]> context = map.values().stream().collect(Collectors.toList());
		addSheet("全部参赛队伍", teamTitles, context, workbook);

		for (Group group : groups) {
			context = group.getEntryids().stream().map(e -> map.get(e)).filter(e -> e != null)
					.collect(Collectors.toList());
			if (context.size() > 0)
				addSheet(group.getGroupname(), teamTitles, context, workbook);
		}

		ByteArrayOutputStream out = new ByteArrayOutputStream();
		try {
			workbook.write(out);
		} catch (IOException e1) {
			e1.printStackTrace();
		} finally {
			workbook.close();
		}

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
		headers.setContentDispositionFormData("attachment", gamename + ".xls");

		return new ResponseEntity<byte[]>(out.toByteArray(), headers, HttpStatus.CREATED);
	}

	private void addSheet(String name, String[] titleArray, List<String[]> context, HSSFWorkbook workbook) {
		HSSFSheet sheet = workbook.createSheet(name);
		// 创建第一栏
		int columeCount = titleArray.length;
		HSSFRow headRow = sheet.createRow(0);
		for (int m = 0; m < columeCount; m++) {
			HSSFCell cell = headRow.createCell(m);
			cell.setCellType(HSSFCell.CELL_TYPE_STRING);
			sheet.setColumnWidth(m, 6000);
			HSSFCellStyle style = workbook.createCellStyle();
			HSSFFont font = workbook.createFont();
			font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
			short color = HSSFColor.RED.index;
			font.setColor(color);
			style.setFont(font);
			// 填写数据
			cell.setCellStyle(style);
			cell.setCellValue(titleArray[m]);

		}
		int index = 0;

		for (String[] rowContext : context) {
			HSSFRow row = sheet.createRow(index + 1);
			for (int n = 0; n < columeCount; n++) {
				row.createCell(n);
				row.getCell(n).setCellValue(rowContext[n]);
			}
			index++;
		}
	}

}
