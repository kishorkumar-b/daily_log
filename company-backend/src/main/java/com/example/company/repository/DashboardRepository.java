package com.example.company.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.*;

@Repository
public class DashboardRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<Map<String, Object>> getProducts() {
        // Updated for current Products table
        return jdbcTemplate.queryForList("SELECT * FROM Products");
    }

    public List<Map<String, Object>> getRevenue() {
        // Fetch from TeamRevenue table
        return jdbcTemplate.queryForList("SELECT * FROM TeamRevenue");
    }

    public List<Map<String, Object>> getUsers() {
        return jdbcTemplate.queryForList("SELECT username, role, team FROM Users");
    }

    public List<Map<String, Object>> getEmployees(String role, String team, String username) {
        String sql = "SELECT id, username, full_name, team, designation, salary, role, status FROM Users ORDER BY status DESC";

            return jdbcTemplate.queryForList(sql);
    }


}
