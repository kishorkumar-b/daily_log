interface Vehicle {
    void start();

    default void stop() {
        System.out.println("Vehicle stopped.");
    }

    static void service() {
        System.out.println("Vehicle is being serviced.");
    }
}

class Car implements Vehicle {
    public void start() {
        System.out.println("Car started.");
    }
}

public class BothDefaultAndStaticInterface {
    public static void main(String[] args) {
        Car car = new Car();
        car.start();
        car.stop();
        Vehicle.service();
    }
}
