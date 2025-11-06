package com.example.dbswitch.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class StudentRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<Map<String, Object>> getAllStudents() {
        return jdbcTemplate.queryForList("SELECT * FROM student");
    }

    public int addStudent(String name, String course) {
        return jdbcTemplate.update("INSERT INTO student (name, course) VALUES (?, ?)", name, course);
    }
}
