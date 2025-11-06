package com.example.dbswitch.controller;

import com.example.dbswitch.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/students")
public class StudentController {

    @Autowired
    private StudentService service;

    @GetMapping
    public List<Map<String, Object>> getAllStudents() {
        return service.listAll();
    }

    @PostMapping
    public String addStudent(@RequestBody Map<String, Object> data) {
        String name = (String) data.get("name");
        String course = (String) data.get("course");
        return service.addStudent(name, course);
    }
}
