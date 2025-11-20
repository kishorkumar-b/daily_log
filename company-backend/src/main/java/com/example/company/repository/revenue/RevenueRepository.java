package com.example.company.repository.revenue;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Repository
public class RevenueRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<Map<String, Object>> getAllRevenue(String month) {
        if (month == null || month.isEmpty()) {
            return jdbcTemplate.queryForList(
                "SELECT * FROM TeamRevenue ORDER BY month DESC, team"
            );
        }
        // Concatenation query
        return jdbcTemplate.queryForList(
                "SELECT * FROM TeamRevenue WHERE month='" + month + "' ORDER BY team"
        );
    }

    public void recalculateRevenue() {
        String currentMonth = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM"));

        List<Map<String, Object>> teams =
                jdbcTemplate.queryForList("SELECT DISTINCT team FROM Products");

        for (Map<String, Object> t : teams) {
            String team = (String) t.get("team");

            // Concatenation query for totals
            Map<String, Object> totals = jdbcTemplate.queryForMap(
                "SELECT COUNT(*) AS sales, " +
                "COALESCE(SUM(budget),0) AS total_budget " +
                "FROM Products " +
                "WHERE team='" + team + "' " +
                "AND CONVERT(CHAR(7), created_date, 126)='" + currentMonth + "'"
            );

            int sales = ((Number) totals.get("sales")).intValue();
            double budget = ((Number) totals.get("total_budget")).doubleValue();
            double avg = sales > 0 ? budget / sales : 0;

            // Check if record exists
            Integer exists = jdbcTemplate.queryForObject(
                "SELECT COUNT(*) FROM TeamRevenue WHERE team='" + team + "' AND month='" + currentMonth + "'",
                Integer.class
            );

            if (exists > 0) {
                // Update existing
                jdbcTemplate.update(
                    "UPDATE TeamRevenue SET no_of_sales=" + sales +
                    ", budget=" + budget +
                    ", average_revenue=" + avg +
                    " WHERE team='" + team + "' AND month='" + currentMonth + "'"
                );
            } else {
                // Insert new
                jdbcTemplate.update(
                    "INSERT INTO TeamRevenue (team, month, no_of_sales, budget, average_revenue) VALUES ('" +
                    team + "', '" + currentMonth + "', " + sales + ", " + budget + ", " + avg + ")"
                );
            }
        }
    }
}
