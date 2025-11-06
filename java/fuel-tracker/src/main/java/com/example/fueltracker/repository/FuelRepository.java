package com.example.fueltracker.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Map;

@Repository
public class FuelRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // Create table if not exists
    public void createTableIfNotExists() {
        String sql = """
            IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='fuel_log' AND xtype='U')
            CREATE TABLE fuel_log (
                id INT IDENTITY(1,1) PRIMARY KEY,
                vehicle_no VARCHAR(50),
                liters FLOAT,
                price FLOAT,
                log_date DATE
            )
        """;
        jdbcTemplate.execute(sql);
    }

    // Insert record
    public int addFuelLog(String vehicleNo, double liters, double price, String date) {
        String sql = "INSERT INTO fuel_log (vehicle_no, liters, price, log_date) VALUES (?, ?, ?, ?)";
        return jdbcTemplate.update(sql, vehicleNo, liters, price, date);
    }

    // Fetch all
    public List<Map<String, Object>> getAllFuelLogs() {
        String sql = "SELECT * FROM fuel_log ORDER BY log_date DESC";
        return jdbcTemplate.queryForList(sql);
    }
}
 