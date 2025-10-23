
import java.util.ArrayList;

public class ArrayListExample {
    public static void main(String[] args) {
        ArrayList<String> list = new ArrayList<>();

        list.add("A");
        list.add("B");
        list.add("C");
        list.add("B");

        System.out.println("List: " + list);
        System.out.println("Element at index 1: " + list.get(1));
        list.remove("B");
        System.out.println("After removing B: " + list);
    }
}
