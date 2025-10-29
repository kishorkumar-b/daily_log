interface shape{
    void draw();
}
class circle implements shape{
    public void draw(){
        System.out.println("circle");
    }
}
class reactangle implements shape{
    public void draw(){
        System.out.println("rectangle");
    }
}

class shapefactory{
    public shape getshape(String shapeType){
        if(shapeType.equalsIgnoreCase("CIRCLE")) return new circle();
        if(shapeType.equalsIgnoreCase("RECTANGLE")) return new reactangle();
        return null;
    }
}
public class Factory {
    public static void main(String[] args) {
        shapefactory sf=new shapefactory();
        shape s1=sf.getshape("circle");
        s1.draw();
        
    }
}
