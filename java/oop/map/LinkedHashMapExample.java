
import java.util.LinkedHashMap;
import java.util.Map;



public class LinkedHashMapExample {
    public static void main(String[] args) {
        Map<Integer,String> map = new LinkedHashMap<>();
        map.put(1,"kishor");
        map.put(3,"anbu");
        map.put(2,"arul");
        System.out.println(map);
    }
}
