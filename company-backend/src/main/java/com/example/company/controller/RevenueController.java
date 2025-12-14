package com.example.company.controller;

import com.example.company.service.revenue.RevenueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/revenue")
@CrossOrigin(origins = "*")
public class RevenueController {

    @Autowired
    private RevenueService revenueService;

    @GetMapping("/all")
    public List<Map<String, Object>> getAllRevenue(@RequestParam(required = false) String month) {
        return revenueService.getAllRevenue(month);
    }
}
