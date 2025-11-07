package com.example.company.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.*;

@Repository
public class AuthRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<Map<String, Object>> login(String username, String password, String role) {
        String sql = "SELECT * FROM Users WHERE username=? AND password=? AND role=?";
        return jdbcTemplate.queryForList(sql, username, password, role);
    }
}
