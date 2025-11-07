package com.example.company.service;

import com.example.company.repository.MasterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Map;

@Service
public class MasterService {

    @Autowired
    private MasterRepository masterRepository;

    public String addEmployee(Map<String, Object> emp) {
        masterRepository.addEmployee(emp);
        return "Employee added successfully!";
    }

    public String addProduct(Map<String, Object> prod) {
        masterRepository.addProduct(prod);
        return "Product added successfully and revenue updated!";
    }

    // ✅ New version of updateProductStatus that supports price
    public String updateProductStatus(int productId, String status, Double price) {
        masterRepository.updateProductStatus(productId, status, price);
        return "Product status and revenue updated successfully!";
    }
}
