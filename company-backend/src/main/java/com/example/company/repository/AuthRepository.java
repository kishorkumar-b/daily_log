package com.example.company.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.*;

@Repository
public class AuthRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    /** 🔹 Find user by username and role (for login validation) */
    public List<Map<String, Object>> findUser(String username, String role) {
        String sql = "SELECT * FROM Users WHERE username=? AND role=?";
        return jdbcTemplate.queryForList(sql, username, role);
    }

    /** 🔹 Update password for a specific user */
    public int updatePassword(String username, String password) {
        String sql = "UPDATE Users SET password=? WHERE username=?";
        return jdbcTemplate.update(sql, password, username);
    }
    
}
