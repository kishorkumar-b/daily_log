import React, { useState } from "react";
import api from "../../api/axiosConfig";

export default function UpdateProductModal({ product, onClose, onSuccess }) {
  const [editData, setEditData] = useState({ ...product });
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setEditData({ ...editData, [field]: value });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await api.post("/master/product/update", editData);
      onSuccess(editData);
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-96">
        <h3 className="text-lg font-semibold mb-4">Edit Product</h3>

        <div className="space-y-3">
          <label className="block text-sm font-medium">
            Product Name
            <input
              type="text"
              value={editData.product_name || ""}
              onChange={(e) => handleChange("product_name", e.target.value)}
              className="w-full border p-2 rounded"
            />
          </label>

          <label className="block text-sm font-medium">
            Budget
            <input
              type="number"
              value={editData.budget || ""}
              onChange={(e) => handleChange("budget", e.target.value)}
              className="w-full border p-2 rounded"
            />
          </label>

          <label className="block text-sm font-medium">
            Total Employees
            <input
              type="number"
              value={editData.total_employees || ""}
              onChange={(e) => handleChange("total_employees", e.target.value)}
              className="w-full border p-2 rounded"
            />
          </label>

          <label className="block text-sm font-medium">
            Team
            <input
              type="text"
              value={editData.team || ""}
              onChange={(e) => handleChange("team", e.target.value)}
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
              <option>Active</option>
            <option>Completed</option>
            <option>Inactive</option>
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
