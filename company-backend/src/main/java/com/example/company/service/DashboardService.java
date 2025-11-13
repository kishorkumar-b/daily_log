package com.example.company.service;

import com.example.company.repository.DashboardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;

@Service
public class DashboardService {

    @Autowired
    private DashboardRepository dashboardRepository;

    /** 🔹 Fetch all products */
    public List<Map<String, Object>> getProducts() {
        return dashboardRepository.getProducts();
    }

    /** 🔹 Fetch revenue summary per team */
    public List<Map<String, Object>> getRevenue() {
        return dashboardRepository.getRevenue();
    }

    /** 🔹 Fetch all employees from Users table */
    public List<Map<String, Object>> getEmployees(String role, String team, String username) {
        return dashboardRepository.getEmployees(role, team, username);
    }



    /** 🔹 Fetch all users (username, role, team) */
    public List<Map<String, Object>> getUsers() {
        return dashboardRepository.getUsers();
    }
}
