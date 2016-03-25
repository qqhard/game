package crazy.dao;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import crazy.vo.Member;


public interface MemberRepository  extends MongoRepository<Member, ObjectId>{
	public Member findById(String id);
	public Member findByTeamidAndUsername(String teamid,String username);
	public List<Member> findByTeamidAndAccepted(String teamid,Boolean accepted);
	public int countByTeamidAndAccepted(String teamid,Boolean accepted);
	@Query("{'accepted':false,'teamid':?0,'applyed':?1}")
	public List<Member> findByTeamidAndApplyed(String teamid,Boolean applyed);
	@Query("{'accepted':false,'teamid':?0,'invited':?1}")
	public List<Member> findByTeamidAndInvited(String teamid,Boolean invited);
	@Query("{'accepted':false,'username':?0,'invited':?1}")
	public List<Member> findByUsernameAndInvited(String username,Boolean invited);
	public List<Member> findByUsernameAndAccepted(String username,Boolean accepted);

	
}
