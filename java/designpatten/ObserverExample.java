import java.util.*;
interface Subject {
    void subscribe(Observer o);
    void unsubscribe(Observer o);
    void notifyObservers();
}
interface Observer {
    void update(String message);
}
class YouTubeChannel implements Subject {
    private List<Observer> subscribers = new ArrayList<>();
    private String latestVideo;

    public void uploadVideo(String videoTitle) {
        this.latestVideo = videoTitle;
        System.out.println("Channel uploaded: " + videoTitle);
        notifyObservers();
    }

    public void subscribe(Observer o) {
        subscribers.add(o);
    }

    public void unsubscribe(Observer o) {
        subscribers.remove(o);
    }

    public void notifyObservers() {
        for (Observer o : subscribers) {
            o.update("New video uploaded: " + latestVideo);
        }
    }
}
class Subscriber implements Observer {
    private String name;

    public Subscriber(String name) {
        this.name = name;
    }

    public void update(String message) {
        System.out.println(name + " received notification → " + message);
    }
}
public class ObserverExample {
    public static void main(String[] args) {
        YouTubeChannel channel = new YouTubeChannel();

        Subscriber s1 = new Subscriber("Alice");
        Subscriber s2 = new Subscriber("Bob");
        Subscriber s3 = new Subscriber("Charlie");

        channel.subscribe(s1);
        channel.subscribe(s2);
        channel.subscribe(s3);

        channel.uploadVideo("Observer Pattern Explained in Java");
    }
}
