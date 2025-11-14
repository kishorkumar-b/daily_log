package com.example.company.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@Repository
public class RevenueRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // ✅ Fetch all revenue data
    public List<Map<String, Object>> getAllRevenue(String month) {
        if (month == null || month.isEmpty()) {
            return jdbcTemplate.queryForList("SELECT * FROM TeamRevenue ORDER BY month DESC, team");
        } else {
            return jdbcTemplate.queryForList(
                "SELECT * FROM TeamRevenue WHERE month = ? ORDER BY team", month
            );
        }
    }

    // ✅ Recalculate only CURRENT MONTH (for SQL Server)
    public void recalculateRevenue() {
        String currentMonth = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM"));
        // Get all distinct teams that exist
        List<Map<String, Object>> teams = jdbcTemplate.queryForList("SELECT DISTINCT team FROM Products");

        for (Map<String, Object> t : teams) {
            String team = (String) t.get("team");

            // Calculate totals for this month only (SQL Server-friendly)
            Map<String, Object> totals = jdbcTemplate.queryForMap(
                """
                SELECT 
                    COUNT(*) AS no_of_sales, 
                    COALESCE(SUM(budget), 0) AS budget
                FROM Products
                WHERE team = ? 
                  AND CONVERT(CHAR(7), created_date, 126) = ?
                """,
                team, currentMonth
            );

            int noOfSales = ((Number) totals.get("no_of_sales")).intValue();
            double totalBudget = ((Number) totals.get("budget")).doubleValue();

            // ✅ Proper average revenue per sale
            double avgRevenue = (noOfSales > 0 ? totalBudget / noOfSales : 0);

            // ✅ Total revenue = total budget (or sum of actual sales value)
            double totalRevenue = totalBudget*2.4;

            

            // Update or insert for current month
            Integer exists = jdbcTemplate.queryForObject(
                "SELECT COUNT(*) FROM TeamRevenue WHERE team = ? AND month = ?",
                Integer.class, team, currentMonth
            );
            
            System.out.print(exists);

            if (exists != null && exists > 0) {
                jdbcTemplate.update(
                    "UPDATE TeamRevenue SET no_of_sales=?, budget=?, average_revenue=? WHERE team=? AND month=?",
                    noOfSales, totalBudget, totalRevenue, team, currentMonth
                );
            } else {
                jdbcTemplate.update(
                    "INSERT INTO TeamRevenue (team, month, no_of_sales, budget, average_revenue) VALUES (?, ?, ?, ?, ?)",
                    team, currentMonth, noOfSales, totalBudget, avgRevenue
                );
            }
        }
    }
}
