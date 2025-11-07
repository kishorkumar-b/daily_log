package com.example.company.service;

import com.example.company.repository.DashboardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class DashboardService {

    @Autowired
    private DashboardRepository dashboardRepository;

    public List<Map<String, Object>> getEmployees() {
        return dashboardRepository.getEmployees();
    }

    public List<Map<String, Object>> getProducts() {
        return dashboardRepository.getProducts();
    }

    public List<Map<String, Object>> getRevenue() {
        List<Map<String, Object>> revenueList = dashboardRepository.getRevenue();

        // Add percentage calculation for target vs actual revenue if both exist
        for (Map<String, Object> row : revenueList) {
            Double target = row.get("target") != null ? Double.parseDouble(row.get("target").toString()) : 0.0;
            Double actual = row.get("revenue") != null ? Double.parseDouble(row.get("revenue").toString()) : 0.0;
            double percentage = target > 0 ? (actual / target) * 100 : 0.0;
            row.put("achievement", String.format("%.2f", percentage));
        }

        return revenueList;
    }
}
