import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend,
  BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer
} from "recharts";

export default function Dashboard({ user }) {
  const [products, setProducts] = useState([]);
  const [revenue, setRevenue] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [loading, setLoading] = useState(true);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A020F0", "#FF6384", "#36A2EB", "#FFCE56"];

  // 🔹 FRONTEND ROLE VALIDATION


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Pass role & team to backend for filtering
        const res = await api.post("/dashboard/data", {
          role: user.role,
          team: user.team || null
        });

        let fetchedProducts = res.data.products || [];
        let fetchedRevenue = res.data.revenue || [];

        // 🔹 Extra safety: MANAGER & EMPLOYEE only see their team
        if (user.role !== "Admin" && user.team) {
          fetchedProducts = fetchedProducts.filter(p => p.team === user.team);
          fetchedRevenue = fetchedRevenue.filter(r => r.team === user.team);
        }

        setProducts(fetchedProducts);
        setRevenue(fetchedRevenue);

        const months = [...new Set(fetchedRevenue.map(r => r.month))];
        if (months.length > 0) setSelectedMonth(months[months.length - 1]);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);
    if (!user?.role) {
    return (
      <p className="text-red-600 font-semibold">
        Your account is in the Processing they will Provide the Acsses shortly... 
      </p>
    );
  }

  if (loading) return <p className="text-center">Loading dashboard...</p>;

  // 🔹 Filter revenue for selected month
  const monthRevenue = revenue.filter(r => r.month === selectedMonth);
  console.log("fetch ravanu"+monthRevenue)

  // 🔹 Totals & Net Profit
  const totalBudget = monthRevenue.reduce((sum, r) => sum + Number(r.budget || 0), 0);
  const totalActual = monthRevenue.reduce((sum, r) => sum + Number(r.average_revenue || 0), 0);
  const netProfit = totalBudget > 0 ? ((totalActual / totalBudget) * 100).toFixed(1) : 0;
  const totalSales = monthRevenue.reduce((sum, r) => sum + r.no_of_sales, 0);

  // 🔹 Pie Data
  const pieData = products.map(prod => {
    const actual = monthRevenue
      .filter(r => r.team === prod.team)
      .reduce((sum, r) => sum + Number(r.average_revenue || 0), 0);
    const remaining = Math.max((prod.budget || 0) - actual, 0);
    return { name: prod.product_name, team: prod.team, actual, remaining };
  }).filter(p => p.actual > 0 || p.remaining > 0);

  return (
    <div className="p-2 grid gap-4 grid-cols-1 lg:grid-cols-2 bg-gray-50">
      <h1 className="text-2xl font-bold lg:col-span-2">Dashboard</h1>

      {/* Overview + Profit Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:col-span-2">
        {/* Overview Card */}
        <div className="bg-white shadow rounded-xl px-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-700">Overview</h2>
            <select
              className="border rounded px-2 text-sm"
              value={selectedMonth}
              onChange={e => setSelectedMonth(e.target.value)}
            >
              {[...new Set(revenue.map(r => r.month))].map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
          <p className="text-sm text-gray-500 mt-1">Company Level Target & Actual</p>
          <div className="text-4xl font-bold text-blue-600 mt-2">{netProfit}%</div>
          <p className="text-sm text-gray-600 mt-1">Target: ₹{totalBudget.toLocaleString()}</p>
          <p className="text-sm text-gray-600">Actual: ₹{totalActual.toLocaleString()}</p>
        </div>

        {/* Net Profit Card */}
        <div className="bg-white shadow rounded-xl px-4 flex flex-col justify-center items-center text-center">
          <h2 className="text-lg font-semibold text-gray-700 mb-1">Net Profit</h2>
          <div className="text-5xl font-bold text-green-600 mb-2">{netProfit}%</div>
          <p className="text-sm text-gray-500">Profit Percentage</p>
        </div>

        {/* Total Sales Card */}
        <div className="bg-white shadow rounded-xl px-4 flex flex-col justify-center">
          <h2 className="text-lg font-semibold text-gray-700 mb-1">No. of Sales</h2>
          <div className="text-4xl font-bold text-indigo-600 mb-2">{totalSales}</div>
          <p className="text-sm text-gray-500">Total Sales Count</p>
        </div>
      </div>

      {/* Charts */}
      <div className="lg:col-span-2 grid grid-cols-1 lg:grid-cols-3 gap-2">
        {/* Pie Chart */}
        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Product Revenue</h2>
          <ResponsiveContainer width="100%" height={230}>
            <PieChart>
              <Pie
                data={products.map(prod => {
                  const prodRevenue = revenue
                    .filter(r => r.month === selectedMonth && r.team === prod.team)
                    .reduce((sum, r) => (sum + Number(r.average_revenue) || 0), 0);

                  return { name: prod.product_name, value: prodRevenue };
                })}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={90}
                paddingAngle={4}
                dataKey="value"
              >
                {products.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={value => `₹${value.toLocaleString()}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart */}
        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Product Revenue vs Target</h2>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={pieData.map(p => ({
              product: p.name,
              team: p.team,
              actual: p.actual,
              target: p.actual + p.remaining
            }))}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="product" />
              <YAxis />
              <Tooltip formatter={val => `₹${val.toLocaleString()}`} />
              <Legend />
              <Line type="monotone" dataKey="target" stroke="#8884d8" name="Target" />
              <Line type="monotone" dataKey="actual" stroke="#82ca9d" name="Actual" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Product Revenue Comparison</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={pieData.map(p => ({
              product: p.name,
              team: p.team,
              actual: p.actual
            }))}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="product" />
              <YAxis />
              <Tooltip formatter={(value, name, props) => [`Actual: ₹${value.toLocaleString()}`, `Team: ${props.payload.team}`]} />
              <Legend />
              <Bar dataKey="actual" fill="#6a80e0ff" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
