interface Prototype {
    Prototype clone();
}
class Employee implements Prototype {
    private String name;
    private String department;

    public Employee(String name, String department) {
        this.name = name;
        this.department = department;
    }
    public Prototype clone() {
        return new Employee(name, department);
    }
    public void setDepartment(String department) {
        this.department = department;
    }
    

    public void showInfo() {
        System.out.println("Name: " + name + ", Department: " + department);
    }
}

public class PrototypeExample {
    public static void main(String[] args) {
        Employee emp1 = new Employee("John", "HR");

        // Clone the object
        Employee emp2 = (Employee) emp1.clone();
        emp2.setDepartment("ECE");

        emp1.showInfo();
        emp2.showInfo(); 
    }
}
