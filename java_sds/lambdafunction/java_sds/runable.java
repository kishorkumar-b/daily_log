package java_sds;

public class runable {

	public static void main(String[] args) {
		Thread t = new Thread(() -> {
		    System.out.println("Thread is running...");
		});
		t.start();
	}

}
