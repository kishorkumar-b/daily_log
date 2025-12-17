package com.example.company.service.auth;

import com.example.company.repository.auth.AuthRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AuthService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private AuthRepository authRepository;

    public String changePassword(String username, String newPassword) {
        if (username == null || username.isBlank()) {
            return "Invalid username ❌";
        }

        try {
            int updated = authRepository.updatePassword(username, newPassword);
            return updated > 0 ? "Password updated successfully ✅" : "User not found";
        } catch (Exception e) {
            return "Error updating password";
        }
    }

    public Map<String, Object> login(String username, String password, String status) {
        Map<String, Object> response = new HashMap<>();
        try {
            String sql = "SELECT id, username,full_name, password, role, status, team FROM Users WHERE username = ?";
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
                response.put("full_name", user.get("full_name"));

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

            String insertSql = "INSERT INTO Users(username, password) VALUES (?, ?)";
            jdbcTemplate.update(insertSql, username, password);

            return "User registered successfully ✅";
        } catch (Exception e) {
            return "Error registering user";
        }
    }

    public String setPassword(String username, String password) {
        try {
            String sql = "UPDATE Users SET password = ? WHERE username = ?";
            int updated = jdbcTemplate.update(sql, password, username);
            return updated > 0 ? "Password set successfully ✅" : "User not found";
        } catch (Exception e) {
            return "Error setting password";
        }
    }
    public String changeUsername(String oldUsername, String newUsername) {
        try {
            // check if new username already exists
            String checkSql = "SELECT COUNT(*) FROM Users WHERE username = ?";
            Integer exists = jdbcTemplate.queryForObject(checkSql, Integer.class, newUsername);

            if (exists != null && exists > 0) {
                return "Username already taken ❌";
            }

            // update username
            String updateSql = "UPDATE Users SET username = ? WHERE username = ?";
            int updated = jdbcTemplate.update(updateSql, newUsername, oldUsername);

            return updated > 0 ? "Username updated successfully ✅" : "User not found";
        } catch (Exception e) {
            return "Error updating username ❌";
        }
    }
    public String updateFullName(String username, String fullName) {
        try {
            String sql = "UPDATE Users SET full_name = ? WHERE username = ?";
            int updated = jdbcTemplate.update(sql, fullName, username);
            return updated > 0 ? "Full name updated" : "User not found";
        } catch (Exception e) {
            return "Error updating full name";
        }
    }



}
