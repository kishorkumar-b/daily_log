
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

public class character {
    public static void main(String[] args) throws  IOException{
        BufferedReader in = new BufferedReader(new FileReader("hr.pdf"));
        BufferedWriter out = new BufferedWriter(new FileWriter("copy.pdf"));
        int data;
        while((data=in.read())!=-1){
            out.write(data);
        }
        in.close();
        out.close();
        System.out.println("File copied successfully.");

    }
}
