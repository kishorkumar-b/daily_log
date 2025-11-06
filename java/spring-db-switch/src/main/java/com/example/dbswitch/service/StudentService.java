package com.example.dbswitch.service;

import com.example.dbswitch.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class StudentService {

    @Autowired
    private StudentRepository repo;

    public List<Map<String, Object>> listAll() {
        return repo.getAllStudents();
    }

    public String addStudent(String name, String course) {
        repo.addStudent(name, course);
        return "✅ Student added successfully!";
    }
}
