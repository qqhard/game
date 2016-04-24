package crazy.action;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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

import crazy.dao.UserRepository;
import crazy.vo.Entry;
import crazy.vo.Game;
import crazy.vo.User;

@RestController
@RequestMapping("excel")
public class ExcelAction {
	@Autowired
	private MongoTemplate mongo;

	@Autowired
	private UserRepository userRepository;

	@RequestMapping(value = "{gamename}", method = RequestMethod.GET)
	public Object get(@PathVariable("gamename") String gamename, HttpServletResponse res) throws IOException {
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
		
		HSSFWorkbook workbook = new HSSFWorkbook();
		try {
			createEntryExcel(entrys,users,workbook);
		} catch (IOException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		ByteArrayOutputStream out = new ByteArrayOutputStream();
		try {
			workbook.write(out);
		} catch (IOException e1) {
			e1.printStackTrace();
		} finally{
			workbook.close();
		}
	
		HttpHeaders headers = new HttpHeaders();  
	    headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);  
	    headers.setContentDispositionFormData("attachment", gamename+".xls");
	   
		return new ResponseEntity<byte[]>(out.toByteArray(),  
			                                  headers, HttpStatus.CREATED);
	}


	private void createEntryExcel(List<Entry> entrys, List<User> users, HSSFWorkbook workbook) throws IOException {
		Map<String, User> map = users.stream().collect(Collectors.toMap(User::getUsername, e -> e));

	
		// 获取参数个数作为excel列数
		int columeCount = 5;

		HSSFSheet sheet = workbook.createSheet("参赛者");
		// 创建第一栏
		HSSFRow headRow = sheet.createRow(0);
		String[] titleArray = { "用户名", "姓名", "学号", "邮箱", "电话" };
		for (int m = 0; m <= columeCount - 1; m++) {
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
		// 写入数据
		for (Entry entry : entrys) {
			// logger.info("写入一行");
			HSSFRow row = sheet.createRow(index + 1);
			for (int n = 0; n < columeCount; n++)
				row.createCell(n);
			User user = map.get(entry.getUsername());
			row.getCell(0).setCellValue(entry.getUsername());
			row.getCell(1).setCellValue(user.getSociolname());
			row.getCell(2).setCellValue(user.getStudentid());
			row.getCell(3).setCellValue(user.getEmail());
			row.getCell(4).setCellValue(user.getPhone());
			index++;
		}
	}
}
