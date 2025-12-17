package com.example.company.repository.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.*;

@Repository
public class AuthRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<Map<String, Object>> findUser(String username, String role) {
        // Unsafe concatenation
        String sql = "SELECT * FROM Users WHERE username='" + username + "' AND role='" + role + "'";
        return jdbcTemplate.queryForList(sql);
    }

    public int updatePassword(String username, String password) {
        // Unsafe concatenation
        String sql = "UPDATE Users SET password='" + password + "' WHERE username='" + username + "'";
        return jdbcTemplate.update(sql);
    }
}
