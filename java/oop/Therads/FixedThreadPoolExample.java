import java.util.concurrent.*;

public class FixedThreadPoolExample {
    public static void main(String[] args) {
        ExecutorService pool = Executors.newFixedThreadPool(3);

        for (int i = 1; i <= 6; i++) {
            final int taskId = i;
            pool.execute(() -> {
                System.out.println("Task " + taskId + " running in " + Thread.currentThread().getName());
                try { Thread.sleep(1000); } catch (InterruptedException e) {}
                System.out.println("Task " + taskId + " finished");
            });
        }

        pool.shutdown();
    }
}
