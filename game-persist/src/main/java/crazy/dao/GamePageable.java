package crazy.dao;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

public class GamePageable implements Pageable{
	private int pageNumber = 1;
	private int pageSize = 10;
	private Sort sort;
	public void setPageNumber(Integer pageNumber) {
		this.pageNumber = pageNumber;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public void setSort(Sort sort) {
		this.sort = sort;
	}

	@Override
	public int getPageNumber() {
		// TODO Auto-generated method stub
		return pageNumber;
	}

	@Override
	public int getPageSize() {
		// TODO Auto-generated method stub
		return pageSize;
	}

	@Override
	public int getOffset() {
		// TODO Auto-generated method stub
		return (pageNumber - 1) * pageSize;
	}

	@Override
	public Sort getSort() {
		// TODO Auto-generated method stub
		return sort;
	}

	@Override
	public Pageable next() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Pageable previousOrFirst() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Pageable first() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean hasPrevious() {
		// TODO Auto-generated method stub
		return false;
	}

}
