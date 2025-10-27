

import java.io.FileWriter;
import java.io.IOException;

public class writefile {
    public static void main(String[] args) {
        
   
    try{
        FileWriter myfile = new FileWriter("text.txt");
        myfile.write("In Java, you can create a new file with the createNewFile() method from the File class.");
        myfile.close();
        System.out.println("written in file");
    }catch(IOException e){
        e.printStackTrace();
    }
    }
}
