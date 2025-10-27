class MyRunnable implements Runnable {
    public void run() {
        System.out.println("Runnable thread running: " + Thread.currentThread().getName());
    }
}

public class Demo {
    public static void main(String[] args) {
        Thread t = new Thread(new MyRunnable());
        t.start();
    }
}

