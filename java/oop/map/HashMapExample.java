
import java.util.HashMap;
import java.util.Map;


public class HashMapExample {
    public static void main(String[] args) {
        Map<Integer,String> map = new HashMap<>();
        map.put(101, "kishor");
        map.put(102, "kishore");
        map.put(104, "andu");
        map.put(103, "arul");
        map.put(105, "kishorbabu");
        System.out.println(map);
        System.err.println(map.get(104));
    }
}
