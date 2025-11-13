package com.example.company.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.Map;

@Repository
public class MasterRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    /** 🔹 Add or update employee details */
    public void updateEmployeeDetails(Map<String, Object> emp) {
    	String id = (String) emp.get("id");
        String username = (String) emp.get("username");
        String fullName = (String) emp.get("full_name");
        String team = (String) emp.get("team");
        String designation = (String) emp.get("designation");
        Double salary = emp.get("salary") != null ? Double.parseDouble(emp.get("salary").toString()) : null;
        String status = (String) emp.getOrDefault("status", "Active");
        String role = (String) emp.getOrDefault("role", null);

        // ✅ Fixed query syntax — commas between columns
        String sql = "UPDATE Users SET id=?, full_name=?, team=?, designation=?, salary=?, status=?, role=? WHERE username=?";

        jdbcTemplate.update(sql, id, fullName, team, designation, salary, status, role, username);

        // ✅ Optional: Recalculate revenue after update
        if (team != null) {
            recalcTeamRevenue(team);
        }
    }


    /** 🔹 Add new product + auto-update TeamRevenue */
    public String addProduct(Map<String, Object> prod) {
        try {
            Integer productId = prod.get("product_id") != null ? Integer.parseInt(prod.get("product_id").toString()) : null;
            String productName = (String) prod.get("product_name");
            Double budget = prod.get("budget") != null ? Double.parseDouble(prod.get("budget").toString()) : 0.0;
            Integer totalEmployees = prod.get("total_employees") != null ? Integer.parseInt(prod.get("total_employees").toString()) : 0;
            String team = (String) prod.getOrDefault("team", "Unknown");
            String status = (String) prod.getOrDefault("status", "Active");
            String role = (String) prod.getOrDefault("role", null);

            if (role != null && role.equalsIgnoreCase("EMPLOYEE")) {
                return "⛔ You are not authorized to add products.";
            }

            if (productId == null || productName == null || productName.isBlank()) {
                return "⚠️ Please provide Product ID and Product Name.";
            }

            // Duplicate check
            int idCount = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM Products WHERE product_id = ?", Integer.class, productId);
            if (idCount > 0) return "❌ Product ID already exists!";

            int nameCount = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM Products WHERE product_name = ?", Integer.class, productName);
            if (nameCount > 0) return "❌ Product name already exists!";

            String insertSql = "INSERT INTO Products (product_id, product_name, budget, total_employees, team, status) VALUES (?, ?, ?, ?, ?, ?)";
            jdbcTemplate.update(insertSql, productId, productName, budget, totalEmployees, team, status);

            // ✅ Recalculate team revenue based on all products
            recalcTeamRevenue(team);

            return "✅ Product added successfully";
        } catch (Exception e) {
            e.printStackTrace();
            return "❌ Error adding product: " + e.getMessage();
        }
    }

    /** 🔹 Update product + recalc TeamRevenue */
    public String updateProduct(Map<String, Object> prod) {
        try {
            Integer productId = Integer.parseInt(prod.get("product_id").toString());
            String productName = (String) prod.get("product_name");
            Double budget = prod.get("budget") != null ? Double.parseDouble(prod.get("budget").toString()) : null;
            Integer totalEmployees = prod.get("total_employees") != null ? Integer.parseInt(prod.get("total_employees").toString()) : null;
            String status = (String) prod.getOrDefault("status", "Active");
            String team = (String) prod.getOrDefault("team", null);

            // Ensure product exists
            int count = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM Products WHERE product_id = ?", Integer.class, productId);
            if (count == 0) return "❌ Product not found!";

            String sql = "UPDATE Products SET product_name=?, budget=?, total_employees=?, team=?, status=? WHERE product_id=?";
            jdbcTemplate.update(sql, productName, budget, totalEmployees, team, status, productId);

            // ✅ Recalculate revenue after update
            recalcTeamRevenue(team);

            return "✅ Product updated successfully";
        } catch (Exception e) {
            e.printStackTrace();
            return "❌ Error updating product: " + e.getMessage();
        }
    }

    /** 🔹 Delete product + auto-adjust TeamRevenue */
    public String deleteProduct(int productId) {
        try {
            String teamSql = "SELECT team FROM Products WHERE product_id = ?";
            String team = jdbcTemplate.queryForObject(teamSql, String.class, productId);

            jdbcTemplate.update("DELETE FROM Products WHERE product_id = ?", productId);

            // ✅ Recalculate or remove team revenue
            cleanOrRecalcTeamRevenue(team);

            return "✅ Product deleted successfully";
        } catch (Exception e) {
            e.printStackTrace();
            return "❌ Error deleting product: " + e.getMessage();
        }
    }

    /** 🔹 Recalculate revenue from all products for a team */
    private void recalcTeamRevenue(String team) {
        try {
            String calcSql = "SELECT SUM(budget) AS total_budget, COUNT(*) AS total_sales FROM Products WHERE team = ?";
            Map<String, Object> result = jdbcTemplate.queryForMap(calcSql, team);

            double totalBudget = result.get("total_budget") != null ? ((Number) result.get("total_budget")).doubleValue() : 0.0;
            int totalSales = result.get("total_sales") != null ? ((Number) result.get("total_sales")).intValue() : 0;
            double avgRevenue = totalSales > 0 ? totalBudget / totalSales : 0.0;

            int exists = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM TeamRevenue WHERE team = ?", Integer.class, team);

            if (exists > 0) {
                String updateSql = "UPDATE TeamRevenue SET no_of_sales=?, budget=?, average_revenue=? WHERE team=?";
                jdbcTemplate.update(updateSql, totalSales, totalBudget, avgRevenue, team);
            } else {
                String insertSql = "INSERT INTO TeamRevenue(team, no_of_sales, budget, average_revenue) VALUES (?, ?, ?, ?)";
                jdbcTemplate.update(insertSql, team, totalSales, totalBudget, avgRevenue);
            }
        } catch (Exception e) {
            System.err.println("⚠️ Error recalculating revenue for " + team + ": " + e.getMessage());
        }
    }

    /** 🔹 Remove team revenue if team has no products */
    private void cleanOrRecalcTeamRevenue(String team) {
        String countSql = "SELECT COUNT(*) FROM Products WHERE team = ?";
        int productCount = jdbcTemplate.queryForObject(countSql, Integer.class, team);

        if (productCount == 0) {
            jdbcTemplate.update("DELETE FROM TeamRevenue WHERE team = ?", team);
        } else {
            recalcTeamRevenue(team);
        }
    }

    /** 🔹 Delete employee by username */
    public void deleteEmployeeByUsername(String username) {
        jdbcTemplate.update("DELETE FROM Users WHERE username = ?", username);
    }
}
