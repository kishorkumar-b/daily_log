package com.example.employeeui.controller;

import com.example.employeeui.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;


import java.util.Map;

@Controller
public class EmployeeController {

    @Autowired
    private EmployeeRepository repo;

    @GetMapping("/")
    public String viewHomePage(Model model) {
        model.addAttribute("employees", repo.findAll());
        return "index";
    }

    @GetMapping("/add")
    public String addEmployeeForm() {
        return "add";
    }

    @PostMapping("/save")
    public String saveEmployee(@RequestParam String name,
                               @RequestParam String department,
                               @RequestParam double salary) {
        repo.save(name, department, salary);
        return "redirect:/";
    }

    @GetMapping("/edit/{id}")
    public String editEmployeeForm(@PathVariable int id, Model model) {
        Map<String, Object> employee = repo.findById(id);
        model.addAttribute("employee", employee);
        return "edit";
    }

    @PostMapping("/update")
    public String updateEmployee(@RequestParam int id,
                                 @RequestParam String name,
                                 @RequestParam String department,
                                 @RequestParam double salary) {
        repo.update(id, name, department, salary);
        return "redirect:/";
    }

    @GetMapping("/delete/{id}")
    public String deleteEmployee(@PathVariable int id) {
        repo.delete(id);
        return "redirect:/";
    }
}
