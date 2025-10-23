import java.util.LinkedList;
import java.util.Queue;

public class SimpleQueueExample {
    public static void main(String[] args) {
        Queue<String> queue = new LinkedList<>();

        // Enqueue elements
        queue.add("A");
        queue.add("B");
        queue.add("C");

        System.out.println("Queue: " + queue); // [A, B, C]

        // Dequeue elements (FIFO)
        System.out.println("Removed: " + queue.poll()); // A
        System.out.println("Next removed: " + queue.poll()); // B
        System.out.println("Queue now: " + queue); // [C]
    }
}
