package com.example;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.beans.factory.annotation.Autowired;

@SpringBootApplication
public class CarApp implements CommandLineRunner {

    private final Car car;

    @Autowired
    public CarApp(Car car) {
        this.car = car;
    }

    public static void main(String[] args) {
        SpringApplication.run(CarApp.class, args);
    }

    @Override
    public void run(String... args) {
        car.drive();
    }
}
