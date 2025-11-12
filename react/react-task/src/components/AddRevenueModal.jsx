import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";

export default function TeamRevenueTab() {
  const [revenues, setRevenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [monthFilter, setMonthFilter] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const fetchRevenues = async () => {
    try {
      const res = await api.get("/revenue/all", {
        params: monthFilter ? { month: monthFilter } : {},
      });
      setRevenues(res.data);
    } catch (err) {
      console.error("Error fetching team revenue:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRevenues();
  }, [monthFilter]);

  const totalPages = Math.ceil(revenues.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRevenues = revenues.slice(startIndex, startIndex + rowsPerPage);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  if (loading) return <p className="text-center">Loading team revenue...</p>;
  if (!revenues.length) return <p className="text-center">No revenue data found.</p>;

  return (
    <div className="p-6 bg-white shadow-md rounded-xl overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-4">Team Revenue Overview</h2>

      <div className="mb-4 flex gap-2">
        <input
          type="month"
          value={monthFilter}
          onChange={(e) => setMonthFilter(e.target.value)}
          className="border p-2 rounded"
        />
        <button onClick={() => setMonthFilter("")} className="bg-gray-500 text-white px-3 py-1 rounded">
          Clear Filter
        </button>
      </div>

      <table className="min-w-full border text-left text-sm border-gray-100">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-2 border">Revenue ID</th>
            <th className="px-4 py-2 border">Team</th>
            <th className="px-4 py-2 border">Month</th>
            <th className="px-4 py-2 border">No. of Sales</th>
            <th className="px-4 py-2 border">Total Budget</th>
            <th className="px-4 py-2 border">Average Revenue</th>
          </tr>
        </thead>
        <tbody>
          {currentRevenues.map((rev) => (
            <tr key={rev.revenue_id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2 border">{rev.revenue_id}</td>
              <td className="px-4 py-2 border">{rev.team}</td>
              <td className="px-4 py-2 border">{rev.month}</td>
              <td className="px-4 py-2 border">{rev.no_of_sales}</td>
              <td className="px-4 py-2 border">{rev.budget}</td>
              <td className="px-4 py-2 border">{rev.average_revenue}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${currentPage === 1 ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
        </span>
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded ${currentPage === totalPages ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
