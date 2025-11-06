package com.example.fueltracker.service;

import com.example.fueltracker.repository.FuelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;

@Service
public class FuelService {

    @Autowired
    private FuelRepository repository;

    public void initDatabase() {
        repository.createTableIfNotExists();
    }

    public int logFuel(String vehicleNo, double liters, double price, String date) {
        return repository.addFuelLog(vehicleNo, liters, price, date);
    }

    public List<Map<String, Object>> fetchAllLogs() {
        return repository.getAllFuelLogs();
    }
}
