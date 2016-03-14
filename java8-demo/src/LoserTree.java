import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

public class LoserTree {
	public static void main(String... args) throws Exception {
		// TODO Auto-generated method stub
		List<Integer> list = Arrays.asList(3,6,45,5,45,453,4534,4534,5,345,34,5,100,-9 );
		LoserTree winer = new LoserTree(list);

		//winer.debug();                               
		for(int i = 0 ;i < list.size();i++){
			System.out.println(winer.topValue());
			winer.push(winer.topIndex(), Integer.MIN_VALUE);
		}
		
		
	}
	private Comparator<Integer> cmp;
	private List<Integer> values;
	private List<Integer> poses;
	private List<Integer> tree;
	private int head;
	private int count = 0;
	public LoserTree(List<Integer> values,Comparator<Integer> cmp) throws Exception{
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
		tree.set(0, loserify(1));
	}
	public LoserTree(List<Integer> values) throws Exception{
		this(values, (x,y) -> x.compareTo(y));
	}
	public void push(int index, int val){
		this.values.set(index, val);
		int pos = this.poses.get(index);
		adjust(pos);
	}
	
	public Integer topValue(){
		return values.get(tree.get(0));
	}
	public Integer topIndex(){
		return tree.get(0);
	}
	
	private void push(int val){
		this.values.add(val);
		this.poses.set(this.tree.get(head), head<<1);
		this.poses.add(head<<1|1);
		this.tree.add(this.tree.get(head));
		this.tree.add(this.poses.size()-1);
		this.head++;
	}
	
	private int loserify(int pos){
		if((pos<<1) >= tree.size()) return tree.get(pos);
		int left = loserify(pos<<1);
		int right = loserify(pos<<1|1);
		int ret;
		if(cmp.compare(values.get(left), values.get(right)) < 0) {
			tree.set(pos, left);ret = right;
		}
		else {
			tree.set(pos, right);ret = left;
		}
		return ret;
	}
	
	private void adjust(int pos){
		int max = tree.get(pos);
		while((pos>>1) > 0){
			int fa = pos>>1;
			if(cmp.compare(values.get(max), values.get(tree.get(fa))) < 0) {
				count++;
				int tmp = tree.get(fa);
				tree.set(fa, max);
				max = tmp;
			}
			pos = fa;
		}
		tree.set(0, max);
	}
	public int getCount(){
		return count;
	}
}
