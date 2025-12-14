package com.example.company.controller;

import com.example.company.service.dashboard.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    /** 🔹 Get all dashboard data */
    @PostMapping("/data")
    public Map<String, Object> getDashboardData(@RequestBody Map<String, String> user) {
        String role = user.get("role");
        String team = user.get("team");
        String username = user.get("username"); // ✅ added
        Map<String, Object> data = new HashMap<>();

        data.put("products", dashboardService.getProducts());
        data.put("revenue", dashboardService.getRevenue());

        // ✅ Employees now also get their own data
        if ("ADMIN".equalsIgnoreCase(role) || 
            "MANAGER".equalsIgnoreCase(role) || 
            "EMPLOYEE".equalsIgnoreCase(role)) {
            data.put("employees", dashboardService.getEmployees(role, team, username));
        }

        if ("ADMIN".equalsIgnoreCase(role)) {
            data.put("users", dashboardService.getUsers());
        }

        return data;
    }


}
