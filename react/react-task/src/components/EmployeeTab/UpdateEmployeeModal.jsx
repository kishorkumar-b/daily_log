import React, { useState } from "react";
import {api} from "../../api/axiosConfig";

export default function UpdateEmployeeModal({ employee, onClose, onSuccess }) {
  const [editData, setEditData] = useState({ ...employee });
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setEditData({ ...editData, [field]: value });
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      // Ensure ID is not empty
      if (!editData.id) {
        alert("Employee ID is required!");
        return;
      }

      await api.post("/master/employee/update", editData);
      onSuccess(editData);
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update employee");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-96">
        <h3 className="text-lg font-semibold mb-4">Edit Employee</h3>

        <div className="space-y-3">
          {/* ✅ Add ID field */}

          <label className="block text-sm font-medium">
            Full Name
            <input
              type="text"
              value={editData.full_name || ""}
              onChange={(e) => handleChange("full_name", e.target.value)}
              className="w-full border p-2 rounded"
            />
          </label>

                      <label className="block text-sm font-medium">
              Team
              <select
                value={editData.team || ""}
                onChange={(e) => handleChange("team", e.target.value)}
                className="w-full border p-2 rounded"
              >
                <option value="">Select Team</option>
                <option value="SDMS">SDMS</option>
                <option value="LIMS">LIMS</option>
                <option value="QA">QA</option>
                <option value="DevOps">DevOps</option>
                {/* Add more teams as needed */}
              </select>
            </label>

            <label className="block text-sm font-medium mt-2">
              Designation
              <select
                value={editData.designation || ""}
                onChange={(e) => handleChange("designation", e.target.value)}
                className="w-full border p-2 rounded"
              >
                <option value="">Select Designation</option>
                <option value="Manager">Manager</option>
                <option value="Team Lead">Team Lead</option>
                <option value="Developer">Developer</option>
                <option value="Tester">Tester</option>
                {/* Add more designations as needed */}
              </select>
            </label>


          <label className="block text-sm font-medium">
            Role
            <select
              value={editData.role || ""}
              onChange={(e) => handleChange("role", e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="MANAGER">MANAGER</option>
              <option value="EMPLOYEE">EMPLOYEE</option>
            </select>
          </label>

          <label className="block text-sm font-medium">
            Salary
            <input
              type="number"
              value={editData.salary || 0}
              onChange={(e) => handleChange("salary", e.target.value)}
              className="w-full border p-2 rounded"
            />
          </label>

          <label className="block text-sm font-medium">
            Status
            <select
              value={editData.status || "Active"}
              onChange={(e) => handleChange("status", e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="Inprogress">Inprogress</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </label>
        </div>

        <div className="flex justify-end mt-6 space-x-3">
          <button
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
