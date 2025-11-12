import React, { useState } from "react";
import api from "../api/axiosConfig";

export default function DeleteRevenueModal({ revenue, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this revenue record?")) return;
    try {
      setLoading(true);
      await api.delete(`/master/delete-revenue/${revenue.revenue_id}`);
      onSuccess(revenue.revenue_id);
    } catch (err) {
      console.error("Failed to delete revenue:", err);
      alert("Failed to delete revenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-80 text-center">
        <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
        <p className="mb-6 text-gray-700">
          Are you sure you want to delete the revenue record for <strong>{revenue.team}</strong>?
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
