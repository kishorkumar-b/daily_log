package com.example.company.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class AuthService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    /** 🔹 Login (role automatically fetched) */
    public Map<String, Object> login(String username, String password, String status) {
        Map<String, Object> response = new HashMap<>();

        try {
            String sql = "SELECT id, username, password, role,status,team FROM Users WHERE username = ?";
            Map<String, Object> user = jdbcTemplate.queryForMap(sql, username);

            if (user.get("password") == null) {
                response.put("status", "set_password");
                response.put("username", username);
                response.put("role", user.get("role"));
                return response;
            }

            if (user.get("password").equals(password)) {
                response.put("status", "success");
                response.put("username", username);
                response.put("role", user.get("role"));
                response.put("active", user.get("status"));
                response.put("team", user.get("team"));
                response.put("id", user.get("id"));
            } else {
                response.put("status", "fail");
                response.put("message", "Invalid password");
            }
        } catch (Exception e) {
            response.put("status", "fail");
            response.put("message", "User not found");
        }

        return response;
    }

    /** 🔹 Check if password is null and return role */
    public Map<String, Object> checkUser(String username) {
        Map<String, Object> response = new HashMap<>();
        try {
            String sql = "SELECT username, password, role FROM Users WHERE username = ?";
            Map<String, Object> user = jdbcTemplate.queryForMap(sql, username);

            if (user.get("password") == null) {
                response.put("status", "set_password");
            } else {
                response.put("status", "ok");
            }

            response.put("username", username);
            response.put("role", user.get("role"));
        } catch (Exception e) {
            response.put("status", "fail");
            response.put("message", "User not found");
        }
        return response;
    }

    public String registerUser(String username, String password) {
        try {
            String checkSql = "SELECT COUNT(*) FROM Users WHERE username = ?";
            Integer count = jdbcTemplate.queryForObject(checkSql, Integer.class, username);
            if (count != null && count > 0) return "User already exists!";

            // Default role as PENDING
            String insertSql = "INSERT INTO Users(username, password) VALUES (?, ?)";
            jdbcTemplate.update(insertSql, username, password);
            return "User registered successfully ✅";
        } catch (Exception e) {
            e.printStackTrace();
            return "Error registering user";
        }
    }



    /** 🔹 Set new password */
    public String setPassword(String username, String password) {
        try {
            String sql = "UPDATE Users SET password = ? WHERE username = ?";
            int updated = jdbcTemplate.update(sql, password, username);
            return updated > 0 ? "Password set successfully ✅" : "User not found";
        } catch (Exception e) {
            return "Error setting password";
        }
    }
}
