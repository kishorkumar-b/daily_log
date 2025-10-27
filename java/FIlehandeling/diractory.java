import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

public class diractory {
    public static void main(String[] args) {
        String filePath = "C:\\Users\\kishorkumar\\Documents\\log\\daily_log\\java\\FIlehandeling\\text.txt";  // your file path
                try {
            File myFile = new File(filePath);
            System.out.println("Looking for: " + myFile.getAbsolutePath());
            System.out.println("Exists: " + myFile.exists());
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
