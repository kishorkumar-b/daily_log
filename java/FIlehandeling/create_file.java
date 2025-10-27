
import java.io.File;
import java.io.IOException;

public class create_file {
    public static void main(String[] args) {
        try{
            File myfile = new File("text.txt");
            if(myfile.createNewFile()){
                System.out.println("File created: " + myfile.getName());
        }
        else{
            System.out.println("File already exists.");
        }}catch(IOException e){
            e.printStackTrace();
        }
    }
}
