package com.example.company.service;

import com.example.company.repository.AuthRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class AuthService {

    @Autowired
    private AuthRepository authRepository;

    public Map<String, Object> login(String username, String password, String role) {
        List<Map<String, Object>> result = authRepository.login(username, password, role);
        Map<String, Object> response = new HashMap<>();

        if (result.isEmpty()) {
            response.put("status", "fail");
            response.put("message", "Invalid credentials");
        } else {
            response.put("status", "success");
            Map<String, Object> user = result.get(0);
            response.put("role", user.get("role"));
            response.put("username", user.get("username"));
        }
        return response;
    }
}
