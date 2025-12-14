package com.example.company.controller;

import com.example.company.service.master.MasterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/master")
@CrossOrigin(origins = "*")
public class MasterController {

    @Autowired
    private MasterService masterService;

    /** Update employee details */
    @PostMapping("/employee/update")
    public String updateEmployee(@RequestBody Map<String, Object> emp) {
        return masterService.updateEmployee(emp);
    }


    /** Add product */
    @PostMapping("/product/add")
    public String addProduct(@RequestBody Map<String, Object> prod) {
        return masterService.addProduct(prod);
    }

    /** Update product */
    @PostMapping("/product/update")
    public String updateProduct(@RequestBody Map<String, Object> prod) {
        return masterService.updateProduct(prod);
    }

    /** Delete product */
    @DeleteMapping("/product/delete/{productId}")
    public String deleteProduct(@PathVariable int productId) {
        return masterService.deleteProduct(productId);
    }

    /** Delete employee */
    @DeleteMapping("/employee/delete/{username}")
    public String deleteEmployee(@PathVariable String username, @RequestParam String loggedUser) {
        return masterService.deleteEmployee(username, loggedUser);
    }

}
