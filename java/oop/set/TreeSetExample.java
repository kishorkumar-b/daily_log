import java.util.Set;
import java.util.TreeSet;
public class TreeSetExample {
    public static void main(String[] args) {
        Set<Integer> set = new TreeSet<>();
        set.add(10);
        set.add(1);
        set.add(24);
        set.add(5);
       System.out.println( set.contains(25));
        System.out.println(set);
        set.forEach(f -> System.out.println(f));
    }
}
