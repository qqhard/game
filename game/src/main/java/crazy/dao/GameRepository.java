package crazy.dao;

import java.util.ArrayList;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import crazy.vo.Game;

public interface GameRepository extends MongoRepository<Game, ObjectId>{
	public Game findById(String gameid);

	public Page<Game> findAll(Pageable pageable);

	public List<Game> findByStep(int step);
	
	public Game findByGamename(String gamename);
	
	public Game findByGamenameAndStep(String gamename, int step);
	
	public Game findByGamenameAndDeled(String gamename, boolean deled);

	public ArrayList<Game> findByOwner(String owner);
	
	public ArrayList<Game> findByOwnerAndStep(String owner, int step);
	
	@Query("{'step':2,'startTime':{'$lt':?0},'dueTime':{'$gt':?0}}")
	public ArrayList<Game> findByInEntryed(long now);
	
	@Query("{'step':1,'owner':?0}")
	public ArrayList<Game> findByInSubmited(String owner);
	
	@Query("{'step':2,'owner':?0,'startTime':{'$gt':?1}}")
	public ArrayList<Game> findByInUnstarted(String owner,long now);
	
	@Query("{'step':2,'owner':?0,'startTime':{'$lt':?1},'dueTime':{'$gt':?1}}")
	public ArrayList<Game> findByInEntryed(String owner,long now);
	
	@Query("{'step':2,'owner':?0,'dueTime':{'$lt':?1}},'endTime':{'$gt':?1}}")
	public ArrayList<Game> findByInDued(String owner,long now);
	
	@Query("{'step':2,'owner':?0,'endTime':{'$lt':?1}}")
	public ArrayList<Game> findByInEnded(String owner,long now);
	
	public ArrayList<Game> findByOwnerAndDeled(String owner,boolean deled);
}
