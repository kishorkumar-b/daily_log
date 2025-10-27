class myException extends Exception{
    public myException(String message) {
        super(message);
    }
}
public class exception{
    public static void main(String[] args) {
        try {
            throw new myException("This is a custom exception");
        } catch (myException e) {
            System.out.println("Caught exception: " + e.getMessage());
        }
    }
}