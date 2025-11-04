package com.example.student.controller;

import com.example.student.model.Student;
import com.example.student.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.ui.Model;

@Controller
public class StudentController {

    @Autowired
    private StudentRepository repo;

    // Show form (GET)
    @GetMapping("/")
    public String showForm(Model model) {
        System.out.println("Form loaded");
        model.addAttribute("student", new Student());
        return "register";  // loads register.html (in templates folder)
    }

    // Handle form submission (POST)
    @PostMapping("/register")
    public String registerStudent(@ModelAttribute Student student, Model model) {
        System.out.println("Student registered: " + student.getName());
        int rows = repo.save(student);
        model.addAttribute("message", rows + " student registered successfully!");
        return "register";
    }
}
