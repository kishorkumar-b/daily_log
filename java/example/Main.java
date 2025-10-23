import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        int[] marks = new int[5]; 
        int total = 0;

        for (int i = 0; i < marks.length; i++) {
            System.out.print("Enter marks for subject " + (i + 1) + ": ");
            marks[i] = input.nextInt();
            total += marks[i];
        }

        double average = total / 5.0;
        System.out.println("\nAverage Marks: " + average);

        if (average >= 40) {
            System.out.println("Result: Pass");
        } else {
            System.out.println("Result: Fail");
        }
        int grade = (int) (average / 10);

        switch (grade) {
            case 10:
                System.out.println("Grade: O");
                break;
            case 9:
                System.out.println("Grade: A+");
                break;
            case 8:
                System.out.println("Grade: A");
                break;
            case 7:
                System.out.println("Grade: B");
                break;
            case 6:
                System.out.println("Grade: C");
                break;
            case 5:
                System.out.println("Grade: D");
                break;
            default:
                System.out.println("Grade: F");
        }

        int maxMark = marks[0];
        for (int i = 1; i < marks.length; i++) {
            maxMark = Math.max(maxMark, marks[i]);
        }
        System.out.println("Highest Mark: " + maxMark);

        input.close();
    }
}
 