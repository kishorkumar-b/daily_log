
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;



public class dateandtime {
    public static void main(String[] args) {
        LocalDateTime dt = LocalDateTime.now();
        LocalDate date = LocalDate.now();
        ZonedDateTime zdt = ZonedDateTime.now();
        ZoneId zone = ZoneId.systemDefault();
        System.out.println("zone id:"+zone);
        System.out.println("zoned date time: "+zdt);
        System.out.println("Current date: " + date);
        System.out.println("Current date and time: " + dt);
    }
}
