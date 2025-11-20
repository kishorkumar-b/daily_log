import React, { useEffect, useState } from "react";
import api from "../../api/axiosConfig";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend,
  PieChart, Pie, Cell, BarChart, Bar, ResponsiveContainer
} from "recharts";

export default function Dashboard({ user }) {
  const [products, setProducts] = useState([]);
  const [revenue, setRevenue] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [loading, setLoading] = useState(true);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A020F0", "#FF6384", "#36A2EB", "#FFCE56"];
  const currentMonth = new Date().toISOString().slice(0, 7);

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await api.post("/dashboard/data", {
          role: user.role,
          team: user.team || null
        });

        let fetchedProducts = res.data.products || [];
        let fetchedRevenue = res.data.revenue || [];

        if (user.role !== "Admin" && user.team) {
          fetchedProducts = fetchedProducts.filter(p => p.team === user.team);
          fetchedRevenue = fetchedRevenue.filter(r => r.team === user.team);
        }

        setProducts(fetchedProducts);
        setRevenue(fetchedRevenue);

        const months = [...new Set(fetchedRevenue.map(r => r.month))];
        if (months.includes(currentMonth)) setSelectedMonth(currentMonth);
        else if (months.length > 0) setSelectedMonth(months[months.length - 1]);

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
      <p className="text-red-600 font-semibold pl-20">
        Your account is in processing. Access will be provided shortly.
      </p>
    );
  }

  if (loading) return <p className="text-center">Loading dashboard...</p>;

  const monthRevenue = revenue.filter(r => r.month === selectedMonth);

  // Find Previous Month
  const previousMonth = revenue
    .filter(r => r.month < selectedMonth)
    .sort((a, b) => b.month.localeCompare(a.month))[0]?.month;

  const prevMonthRevenue = revenue.filter(r => r.month === previousMonth);

  // Company Totals
  const totalBudget = monthRevenue.reduce((sum, r) => sum + Number(r.budget || 0), 0);
  const totalActual = monthRevenue.reduce((sum, r) => sum + Number(r.average_revenue || 0), 0);
  const netProfit = totalBudget > 0 ? ((totalActual / totalBudget) * 100).toFixed(1) : 0;
  const totalSales = monthRevenue.reduce((sum, r) => sum + r.no_of_sales, 0);

  // Product revenue
  const pieData = products
    .filter(prod => monthRevenue.some(r => r.team === prod.team))
    .map(prod => {
      const teamRevenue = monthRevenue
        .filter(r => r.team === prod.team)
        .reduce((sum, r) => sum + Number(r.average_revenue || 0), 0);

      const teamBudget = products
        .filter(p => p.team === prod.team)
        .reduce((sum, p) => sum + Number(p.budget || 0), 0);

      const actual = teamBudget > 0 ? (prod.budget / teamBudget) * teamRevenue : 0;
      const remaining = Math.max(prod.budget - actual, 0);

      return { name: prod.product_name, team: prod.team, actual, remaining };
    });

  // Team Pie Chart
  const teamPieData = monthRevenue.map(r => ({
    name: r.team,
    value: Number(r.average_revenue || 0)
  }));

  // Bar Chart – Current vs Previous
  const barData = [
    {
      name: "Total Revenue",
      Current: monthRevenue.reduce((s, r) => s + Number(r.average_revenue || 0), 0),
      Previous: prevMonthRevenue.reduce((s, r) => s + Number(r.average_revenue || 0), 0)
    }
  ];

  return (
    <div className="p-2 grid gap-4 grid-cols-1 lg:grid-cols-2 bg-gray-50 pl-20">

      <h1 className="text-2xl font-bold lg:col-span-2">Dashboard</h1>

      {/* ⭐⭐⭐ CARDS SECTION RESTORED ⭐⭐⭐ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:col-span-2">

        <div className="bg-white shadow rounded-xl px-4 flex flex-col justify-center items-center text-center">
          <h2 className="text-lg font-semibold text-gray-700 mb-1">Net Profit</h2>
          <div className="text-5xl font-bold text-green-600 mb-2">{netProfit}%</div>
          <p className="text-sm text-gray-500">Profit Percentage</p>
        </div>

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

        <div className="bg-white shadow rounded-xl px-4 flex flex-col justify-center">
          <h2 className="text-lg font-semibold text-gray-700 mb-1">No. of Sales</h2>
          <div className="text-4xl font-bold text-indigo-600 mb-2">{totalSales}</div>
          <p className="text-sm text-gray-500">Total Sales</p>
        </div>

      </div>

      {/* ⭐⭐⭐ 3 CHARTS IN ONE ROW ⭐⭐⭐ */}
      <div className="lg:col-span-2 grid grid-cols-1 lg:grid-cols-3 gap-2">

        {/* Team Pie Chart */}
        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Team Revenue</h2>
          <ResponsiveContainer width="100%" height={230}>
            <PieChart>
              <Pie
                data={teamPieData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={90}
                paddingAngle={4}
                dataKey="value"
              >
                {teamPieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={value => `₹${value.toLocaleString()}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart */}
        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Product Revenue</h2>
          <ResponsiveContainer width="100%" height={230}>
            <LineChart data={pieData.map(p => ({
              product: p.name,
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
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            Current vs Previous Month Revenue
          </h2>
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={val => `₹${Number(val).toLocaleString()}`} />
              <Legend />
              <Bar dataKey="Current" fill="#36A2EB" />
              <Bar dataKey="Previous" fill="#FF6384" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

    </div>
  );
}
