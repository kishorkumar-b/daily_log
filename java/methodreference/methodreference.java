
import java.util.ArrayList;
import java.util.List;
import java.util.function.*;
public class methodreference {
    public static void main(String[] args) {

        // Reference to a static method
        Function<Integer,Double> sqrt= Math::sqrt;
        System.out.println(sqrt.apply(16));

        // Reference to an instance method of a particular object
        painter painter=new painter();
        Consumer<String> paint = painter::paint;
        paint.accept("Hello, Method Reference!");

        // Reference to an instance method of an arbitrary object of a particular type
        List<String> names=List.of("Alice","Bob","Charlie");
        names.stream().map(String::toUpperCase).forEach(System.out::println);

        // Reference to a constructor
        Supplier<List<String>> listSupplier=ArrayList::new;
        List<String> list=listSupplier.get();
        System.out.println("List created with size: "+list.size());

        // Reference to an array constructor





 
        

    }

}
class painter {
        void paint(String mes){
            System.out.println("message:"+mes);
}
}

