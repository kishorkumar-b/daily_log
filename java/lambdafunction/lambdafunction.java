interface add {
    int sum(int a, int b);
}
public class lambdafunction {
    public static void main(String[] args) {

    add addition = (a,b)->a+b;
    System.out.println(addition.sum(5,10));    
    }
}
