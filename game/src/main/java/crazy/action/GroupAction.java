package crazy.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import crazy.dao.GroupRepository;
import crazy.dao.UserRepository;
import crazy.form.GroupForm;
import crazy.service.GameAuthService;
import crazy.vo.Entry;
import crazy.vo.Group;
import crazy.vo.User;

@RestController
public class GroupAction {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private GroupRepository groupRepository;

	@Autowired
	private MongoTemplate mongo;

	@Autowired
	private GameAuthService gameAuthService;

	@RequestMapping(value = "/groups/{gamename}", method = RequestMethod.GET)
	public Object gets(@PathVariable("gamename") String gamename) {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		boolean hasAuth = gameAuthService.checkOwnerOrManager(username, gamename);
		if (!hasAuth)
			return new ResponseEntity<String>(HttpStatus.FORBIDDEN);
		Query query = new Query(Criteria.where("gamename").is(gamename));
		List<Group.SimpleGroup> groups = mongo.find(query, Group.SimpleGroup.class, "group");
		return groups;
	}

	@RequestMapping(value = "/group/{gamename}/{groupid}", method = RequestMethod.GET)
	public Object get(@PathVariable("gamename") String gamename, @PathVariable("groupid") String groupid) {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		boolean hasAuth = gameAuthService.checkOwnerOrManager(username, gamename);
		if (!hasAuth)
			return new ResponseEntity<String>(HttpStatus.FORBIDDEN);
		Group group = groupRepository.findOne(new ObjectId(groupid));
		if (!group.getGamename().equals(gamename))
			return new ResponseEntity<String>(HttpStatus.FORBIDDEN);
		Query query = new Query(
				Criteria.where("id").in(group.getEntryids()).and("deled").is(false));

		List<Entry> entrys = mongo.find(query, Entry.class);
		List<String> usernames = entrys.stream().map(e -> e.getUsername()).collect(Collectors.toList());
		List<User> users = userRepository.findByUsernameInList(usernames);
		Map<String, User> map = new HashMap<>();
		users.stream().forEach(e -> map.put(e.getUsername(), e));
		List<HashMap<String, Object>> ret = new ArrayList<HashMap<String, Object>>();
		for (Entry entry : entrys) {
			HashMap<String, Object> tmp = new HashMap<>();
			tmp.put("entry", entry);
			tmp.put("user", map.get(entry.getUsername()));
			ret.add(tmp);
		}
		return ret;
	}

	@RequestMapping(value = "/group", method = RequestMethod.POST)
	public Object post(@Valid GroupForm form, BindingResult bind) {
		if (bind.hasErrors()) {
			return new ResponseEntity<String>(HttpStatus.BAD_REQUEST);
		}
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		boolean hasAuth = gameAuthService.checkOwnerOrManager(username, form.getGamename());
		System.out.println("test");
		if (!hasAuth)
			return new ResponseEntity<String>(HttpStatus.FORBIDDEN);

		Group group = form.update(new Group());
		Query query = new Query(Criteria.where("gamename").is(group.getGamename()).and("id").in(group.getEntryids()));
		List<Entry> entrys = mongo.find(query, Entry.class);
		if (entrys.size() != group.getEntryids().size())
			return new ResponseEntity<String>(HttpStatus.FORBIDDEN);
		mongo.insert(group);
		return group;
	}
}
