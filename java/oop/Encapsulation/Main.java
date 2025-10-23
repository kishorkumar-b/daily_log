public class Main {
    public static void main(String[] args) {
        BankAccount acc = new BankAccount(5000);  // directly use BankAccount
        acc.deposit(2000);
        System.out.println("Balance: " + acc.getBalance());
    }
}
