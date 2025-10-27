import java.util.LinkedHashSet;
import java.util.Set;

public class LinkedHashSetExample {
    public static void main(String[] args) {
        Set<Integer> set = new LinkedHashSet<>();
        set.add(10);
        set.add(1);
        set.add(15); 
        set.add(25);
        set.add(20);
        set.remove(15);
        System.out.println(set); 
    }
}
