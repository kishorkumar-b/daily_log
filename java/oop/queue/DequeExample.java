import java.util.Deque;
import java.util.LinkedList;

public class DequeExample {
    public static void main(String[] args) {
        Deque<String> deque = new LinkedList<>();

        // Add elements at both ends
        deque.addFirst("X"); // Front
        deque.add("f"); 
        deque.addLast("Y");  // End
        deque.addLast("Z");

        System.out.println("Deque: " + deque); // [X, Y, Z]

        // Remove from front
        System.out.println("Removed first: " + deque.removeFirst()); // X
        // Remove from end
        System.out.println("Removed last: " + deque.removeLast()); // Z
        System.out.println("Deque now: " + deque); // [Y]
    }
}
