package com.example.company.controller;

import com.example.company.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/dashboard")
@CrossOrigin(origins = "http://localhost:3000")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @PostMapping("/data")
    public Map<String, Object> getDashboardData(@RequestBody Map<String, String> user) {
        String role = user.get("role");
        Map<String, Object> data = new HashMap<>();

        data.put("products", dashboardService.getProducts());
        data.put("revenue", dashboardService.getRevenue());

        if (role.equalsIgnoreCase("ADMIN") || role.equalsIgnoreCase("MANAGER")) {
            data.put("employees", dashboardService.getEmployees());
        }

        return data;
    }
}
