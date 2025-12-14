package com.example.company.controller;

import com.example.company.service.auth.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    /** 🔹 Login (role auto-detected) */
    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> user) {
        return authService.login(user.get("username"), user.get("password"), user.get("status"));
    }

    /** 🔹 Check if password is null (for redirecting) */
    @PostMapping("/checkUser")
    public Map<String, Object> checkUser(@RequestBody Map<String, String> req) {
        return authService.checkUser(req.get("username"));
    }

    /** 🔹 Set password (first-time user) */
    @PostMapping("/setPassword")
    public String setPassword(@RequestBody Map<String, String> req) {
        return authService.setPassword(req.get("username"), req.get("password"));
    }
    /** 🔹 Register new user */
    @PostMapping("/register")
    public String register(@RequestBody Map<String, String> req) {
        String username = req.get("username");
        String password = req.get("password");
        return authService.registerUser(username, password);
    }
    /** 🔹 Change password for existing user */
    @PostMapping("/changePassword")
    public String changePassword(@RequestBody Map<String, String> req) {

        // ❌ If UI tries to send a different username, block it
        if (req.containsKey("newUsername")) {
            return "Username cannot be changed ❌";
        }

        String username = req.get("username");
        String newPassword = req.get("password");

        return authService.changePassword(username, newPassword);
    }
    @PostMapping("/changeUsername")
    public String changeUsername(@RequestBody Map<String, String> req) {

        String oldUsername = req.get("oldUsername");
        String newUsername = req.get("newUsername");

        if (newUsername == null || newUsername.isBlank()) {
            return "New username cannot be empty ❌";
        }

        return authService.changeUsername(oldUsername, newUsername);
    }
    @PostMapping("/updateFullName")
    public String updateFullName(@RequestBody Map<String, String> req) {
        return authService.updateFullName(req.get("username"), req.get("fullName"));
    }




}
