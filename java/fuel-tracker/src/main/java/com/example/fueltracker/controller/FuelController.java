package com.example.fueltracker.controller;

import com.example.fueltracker.service.FuelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/fuel")
@CrossOrigin(origins = "http://localhost:3000")
//@CrossOrigin(origins = "*")
public class FuelController {


    private static final Logger logger = LoggerFactory.getLogger(FuelController.class);

    @Autowired
    private FuelService service;

    @PostMapping("/add")
        public String addFuelLog(@RequestParam String vehicleNo,
                             @RequestParam double liters,
                             @RequestParam double price,
                             @RequestParam String date) {
        logger.info("📘 Request to add fuel log for vehicle: {}", vehicleNo);

        try {
            service.logFuel(vehicleNo, liters, price, date);
            logger.debug("✅ Fuel log added: Vehicle={} Liters={} Price={} Date={}", vehicleNo, liters, price, date);
            return "✅ Fuel log added successfully!";
        } catch (Exception e) {
            logger.error("❌ Error adding fuel log for vehicle {}: {}", vehicleNo, e.getMessage());
            return "⚠️ Failed to add fuel log!";
        }
    }

    @GetMapping("/logs")
    public List<Map<String, Object>> getFuelLogs() {
        logger.info("📗 Fetching all fuel logs...");
        List<Map<String, Object>> logs = service.fetchAllLogs();
        logger.debug("Fetched {} records from database", logs.size());
        return logs;
    }
}
