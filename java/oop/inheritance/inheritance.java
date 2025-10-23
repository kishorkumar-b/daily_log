class Parent {
    int x = 10;
    void show() {
        System.out.println("This is the parent class");
    }
}

class Child extends Parent {
    int y = 20;
    void display() {
        System.out.println("This is the child class");
    }
}
public class inheritance {
        public static void main(String[] args) {
        Child obj = new Child();
        obj.show();
        obj.display(); 
        System.out.println("x = " + obj.x);
        System.out.println("y = " + obj.y);
    }
}
