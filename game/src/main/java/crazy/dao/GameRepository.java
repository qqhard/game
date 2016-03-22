package crazy.dao;

import java.util.ArrayList;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

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
}
