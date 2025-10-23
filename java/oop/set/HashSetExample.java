import java.util.HashSet;
import java.util.Set;

public class HashSetExample {
    public static void main(String[] args) {
        Set<String> set = new HashSet<>();
        set.add("Apple");
        set.add("Banana");
        set.add("Apple"); // Duplicate ignored

        System.out.println(set); // Output order may vary
        set.remove("Apple");
        System.out.println(set);
    }
}
