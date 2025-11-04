import org.json.JSONObject;

public class JSONExample {
    public static void main(String[] args) {
        String jsonStr = "{\"id\":101, \"name\":\"Kishor\", \"course\":\"Java\"}";

        JSONObject obj = new JSONObject(jsonStr);

        int id = obj.getInt("id");
        String name = obj.getString("name");
        String course = obj.getString("course");

        System.out.println("ID: " + id);
        System.out.println("Name: " + name);
        System.out.println("Course: " + course);
    }
}