package com.example.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class EmployeeRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<Map<String, Object>> findAll() {
        return jdbcTemplate.queryForList("SELECT * FROM Employees");
    }

    public Map<String, Object> findById(int id) {
        return jdbcTemplate.queryForMap("SELECT * FROM Employees WHERE id=?", id);
    }

    public void save(String name, String department, double salary) {
        jdbcTemplate.update("INSERT INTO Employees (name, department, salary) VALUES (?, ?, ?)",
                name, department, salary);
    }

    public void update(int id, String name, String department, double salary) {
        jdbcTemplate.update("UPDATE Employees SET name=?, department=?, salary=? WHERE id=?",
                name, department, salary, id);
    }

    public void delete(int id) {
        jdbcTemplate.update("DELETE FROM Employees WHERE id=?", id);
    }
}
