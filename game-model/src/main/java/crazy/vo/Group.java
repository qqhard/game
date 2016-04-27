package crazy.vo;

import java.util.ArrayList;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
@Document(collection="group") 
public class Group {
	@Id
    private String id;
	@Indexed
	private String gamename;
	private String groupname;
	private ArrayList<String> entryids;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getGamename() {
		return gamename;
	}
	public void setGamename(String gamename) {
		this.gamename = gamename;
	}
	public String getGroupname() {
		return groupname;
	}
	public void setGroupname(String groupname) {
		this.groupname = groupname;
	}
	public ArrayList<String> getEntryids() {
		return entryids;
	}
	public void setEntryids(ArrayList<String> entryids) {
		this.entryids = entryids;
	}
	public static class SimpleGroup{
		@Id
	    private String id;
		@Indexed
		private String gamename;
		private String groupname;
		public String getId() {
			return id;
		}
		public void setId(String id) {
			this.id = id;
		}
		public String getGamename() {
			return gamename;
		}
		public void setGamename(String gamename) {
			this.gamename = gamename;
		}
		public String getGroupname() {
			return groupname;
		}
		public void setGroupname(String groupname) {
			this.groupname = groupname;
		}
		
	}
}
