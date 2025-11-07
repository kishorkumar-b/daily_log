package com.example.company.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.time.format.TextStyle;
import java.util.Locale;
import java.util.Map;

@Repository
public class MasterRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    /** Add new employee */
    public void addEmployee(Map<String, Object> emp) {
        String sql = "INSERT INTO Employees(name, email, department, salary) VALUES (?, ?, ?, ?)";
        jdbcTemplate.update(sql, emp.get("name"), emp.get("email"), emp.get("department"), emp.get("salary"));
    }

    /** Add new product */
    public void addProduct(Map<String, Object> prod) {
        String name = (String) prod.get("name");
        String category = (String) prod.get("category");
        Double price = Double.parseDouble(prod.get("price").toString());
        String status = (String) prod.get("status");

        String sql = "INSERT INTO Products(name, category, price, status) VALUES (?, ?, ?, ?)";
        jdbcTemplate.update(sql, name, category, price, status);

        if ("COMPLETED".equalsIgnoreCase(status)) {
            updateRevenue(price);
        }
    }

    /** ✅ Update product status, optional price, and revenue automatically */
    public void updateProductStatus(int productId, String newStatus, Double newPrice) {
        // 1️⃣ Get current price
        String getPriceSql = "SELECT price FROM Products WHERE id = ?";
        Double currentPrice = jdbcTemplate.queryForObject(getPriceSql, Double.class, productId);

        Double finalPrice = currentPrice;

        // 2️⃣ If price is provided, update it
        if (newPrice != null) {
            jdbcTemplate.update("UPDATE Products SET price = ? WHERE id = ?", newPrice, productId);
            finalPrice = newPrice;
        }

        // 3️⃣ Update status
        jdbcTemplate.update("UPDATE Products SET status = ? WHERE id = ?", newStatus, productId);

        // 4️⃣ If Completed → add to revenue
        if ("COMPLETED".equalsIgnoreCase(newStatus)) {
            updateRevenue(finalPrice);
        }
    }

    /** 🔁 Revenue update helper */
    private void updateRevenue(Double price) {
        String month = LocalDate.now().getMonth().getDisplayName(TextStyle.FULL, Locale.ENGLISH);

        String checkSql = "SELECT COUNT(*) FROM Revenue WHERE month = ?";
        Integer count = jdbcTemplate.queryForObject(checkSql, Integer.class, month);

        if (count != null && count > 0) {
            String updateSql = "UPDATE Revenue SET revenue = revenue + ? WHERE month = ?";
            jdbcTemplate.update(updateSql, price, month);
        } else {
            String insertSql = "INSERT INTO Revenue(month, revenue) VALUES (?, ?)";
            jdbcTemplate.update(insertSql, month, price);
        }
    }
}
