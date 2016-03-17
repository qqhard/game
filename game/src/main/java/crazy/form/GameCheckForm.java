package crazy.form;

import crazy.vo.ApproveRecord;

public class GameCheckForm {
	private String reason;
	private Boolean accepted;
	public String getReason() {
		return reason;
	}
	public void setReason(String reason) {
		this.reason = reason;
	}
	public Boolean getAccepted() {
		return accepted;
	}
	public void setAccepted(Boolean accepted) {
		this.accepted = accepted;
	}
	public ApproveRecord update(ApproveRecord record){
		record.setAccepted(accepted);
		record.setReason(reason);
		return record;
	}
	
	
}
