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

    /** Add product */
    public String addProduct(Map<String, Object> prod) {
        try {
            String result = masterRepository.addProduct(prod);

            // ✅ Recalculate revenue only for the current month
            revenueRepository.recalculateRevenue();

            return result + " | Revenue updated ✅";
        } catch (Exception e) {
            e.printStackTrace();
            return "❌ Error adding product";
        }
    }

    /** Update product */
    public String updateProduct(Map<String, Object> prod) {
        try {
            String result = masterRepository.updateProduct(prod);

            // ✅ Trigger recalculation for the current month
            revenueRepository.recalculateRevenue();

            return result + " | Revenue updated ✅";
        } catch (Exception e) {
            e.printStackTrace();
            return "❌ Error updating product";
        }
    }

    /** Delete product */
    public String deleteProduct(int productId) {
        try {
            String result = masterRepository.deleteProduct(productId);

            // ✅ Trigger recalculation again after deletion
            revenueRepository.recalculateRevenue();

            return result + " | Revenue updated ✅";
        } catch (Exception e) {
            e.printStackTrace();
            return "❌ Error deleting product";
        }
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
