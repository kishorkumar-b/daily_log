
import java.util.Map;
import java.util.TreeMap;
public class TreeMapExample {
    public static void main(String[] args) {
        Map<Integer,String> map = new TreeMap<>();
        map.put(1,"a");
        map.put(3,"b");
        map.put(2,"c");
        System.out.println(map);
    }
}
