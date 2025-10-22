import java.util.Scanner;

public class Main {
    static double balance = 1000.0;

    public static void deposit(double amount) {
        balance += amount;
        System.out.println("Deposited: ₹" + amount);
    }
    public static void withdraw(double amount) {
        if (amount <= balance) {
            balance -= amount;
            System.out.println("Withdrawn: ₹" + amount);
        } else {
            System.out.println("Insufficient balance!");
        }
    }

    public static double getBalance() {
        return balance;
    }
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        System.out.println("Welcome to Simple Bank!");
        System.out.println("1. Deposit  2. Withdraw  3. Check Balance");
        System.out.print("Choose an option: ");
        int choice = input.nextInt();

        switch (choice) {
            case 1:
                System.out.print("Enter amount to deposit: ");
                double depositAmt = input.nextDouble();
                deposit(depositAmt);
                break;

            case 2:
                System.out.print("Enter amount to withdraw: ");
                double withdrawAmt = input.nextDouble();
                withdraw(withdrawAmt);
                break;

            case 3:
                System.out.println("Current Balance: ₹" + getBalance());
                break;

            default:
                System.out.println("Invalid choice!");
        }

        input.close();
    }
}
