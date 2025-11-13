import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend,
  BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer
} from "recharts";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [profitPercent, setProfitPercent] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:8080/revenue/all")
      .then(res => {
        const sorted = res.data.sort((a, b) => a.month.localeCompare(b.month));
        setData(sorted);
        if (sorted.length > 0) setSelectedMonth(sorted[sorted.length - 1].month);

        // generate random profit % (between 10%–40%)
        setProfitPercent(Math.floor(Math.random() * 30) + 10);
      })
      .catch(err => console.error(err));
  }, []);

  const monthData = data.filter(d => d.month === selectedMonth);
  const months = [...new Set(data.map(d => d.month))];

  const totalBudget = monthData.reduce((sum, d) => sum + Number(d.budget || 0), 0);
  const totalActual = monthData.reduce((sum, d) => sum + Number(d.average_revenue || 0), 0);
  const overallPercentage = totalBudget > 0 ? ((totalActual / totalBudget) * 100).toFixed(1) : 0;

  // group by month for bar chart
  const monthlyTotals = Object.values(
    data.reduce((acc, cur) => {
      if (!acc[cur.month]) acc[cur.month] = { month: cur.month, totalRevenue: 0 };
      acc[cur.month].totalRevenue += Number(cur.average_revenue || 0);
      return acc;
    }, {})
  );

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A020F0", "#FF6384"];

  return (
    <div className="p-6 grid gap-4 grid-cols-1 lg:grid-cols-2 bg-gray-50 min-h-screen">

      {/* --- OVERVIEW + PROFIT CARDS --- */}
     {/* --- TOP SECTION: Overview + Profit + Pie --- */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:col-span-2">
            
            {/* Overview */}
            <div className="bg-white shadow rounded-xl p-4 flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-700">Overview</h2>
                <select
                  className="border rounded px-2 py-1 text-sm"
                  value={selectedMonth}
                  onChange={e => setSelectedMonth(e.target.value)}
                >
                  {months.map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
              <p className="text-sm text-gray-500 mt-1">Company Level Target & Actual</p>
              <div className="text-4xl font-bold text-blue-600 mt-2">{overallPercentage}%</div>
              <p className="text-sm text-gray-600 mt-1">Target: ₹{totalBudget.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Actual: ₹{totalActual.toLocaleString()}</p>
            </div>

            {/* Profit Card */}
            <div className="bg-white shadow rounded-xl p-4 flex flex-col justify-center items-center text-center">
              <h2 className="text-lg font-semibold text-gray-700 mb-1">Profit Percentage</h2>
              <div className="text-5xl font-bold text-green-600 mb-2">{profitPercent}%</div>
              <p className="text-sm text-gray-500">Estimated Net Gain</p>
            </div>

            {/* Pie Chart */}
<div className="bg-white shadow rounded-xl p-4">
  <h2 className="text-lg font-semibold text-gray-700 mb-2">Team Target vs Actual</h2>
  <ResponsiveContainer width="100%" height={220}>
    <PieChart>
      <Pie
        data={monthData}
        dataKey="budget"
        nameKey="team"
        cx="50%"
        cy="50%"
        outerRadius={60}
        fill="#8884d8"
        
      />
      <Pie
        data={monthData}
        dataKey="average_revenue"
        nameKey="team"
        cx="50%"
        cy="50%"
        innerRadius={70}
        outerRadius={90}
        fill="#82ca9d"
        
      />
      <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
    </PieChart>
  </ResponsiveContainer>
</div>



          </div>

      {/* --- LINE + BAR CHART ROW --- */}
      <div className="lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* LINE CHART */}
        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            Revenue Statistics (Target vs Actual)
          </h2>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="budget" stroke="#938ef8ff" name="Target" />
              <Line type="monotone" dataKey="average_revenue" stroke="#82ca9d" name="Actual" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* BAR CHART (Monthly Revenue Total) */}
        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            Monthly Total Revenue
          </h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyTotals}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="totalRevenue" fill="#4094f5ff" name="Total Revenue" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}
