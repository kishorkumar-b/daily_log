package com.example.fueltracker;

import com.example.fueltracker.service.FuelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class FuelTrackerApplication extends SpringBootServletInitializer implements CommandLineRunner {

    @Autowired
    private FuelService service;

    public static void main(String[] args) {
        SpringApplication.run(FuelTrackerApplication.class, args);
    }

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        // This method is required ONLY for WAR deployment on external Tomcat
        return application.sources(FuelTrackerApplication.class);
    }

    @Override
    public void run(String... args) {
        // Initialize database once app starts
        service.initDatabase();
        System.out.println("✅ Fuel Tracker app started and DB ready!");
    }
}
