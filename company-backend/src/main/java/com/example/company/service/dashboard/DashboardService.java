package com.example.company.service.dashboard;

import com.example.company.repository.dashboard.DashboardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class DashboardService {

    @Autowired
    private DashboardRepository dashboardRepository;

    public List<Map<String, Object>> getProducts() {
        return dashboardRepository.getProducts();
    }

    public List<Map<String, Object>> getRevenue() {
        return dashboardRepository.getRevenue();
    }

    public List<Map<String, Object>> getEmployees(String role, String team, String username) {
        return dashboardRepository.getEmployees(role, team, username);
    }

    public List<Map<String, Object>> getUsers() {
        return dashboardRepository.getUsers();
    }
}
