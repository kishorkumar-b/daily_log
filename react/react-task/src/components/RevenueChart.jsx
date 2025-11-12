import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function RevenueChart({ revenueData }) {
  if (!revenueData || revenueData.length === 0) {
    return (
      <div className="bg-white shadow-md rounded-xl p-6 text-center text-gray-500">
        No revenue data available.
      </div>
    );
  }

 
  const formattedData = revenueData.map((item) => ({
    month: item.month,
    revenue: Number(item.revenue) || 0,
    target: 20000,
  }));

  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-4">Revenue Performance</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip
            formatter={(value, name) =>
              name === "Revenue"
                ? [`₹${value.toLocaleString()}`, "Revenue"]
                : [`₹${value.toLocaleString()}`, "Target"]
            }
          />
          <Bar dataKey="revenue" fill="#4F46E5" name="Revenue" barSize={40} />
          <Bar dataKey="target" fill="#60A5FA" name="Target" barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
