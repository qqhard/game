import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

public class WinerTree {

	public static void main(String... args) throws Exception {
		// TODO Auto-generated method stub
		List<Integer> list = Arrays.asList(3,6,5,6,1,2,543,76,2,56,87,345,54);
		WinerTree winer = new WinerTree(list,(x,y)->x.compareTo(y));


		for(int i = 0 ;i < list.size();i++){
			System.out.println(winer.topValue());
			winer.push(winer.topIndex(), Integer.MAX_VALUE);
		}
		
	}
	private Comparator<Integer> cmp;
	private List<Integer> values;
	private List<Integer> poses;
	private List<Integer> tree;
	private int head;
	private int count;
	public WinerTree(List<Integer> values,Comparator<Integer> cmp) throws Exception{
		if(values == null || values.size() == 0)
			throw new Exception("values is null");
		this.cmp = cmp;
		this.values = new ArrayList<Integer>();
		this.tree = new ArrayList<Integer>();
		this.poses = new ArrayList<Integer>();
		this.values.add(values.get(0));
		this.poses.add(1);
		this.tree.add(0);this.tree.add(0);
		head = 1;
		for(int i = 1; i < values.size(); i++){
			push(values.get(i));
		}
	}
	public WinerTree(List<Integer> values) throws Exception{
		this(values, (x,y) -> x.compareTo(y));
	}
	public void push(int index, int val){
		this.values.set(index, val);
		int pos = this.poses.get(index);
		adjust(pos);
	}
	
	public Integer topValue(){
		return values.get(tree.get(1));
	}
	public Integer topIndex(){
		return tree.get(1);
	}
	
	private void push(int val){
		this.values.add(val);
		this.poses.set(this.tree.get(head), head<<1);
		this.poses.add(head<<1|1);
		this.tree.add(this.tree.get(head));
		this.tree.add(this.poses.size()-1);
		this.head++;
		adjust(this.tree.size()-1);
	}
	private void adjust(int pos){
		while((pos>>1) > 0){
			int bro = pos^1;
			int fa = pos>>1;
			int max = pos;
			if(cmp.compare(values.get(tree.get(max)), values.get(tree.get(bro))) > 0) {
				count++;
				max = bro;
			}
			tree.set(fa, tree.get(max));
			pos = fa;
		}
	}
	public int getCount(){
		return count;
	}
}
