package com.example.company.service;

import com.example.company.repository.RevenueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class RevenueService {

    @Autowired
    private RevenueRepository revenueRepository;

    public List<Map<String, Object>> getAllRevenue(String month) {
        // Recalculate before fetching
        revenueRepository.recalculateRevenue();
        return revenueRepository.getAllRevenue(month);
    }
}
