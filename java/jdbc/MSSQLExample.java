import java.sql.*;

public class MSSQLExample {
    public static void main(String[] args) {
        // JDBC URL for SQL Server Express
        String url = "jdbc:sqlserver://localhost\\SQLEXPRESS2022:1433;encrypt=false;trustServerCertificate=true;";
        String user = "sa"; // your SQL Server username
        String password = "admin@123"; // your password

        try {
            // 1️⃣ Load the driver (optional in modern Java)
            Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");

            // 2️⃣ Connect to SQL Server
            Connection con = DriverManager.getConnection(url, user, password);
            System.out.println("✅ Connected to SQL Server");

            Statement stmt = con.createStatement();

            // 3️⃣ Create a new database
            String createDB = "IF DB_ID('TestDB') IS NULL CREATE DATABASE TestDB";
            stmt.executeUpdate(createDB);
            System.out.println("📘 Database created or already exists.");

            // 4️⃣ Switch to the new database
            stmt.execute("USE TestDB");

            // 5️⃣ Create a table
            String createTable = "IF OBJECT_ID('Employees', 'U') IS NULL " +
                                 "CREATE TABLE Employees (" +
                                 "id INT PRIMARY KEY IDENTITY(1,1), " +
                                 "name VARCHAR(50), " +
                                 "salary FLOAT)";
            stmt.executeUpdate(createTable);
            System.out.println("📗 Table created or already exists.");

            // 6️⃣ Insert data
            String insert = "INSERT INTO Employees (name, salary) VALUES ('John', 55000), ('Mary', 65000)";
            stmt.executeUpdate(insert);
            System.out.println("✅ Data inserted successfully.");

            // 7️⃣ Select (read) data
            ResultSet rs = stmt.executeQuery("SELECT * FROM Employees");
            System.out.println("\n👀 Employee Table Data:");
            while (rs.next()) {
                System.out.println("ID: " + rs.getInt("id") +
                                   ", Name: " + rs.getString("name") +
                                   ", Salary: " + rs.getDouble("salary"));
            }

            // 8️⃣ Update data
            String update = "UPDATE Employees SET salary = 70000 WHERE name = 'John'";
            stmt.executeUpdate(update);
            System.out.println("✏️ Data updated successfully.");

            // 9️⃣ Delete data
            String delete = "DELETE FROM Employees WHERE name = 'Mary'";
            stmt.executeUpdate(delete);
            System.out.println("❌ Data deleted successfully.");

            // 1️⃣0️⃣ Verify update
            rs = stmt.executeQuery("SELECT * FROM Employees");
            System.out.println("\n📋 Final Data in Employees Table:");
            while (rs.next()) {
                System.out.println("ID: " + rs.getInt("id") +
                                   ", Name: " + rs.getString("name") +
                                   ", Salary: " + rs.getDouble("salary"));
            }

            // 1️⃣1️⃣ Close connection
            rs.close();
            stmt.close();
            con.close();
            System.out.println("\n🔒 Connection closed.");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
