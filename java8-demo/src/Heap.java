import java.util.Comparator;
import java.util.Random;
import java.util.stream.Stream;

public class Heap {

	public static void main(String... args) throws Exception {		
		Heap heap = new Heap(100, (x,y) -> y.compareTo(x));
		Random r = new Random();
		Stream.generate(()->r.nextInt(10000)).limit(10).forEach(val -> heap.push(val));
		while(!heap.isEmpty()){
			System.out.println(heap.top());
			heap.pop();
		}
	}
	private int count = 0;
	private Comparator<Integer> cmp;
	private final int[] arr;
	private int tail;
	
	public Heap(int size){
		this(size, (x,y)->x.compareTo(y));
	}
	
	public Heap(int size, Comparator<Integer> t) {
		arr = new int[size];
		cmp = t;
		tail = 1;
	}

	public void push(int val) {
		arr[tail] = val;
		int pos = tail++;
		while ((pos >> 1) != 0) {
			if(cmp.compare(arr[pos], arr[pos>>1]) < 0){
				swap(arr, pos, pos>>1);
				pos = pos>>1;
			}else break;
		}
	}
	
	public int top(){
		return arr[1];
	}
	
	public boolean isEmpty(){
		return tail == 1;
	}
	
	public void pop() throws Exception{
		if(tail == 1) throw new Exception();
		arr[1] = arr[--tail];
		int pos = 1;
		while(pos < tail){
			int sonPos = pos<<1;
			if(sonPos > tail)break;
			if(cmp.compare(arr[sonPos|1], arr[sonPos]) < 0 && (sonPos|1) < tail){
				sonPos = sonPos|1;
				count++;
			} 
			if(cmp.compare(arr[pos], arr[sonPos]) <= 0){
				count++;
				break;
			}
			swap(arr, pos, sonPos);
			pos = sonPos;
		}
	}
	private void swap(int[] arr, int a, int b){
		arr[a] = arr[a]^arr[b];
		arr[b] = arr[a]^arr[b];
		arr[a] = arr[a]^arr[b];
	}
	public int getCount(){
		return count;
	}
}
