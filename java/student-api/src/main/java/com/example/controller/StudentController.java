package com.example.controller;

import com.example.model.Student;
import com.example.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/students")
public class StudentController {

    @Autowired
    private StudentRepository repo;

    // Create student
    @PostMapping
    public Student addStudent(@RequestBody Student student) {
        return repo.save(student);
    }

    // Read all
    @GetMapping
    public List<Student> getAll() {
        return repo.findAll();
    }

    // Read by ID
    @GetMapping("/{id}")
    public Student getById(@PathVariable Long id) {
        return repo.findById(id).orElse(null);
    }

    // Update
    @PutMapping("/{id}")
    public Student update(@PathVariable Long id, @RequestBody Student newStudent) {
        return repo.findById(id)
                .map(s -> {
                    s.setName(newStudent.getName());
                    s.setCourse(newStudent.getCourse());
                    return repo.save(s);
                }).orElseGet(() -> {
                    newStudent.setId(id);
                    return repo.save(newStudent);
                });
    }

    // Delete
    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        repo.deleteById(id);
        return "Student deleted with ID: " + id;
    }
}
