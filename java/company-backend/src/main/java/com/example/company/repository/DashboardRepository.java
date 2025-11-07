package com.example.company.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.*;

@Repository
public class DashboardRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<Map<String, Object>> getEmployees() {
        return jdbcTemplate.queryForList("SELECT * FROM Employees");
    }

    public List<Map<String, Object>> getProducts() {
        return jdbcTemplate.queryForList("SELECT * FROM Products");
    }

    public List<Map<String, Object>> getRevenue() {
        return jdbcTemplate.queryForList("SELECT * FROM Revenue");
    }
}
