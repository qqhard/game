package crazy.vo;

public class Institute {
	private String id;
	private int instituteid;
	private String institutename;
	private int collegeid;
	private String collegename;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}

	public String getInstitutename() {
		return institutename;
	}
	public void setInstitutename(String institutename) {
		this.institutename = institutename;
	}
	
	public int getInstituteid() {
		return instituteid;
	}
	public void setInstituteid(int instituteid) {
		this.instituteid = instituteid;
	}
	public int getCollegeid() {
		return collegeid;
	}
	public void setCollegeid(int collegeid) {
		this.collegeid = collegeid;
	}
	public String getCollegename() {
		return collegename;
	}
	public void setCollegename(String collegename) {
		this.collegename = collegename;
	}
}
