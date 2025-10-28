
import java.util.Optional;



public class optionalclass {
    public static void main(String[] args) {
        Optional<String> name = getName();

        Optional<String> name2= Optional.ofNullable("kishor");
        String result = name2
                        .filter(n->n.length()>4)
                        .map(String::toUpperCase)
                        .orElse("Name not found");
        System.out.println(result);

        if(name.isPresent()){
            System.out.println("Name is: " + name);}
            else{
                System.out.println("Name is not present");
            }
        
    }
    static Optional<String> getName(){
        return Optional.ofNullable("kishor");
    }
    
}

