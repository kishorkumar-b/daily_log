import java.util.LinkedList;

public class LinkedListExample {
    public static void main(String[] args) {
        LinkedList<Integer> list = new LinkedList<>();

        list.add(10);
        list.add(20);
        list.add(30);
        list.add(20); 

        System.out.println("List: " + list);
        list.removeFirst();
        System.out.println("After removeFirst(): " + list);
    }
}
