package crazy.dao;

import java.util.ArrayList;

import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import crazy.vo.Game;

public interface GameRepository extends MongoRepository<Game, ObjectId>{
	public Game findById(String gameid);

	public Page<Game> findAll(Pageable pageable);

	public Game findByGamename(String gamename);
	
	public Game findByGamenameAndDeled(String gamename, boolean deled);

	public ArrayList<Game> findByOwner(String owner);
}
