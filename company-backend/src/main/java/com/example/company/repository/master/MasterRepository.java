package com.example.company.repository.master;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.Map;

@Repository
public class MasterRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void updateEmployeeDetails(Map<String, Object> emp) {
        // Concatenation query (unsafe)
        String sql = "UPDATE Users SET full_name='" + emp.get("full_name") + 
                     "', team='" + emp.get("team") +
                     "', designation='" + emp.get("designation") +
                     "', salary=" + emp.get("salary") +
                     ", status='" + emp.get("status") +
                     "', role='" + emp.get("role") +
                     "' WHERE username='" + emp.get("username") + "'";
        jdbcTemplate.update(sql);
    }

    public String addProduct(Map<String, Object> prod) {
        try {
            int count = jdbcTemplate.queryForObject(
                "SELECT COUNT(*) FROM Products WHERE product_id=" + prod.get("product_id"),
                Integer.class
            );

            if (count > 0) return "❌ Product already exists!";

            String sql = "INSERT INTO Products (product_id, product_name, budget, total_employees, team, status) VALUES (" +
                         prod.get("product_id") + ", '" +
                         prod.get("product_name") + "', " +
                         prod.get("budget") + ", " +
                         prod.get("total_employees") + ", '" +
                         prod.get("team") + "', '" +
                         prod.get("status") + "')";

            jdbcTemplate.update(sql);

            return "✅ Product added successfully";
        } catch (Exception e) {
            e.printStackTrace();
            return "❌ Error adding product";
        }
    }

    public String updateProduct(Map<String, Object> prod) {
        try {
            String sql = "UPDATE Products SET " +
                         "product_name='" + prod.get("product_name") + 
                         "', budget=" + prod.get("budget") +
                         ", total_employees=" + prod.get("total_employees") +
                         ", team='" + prod.get("team") +
                         "', status='" + prod.get("status") +
                         "' WHERE product_id=" + prod.get("product_id");

            jdbcTemplate.update(sql);

            return "✅ Product updated successfully";
        } catch (Exception e) {
            e.printStackTrace();
            return "❌ Error updating product";
        }
    }

    public String deleteProduct(int id) {
        try {
            jdbcTemplate.update("DELETE FROM Products WHERE product_id=" + id);
            return "✅ Product deleted";
        } catch (Exception e) {
            e.printStackTrace();
            return "❌ Error deleting product";
        }
    }

    public void deleteEmployeeByUsername(String username) {
        jdbcTemplate.update("DELETE FROM Users WHERE username='" + username + "'");
    }
}
