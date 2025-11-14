package com.example.company.service;

import com.example.company.repository.MasterRepository;
import com.example.company.repository.RevenueRepository; // 🔹 Import revenue repo
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Map;

@Service
public class MasterService {

    @Autowired
    private MasterRepository masterRepository;

    @Autowired
    private RevenueRepository revenueRepository; // ✅ Add this

    /** Update employee details */
    public String updateEmployee(Map<String, Object> emp) {
        try {
            masterRepository.updateEmployeeDetails(emp);
            return "Employee details updated successfully ✅";
        } catch (Exception e) {
            e.printStackTrace();
            return "Error updating employee details";
        }
    }

    public String addProduct(Map<String, Object> prod) {
        String result = masterRepository.addProduct(prod);

        // FIX: update only current month revenue
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


    /** Delete employee */
    public String deleteEmployee(String username, String loggedUser) {
        try {
            if (loggedUser != null && loggedUser.equals(username)) {
                return "❌ You cannot delete your own account!";
            }

            masterRepository.deleteEmployeeByUsername(username);
            return "✅ Employee deleted successfully";
        } catch (Exception e) {
            e.printStackTrace();
            return "❌ Error deleting employee";
        }
    }
}
