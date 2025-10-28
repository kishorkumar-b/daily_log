interface Vehicle {
    void show();
    default void fuel() {
        System.out.println("runs in petrol");
    }
}
class car implements Vehicle{
    public void show() {
        System.out.println("car started");
    }
}

public class default_interface {
    public static void main(String[] args) {
        car c = new car();
        c.show();
        c.fuel();
    }
}
