import java.util.ArrayList;
import java.util.List;
interface Internet {
    void connectTo(String serverHost) throws Exception;
}

class RealInternet implements Internet {
    public void connectTo(String serverHost) {
        System.out.println("Connecting to " + serverHost);
    }
}

class ProxyInternet implements Internet {
    private Internet realInternet = new RealInternet();
    private static List<String> bannedSites;

    static {
        bannedSites = new ArrayList<>();
        bannedSites.add("abc.com");
        bannedSites.add("xyz.com");
    }

    public void connectTo(String serverHost) throws Exception {
        if (bannedSites.contains(serverHost.toLowerCase())) {
            throw new Exception("Access Denied to " + serverHost);
        }
        realInternet.connectTo(serverHost);
    }
}

public class ProxyExample {
    public static void main(String[] args) {
        Internet internet = new ProxyInternet();
        try {
            internet.connectTo("example.com");
            internet.connectTo("abc.com"); // banned site
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}
