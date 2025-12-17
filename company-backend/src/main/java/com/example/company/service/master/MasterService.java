package com.example.company.service.master;

import com.example.company.repository.master.MasterRepository;
import com.example.company.repository.revenue.RevenueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class MasterService {

    @Autowired
    private MasterRepository masterRepository;

    @Autowired
    private RevenueRepository revenueRepository;

    public String updateEmployee(Map<String, Object> emp) {
        try {
            masterRepository.updateEmployeeDetails(emp);
            return "Employee details updated successfully ✅";
        } catch (Exception e) {
            return "Error updating employee details";
        }
    }

    public String addProduct(Map<String, Object> prod) {
        String result = masterRepository.addProduct(prod);
        revenueRepository.recalculateRevenue();
        return result + " | Current month revenue updated";
    }

    public String updateProduct(Map<String, Object> prod) {
        String result = masterRepository.updateProduct(prod);
        revenueRepository.recalculateRevenue();
        return result + " | Current month revenue updated";
    }

    public String deleteProduct(int id) {
        String result = masterRepository.deleteProduct(id);
        revenueRepository.recalculateRevenue();
        return result + " | Current month revenue updated";
    }

    public String deleteEmployee(String username, String loggedUser) {
        try {
            if (loggedUser != null && loggedUser.equals(username)) {
                return "❌ You cannot delete your own account!";
            }

            masterRepository.deleteEmployeeByUsername(username);
            return "✅ Employee deleted successfully";
        } catch (Exception e) {
            return "❌ Error deleting employee";
        }
    }
}
