package crazy.form;

import java.util.ArrayList;
import java.util.Arrays;

import org.hibernate.validator.constraints.NotBlank;

import crazy.vo.Group;

public class GroupForm {
	@NotBlank()
	private String groupname;
	@NotBlank()
	private String gamename;
	private String entryids;

	public Group update(Group group) {
		String[] ids = entryids.split(",");
		group.setEntryids(new ArrayList<>(Arrays.asList(ids)));
		group.setGamename(gamename);
		group.setGroupname(groupname);
		return group;
	}

	public String getGroupname() {
		return groupname;
	}

	public void setGroupname(String groupname) {
		this.groupname = groupname;
	}

	public String getGamename() {
		return gamename;
	}

	public void setGamename(String gamename) {
		this.gamename = gamename;
	}

	public String getEntryids() {
		return entryids;
	}

	public void setEntryids(String entryids) {
		this.entryids = entryids;
	}
	
}
