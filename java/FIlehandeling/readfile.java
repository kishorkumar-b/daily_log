
import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;


public class readfile {
    public static void main(String[] args) {
        try {
            File myFile = new File("text.txt");
            Scanner reader =new Scanner(myFile);
            while (reader.hasNextLine()){
                String data = reader.nextLine();
                System.out.println(data);
            }
            reader.close();
        } catch (FileNotFoundException e) {

            e.printStackTrace();
        }
    }
}
