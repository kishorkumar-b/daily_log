
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;



public class example {
    public static void main(String[] args) throws IOException{
        FileInputStream in = new FileInputStream("text.txt");
        FileOutputStream out = new FileOutputStream("copy.txt");
        int data;
        while((data=in.read())!=-1){
            out.write(data);

        }
        in.close();
        out.close();
        System.out.println("File copied successfully.");
    }
}
