class singleton {
    private static singleton instance;
    private singleton(){}
    public static singleton getInstance(){
        if(instance == null){
            instance=new singleton();
            
        }
        return instance;
    }
}

public class creation {
    public static void main(String[] args) {
        singleton s1=singleton.getInstance();
        singleton s2=singleton.getInstance();
        System.out.println(s1==s2);
    }
}
