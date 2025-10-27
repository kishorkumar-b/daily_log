class Counter {
    int count = 0;
    
    public synchronized void increment() {
        System.out.println("thread " + Thread.currentThread().getName());
        try {
        Thread.sleep(1000);
    }catch (InterruptedException e) {
            System.out.println(Thread.currentThread().getName() + " was interrupted!");
        }
    }
}

public class SyncExample {
    public static void main(String[] args) throws InterruptedException {
        Counter c = new Counter();

        Thread t1 = new Thread(() -> { for(int i=0;i<5;i++) c.increment(); });
        Thread t2 = new Thread(() -> { for(int i=0;i<5;i++) c.increment(); });
        Thread t3 = new Thread(() -> { for(int i=0;i<5;i++) c.increment(); });

        t1.setPriority(Thread.MIN_PRIORITY);
        t2.setPriority(Thread.NORM_PRIORITY);
        t3.setPriority(Thread.MAX_PRIORITY);

        t1.setDaemon(true);
        t2.setDaemon(true);

        t1.start(); 
        System.out.println(t1.isAlive());
        System.out.println(t1.isDaemon());

        t2.start();
        t2.interrupt( ); 
        t3.start();
        t3.join();
        

        System.out.println("Count: " + c.count);
    }
}
