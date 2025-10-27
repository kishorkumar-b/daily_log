import java.util.Deque;
import java.util.LinkedList;

public class DequeExample {
    public static void main(String[] args) {
        Deque<String> deque = new LinkedList<>();

        deque.addFirst("X"); 
        deque.add("f"); 
        deque.addLast("Y");  
        deque.addLast("Z");
        deque.poll();
        System.out.println(deque.peek());
        System.out.println("Deque: " + deque);
        System.out.println("Removed first: " + deque.removeFirst());
        System.out.println("Removed last: " + deque.removeLast()); 
        System.out.println("Deque now: " + deque); 
    }
}
