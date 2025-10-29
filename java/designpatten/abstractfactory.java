interface button {
    void paint();
}
interface checkbox {
    void paint();
}

class WinButton implements button {
    public void paint() {
        System.out.println("Rendering Windows Button");
    }
}
class MacButton implements button {
    public void paint() {
        System.out.println("Rendering Mac Button");
    }
}
class WinCheckbox implements checkbox {
    public void paint() {
        System.out.println("Rendering Windows Checkbox");
    }
}
class MacCheckbox implements checkbox {
    public void paint() {
        System.out.println("Rendering Mac Checkbox");
    }
}
interface GUIFactory {
    button createButton();
    checkbox createCheckbox();
}
class WinFactory implements GUIFactory {
    public button createButton() {
        return new WinButton();
    }
    public checkbox createCheckbox() {
        return new WinCheckbox();
    }
}
class MacFactory implements GUIFactory {
    public button createButton() {
        return new MacButton();
    }
    public checkbox createCheckbox() {
        return new MacCheckbox();
    }
}

public class abstractfactory {
    public static void main(String[] args) {
        GUIFactory factory;
        String os = "Windows"; 
        if (os.equalsIgnoreCase("Windows")) {
            factory = new WinFactory();
        } else {
            factory = new MacFactory();
        }
        button btn = factory.createButton();
        checkbox cb = factory.createCheckbox();
        btn.paint();
        cb.paint();
    }
}
