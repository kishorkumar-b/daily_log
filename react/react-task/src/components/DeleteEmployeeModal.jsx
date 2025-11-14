import React, { useState } from "react";
import api from "../api/axiosConfig";

export default function DeleteEmployeeModal({ employee, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);

const handleDelete = async () => {
  try {
    setLoading(true);
    // Replace 'loggedUser' with your current user variable
    const loggedUser = "currentLoggedInUser"; 
    await api.delete(`/master/employee/delete/${employee.username}?loggedUser=${loggedUser}`);
    onSuccess(employee.id);
  } catch (err) {
    console.error("Delete failed:", err);
    alert("Failed to delete employee");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-80 text-center">
        <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
        <p className="mb-6 text-gray-700">
          Are you sure you want to delete{" "}
          <strong>{employee?.full_name}</strong>?
        </p>
        <div className="flex justify-center gap-4">
          <button
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
