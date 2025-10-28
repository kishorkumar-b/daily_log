import java.util.LinkedList;
import java.util.List;

public class stream{
    public static void main(String[] args) {
        LinkedList<Integer> list = new LinkedList<>(List.of(3,7,4,26,5));
        System.out.println(list);
        int filteredList = list.stream()
                                        .map(num -> num * 2)
                                        .sorted()
                                        .filter(num -> num > 10)
                                        .reduce(0,(a,b)-> a+b);
        boolean bool = list.stream()
                        .anyMatch(num -> num > 25);
                                        
        System.out.println(filteredList);
        System.out.println(bool);
    }
}
