import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";

export default function TeamRevenueTab({ user }) {
  const [revenues, setRevenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [monthFilter, setMonthFilter] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 6;

  // ✅ Fetch revenue data (and auto-filter by team if EMPLOYEE)
  const fetchRevenues = async () => {
    try {
      setLoading(true);
      const url = monthFilter ? `/revenue/all?month=${monthFilter}` : `/revenue/all`;
      const res = await api.get(url);
      let data = res.data || [];

      // 🔹 Show only logged-in user's team if EMPLOYEE
      if (user?.role === "EMPLOYEE" && user?.team) {
        data = data.filter((rev) => rev.team === user.team);
      }

      setRevenues(data);
    } catch (err) {
      console.error("Error fetching revenue:", err);
      setRevenues([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRevenues();
  }, [monthFilter, user]);

  // Pagination logic
  const totalPages = Math.ceil(revenues.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRevenues = revenues.slice(startIndex, startIndex + rowsPerPage);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  if (loading) return <p className="text-center">Loading team revenue...</p>;

  return (
    <div className="p-6 bg-white shadow-md rounded-xl relative overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-4">Revenue Overview</h2>

      {successMsg && (
        <div className="fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded shadow-lg z-50">
          {successMsg}
        </div>
      )}

      {/* 🔹 Month Filter */}
      <div className="mb-4 flex gap-2 items-center">
        <input
          type="month"
          value={monthFilter}
          onChange={(e) => {
            setMonthFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="border p-1 rounded"
        />
        <button
          onClick={() => setMonthFilter("")}
          className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
        >
          Clear Filter
        </button>
      </div>

      {/* 🔹 Table */}
      {revenues.length === 0 ? (
        <p className="text-center text-gray-600">No revenue data available.</p>
      ) : (
        <table className="min-w-full border text-left text-sm border-gray-100">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 border">Revenue ID</th>
              <th className="px-4 py-2 border">Team</th>
              <th className="px-4 py-2 border">Month</th>
              <th className="px-4 py-2 border">Average Revenue</th>
            </tr>
          </thead>
          <tbody>
            {currentRevenues.map((rev) => (
              <tr key={rev.revenue_id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2 border">{rev.revenue_id}</td>
                <td className="px-4 py-2 border">{rev.team}</td>
                <td className="px-4 py-2 border">{rev.month}</td>
                <td className="px-4 py-2 border">
                  ₹
                  {rev.average_revenue.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* 🔹 Pagination */}
      {revenues.length > rowsPerPage && (
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded ${
              currentPage === 1
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Previous
          </button>
          <span className="text-gray-700">
            Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
          </span>
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
