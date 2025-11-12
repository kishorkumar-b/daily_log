import React, { useState, useEffect } from "react";
import api from "../api/axiosConfig";

export default function UpdateRevenueModal({ revenue, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    team: "",
    no_of_sales: "",
    budget: "",
    average_revenue: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (revenue) {
      setFormData({
        team: revenue.team,
        no_of_sales: revenue.no_of_sales,
        budget: revenue.budget,
        average_revenue: revenue.average_revenue,
      });
    }
  }, [revenue]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const payload = { ...formData, revenue_id: revenue.revenue_id };
      const res = await api.put("/master/update-revenue", payload);
      onSuccess(res.data.updatedRevenue || { ...revenue, ...formData });
    } catch (err) {
      console.error("Error updating revenue:", err);
      alert("Failed to update revenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-96">
        <h3 className="text-lg font-semibold mb-4">Update Revenue</h3>

        <div className="grid grid-cols-2 gap-3">
          <label className="text-sm font-medium">Team</label>
          <input
            type="text"
            name="team"
            value={formData.team}
            onChange={handleChange}
            className="border p-1 rounded"
          />

          <label className="text-sm font-medium">No. of Sales</label>
          <input
            type="number"
            name="no_of_sales"
            value={formData.no_of_sales}
            onChange={handleChange}
            className="border p-1 rounded"
          />

          <label className="text-sm font-medium">Budget</label>
          <input
            type="number"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="border p-1 rounded"
          />

          <label className="text-sm font-medium">Average Revenue</label>
          <input
            type="number"
            name="average_revenue"
            value={formData.average_revenue}
            onChange={handleChange}
            className="border p-1 rounded"
          />
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
