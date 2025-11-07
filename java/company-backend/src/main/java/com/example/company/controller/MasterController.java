package com.example.company.controller;

import com.example.company.service.MasterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/master")
@CrossOrigin(origins = "http://localhost:3000")
public class MasterController {

    @Autowired
    private MasterService masterService;

    /** Add Employee — Only ADMIN & MANAGER allowed */
    @PostMapping("/addEmployee")
    public String addEmployee(@RequestBody Map<String, Object> emp) {
        String role = (String) emp.get("role");
        if (!role.equalsIgnoreCase("ADMIN") && !role.equalsIgnoreCase("MANAGER")) {
            return "Access Denied: You are not authorized to add employees.";
        }
        return masterService.addEmployee(emp);
    }

    /** Add Product — Only ADMIN & MANAGER allowed */
    @PostMapping("/addProduct")
    public String addProduct(@RequestBody Map<String, Object> prod) {
        String role = (String) prod.get("role");
        if (!role.equalsIgnoreCase("ADMIN") && !role.equalsIgnoreCase("MANAGER")) {
            return "Access Denied: You are not authorized to add products.";
        }
        return masterService.addProduct(prod);
    }

    /** ✅ Update Product Status (auto updates revenue if status = 'Completed') */
    @PutMapping("/updateProductStatus")
    public String updateProductStatus(@RequestBody Map<String, Object> req) {
        String role = (String) req.get("role");
        if (!role.equalsIgnoreCase("ADMIN") && !role.equalsIgnoreCase("MANAGER")) {
            return "Access Denied: You are not authorized to update product status.";
        }

        Integer productId = Integer.parseInt(req.get("productId").toString());
        String newStatus = (String) req.get("status");
        Double price = req.get("price") != null ? Double.parseDouble(req.get("price").toString()) : null;

        return masterService.updateProductStatus(productId, newStatus, price);
    }
}
