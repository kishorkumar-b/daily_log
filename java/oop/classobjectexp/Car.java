public class Car {

    String brand;
    String color;
    int year;

    public Car(String b, String c, int y) {
        brand = b;
        color = c;
        year = y;
    }

    public void displayInfo() {
        System.out.println("Brand: " + brand);
        System.out.println("Color: " + color);
        System.out.println("Year: " + year);
    }

    public static void main(String[] args) {
        Car myCar = new Car("Toyota", "Red", 2022);

        myCar.displayInfo();
    }
}
