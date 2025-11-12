import React, { useEffect, useState } from "react";
import api from "../../api/axiosConfig";

export default function EmployeeTable({ user }) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editRow, setEditRow] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await api.post("/dashboard/data", { role: user.role });
        let empList = res.data.employees || [];

        // Role-based filtering
        if (user.role === "MANAGER") {
          empList = empList.filter((e) => e.team === user.team);
        } else if (user.role === "EMPLOYEE") {
          empList = empList.filter(
            (e) => e.team === user.team || e.username === user.username
          );
        }

        setEmployees(empList);
      } catch (err) {
        console.error("Error fetching employees:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, [user]);

  const handleEditClick = (emp) => {
    setEditRow(emp.id);
    setEditData(emp);
  };

  const handleSaveClick = async () => {
    try {
      await api.post("/master/employee/update", editData);
      setEmployees((prev) =>
        prev.map((emp) => (emp.id === editRow ? editData : emp))
      );
      setEditRow(null);
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update employee");
    }
  };

  const handleChange = (field, value) => {
    setEditData({ ...editData, [field]: value });
  };

  if (loading) return <p>Loading employees...</p>;
  if (!employees.length) return <p>No employees found.</p>;

  return (
    <div className="bg-white shadow-md rounded-xl p-6 overflow-x-auto">
      <h2 className="text-lg font-semibold mb-4">Employee Details</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b bg-gray-50">
            <th>ID</th>
            <th>Username</th>
            <th>Full Name</th>
            <th>Team</th>
            <th>Email</th>
            <th>Designation</th>
            <th>Salary</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id} className="border-b hover:bg-gray-50">
              <td>{emp.id}</td>
              <td>{emp.username}</td>
              <td>
                {editRow === emp.id ? (
                  <input
                    value={editData.full_name || ""}
                    onChange={(e) =>
                      handleChange("full_name", e.target.value)
                    }
                  />
                ) : (
                  emp.full_name
                )}
              </td>
              <td>
                {editRow === emp.id ? (
                  <input
                    value={editData.team || ""}
                    onChange={(e) => handleChange("team", e.target.value)}
                  />
                ) : (
                  emp.team
                )}
              </td>
              <td>{emp.email}</td>
              <td>
                {editRow === emp.id ? (
                  <input
                    value={editData.designation || ""}
                    onChange={(e) =>
                      handleChange("designation", e.target.value)
                    }
                  />
                ) : (
                  emp.designation
                )}
              </td>
              <td>
                {editRow === emp.id ? (
                  <input
                    type="number"
                    value={editData.salary || 0}
                    onChange={(e) => handleChange("salary", e.target.value)}
                  />
                ) : (
                  emp.salary
                )}
              </td>
              <td>
                {editRow === emp.id ? (
                  <select
                    value={editData.status || "Active"}
                    onChange={(e) => handleChange("status", e.target.value)}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                ) : (
                  emp.status
                )}
              </td>
              <td>
                {editRow === emp.id ? (
                  <button
                    className="text-green-500"
                    onClick={handleSaveClick}
                  >
                    Save
                  </button>
                ) : user.role === "ADMIN" || user.role === "MANAGER" ? (
                  <button
                    className="text-blue-500"
                    onClick={() => handleEditClick(emp)}
                  >
                    Edit
                  </button>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
