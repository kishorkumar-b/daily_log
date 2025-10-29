class Computer {
    private String CPU;
    private String RAM;
    private String storage;

    public void setCPU(String CPU) { this.CPU = CPU; }
    public void setRAM(String RAM) { this.RAM = RAM; }
    public void setStorage(String storage) { this.storage = storage; }

    public void showSpecs() {
        System.out.println("CPU: " + CPU);
        System.out.println("RAM: " + RAM);
        System.out.println("Storage: " + storage);
    }
}
interface ComputerBuilder {
    void buildCPU();
    void buildRAM();
    void buildStorage();
    Computer getComputer();
}
class GamingComputerBuilder implements ComputerBuilder {
    private Computer computer = new Computer();

    public void buildCPU() { computer.setCPU("Intel i9"); }
    public void buildRAM() { computer.setRAM("32GB"); }
    public void buildStorage() { computer.setStorage("1TB SSD"); }
    public Computer getComputer() { return computer; }
}

class OfficeComputerBuilder implements ComputerBuilder {
    private Computer computer = new Computer();

    public void buildCPU() { computer.setCPU("Intel i5"); }
    public void buildRAM() { computer.setRAM("16GB"); }
    public void buildStorage() { computer.setStorage("512GB SSD"); }
    public Computer getComputer() { return computer; }
}
class Director {
    private ComputerBuilder builder;

    public Director(ComputerBuilder builder) {
        this.builder = builder;
    }

    public Computer constructComputer() {
        builder.buildCPU();
        builder.buildRAM();
        builder.buildStorage();
        return builder.getComputer();
    }
}
public class BuilderExample {
    public static void main(String[] args) {
        // Build Gaming PC
        ComputerBuilder gamingBuilder = new GamingComputerBuilder();
        Director director = new Director(gamingBuilder);
        Computer gamingPC = director.constructComputer();
        System.out.println("Gaming PC Configuration:");
        gamingPC.showSpecs();

        // Build Office PC
        ComputerBuilder officeBuilder = new OfficeComputerBuilder();
        director = new Director(officeBuilder);
        Computer officePC = director.constructComputer();
        System.out.println("\nOffice PC Configuration:");
        officePC.showSpecs();
    }
}

