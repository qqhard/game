import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;
import java.util.stream.Stream;
public class Sorter {
	public static void main(String... args) throws Exception{
		int size = 100000;
		Random r = new Random();
		List<Integer> list = Stream.generate(()->r.nextInt(100000))
									.limit(size)
									.collect(Collectors.toList());
		long s1 = System.currentTimeMillis();
		sortWithHeap(list);
		long s2 = System.currentTimeMillis();
		sortWithWinerTree(list);
		long s3 = System.currentTimeMillis();
		sortWithLoserTree(list);
		long s4 = System.currentTimeMillis();
		System.out.println(s2-s1);
		System.out.println(s3-s2);
		System.out.println(s4-s3);
		
	}
	
	public static List<Integer> sortWithHeap(List<Integer> list) throws Exception{
		Heap heap = new Heap(list.size() + 10);
		list.forEach(val->heap.push(val));
		List<Integer> ret = new ArrayList<Integer>();
		while(!heap.isEmpty()){
			//System.out.println(heap.top());
			ret.add(heap.top());
			heap.pop();
		}
		System.out.println(heap.getCount());
		return ret;
	}
	
	public static List<Integer> sortWithWinerTree(List<Integer> list) throws Exception{
		WinerTree winerTree = new WinerTree(list);
		List<Integer> ret = new ArrayList<Integer>();
		for(int i = 0 ;i < list.size();i++){
			//System.out.println(winerTree.topValue());
			ret.add(winerTree.topValue());
			winerTree.push(winerTree.topIndex(), Integer.MAX_VALUE);
		}
		System.out.println(winerTree.getCount());
		return ret;
	}
	
	public static List<Integer> sortWithLoserTree(List<Integer> list) throws Exception{
		LoserTree loserTree = new LoserTree(list, (x,y)->y.compareTo(x));
		List<Integer> ret = new ArrayList<Integer>();
		for(int i = 0 ;i < list.size();i++){
			//System.out.println(loserTree.topValue());
			ret.add(loserTree.topValue());
			loserTree.push(loserTree.topIndex(), Integer.MAX_VALUE);
		}
		System.out.println(loserTree.getCount());
		return ret;
	}
}
