

import java.io.FileWriter;
import java.io.IOException;

public class writefile {
    public static void main(String[] args) {
        
   
    try{
        FileWriter myfile = new FileWriter("text.txt");
        myfile.write("apple");
        myfile.close();
        System.out.println("written in file");
    }catch(IOException e){
        e.printStackTrace();
    }
    }
}
