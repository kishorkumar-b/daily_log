package com.example.student.repository;

import com.example.student.model.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class StudentRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public int save(Student student) {
        String sql = "INSERT INTO students (name, course) VALUES (?, ?)";
        return jdbcTemplate.update(sql, student.getName(), student.getCourse());
    }
}
