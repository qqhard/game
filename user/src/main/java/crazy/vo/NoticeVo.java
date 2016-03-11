package crazy.vo;

import org.springframework.data.annotation.Id;

public class NoticeVo {
	public String getNotice() {
		return notice;
	}
	public void setNotice(String notice) {
		this.notice = notice;
	}
	public String getId() {
		return id;
	}
	@Id
    private String id;
	private String notice;
}
