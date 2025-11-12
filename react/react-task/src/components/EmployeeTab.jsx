import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";

export default function EmployeeTab({ user }) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmp, setSelectedEmp] = useState(null); // row selected
  const [editData, setEditData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [successMsg, setSuccessMsg] = useState(""); // for popup message

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

  const handleRowClick = (emp) => {
    setSelectedEmp(emp);
  };

  const handleUpdateClick = () => {
    if (!selectedEmp) {
      alert("Please select an employee first!");
      return;
    }
    setEditData(selectedEmp);
    setShowModal(true);
  };

  const handleSaveClick = async () => {
    try {
      await api.post("/master/employee/update", editData);
      setEmployees((prev) =>
        prev.map((emp) => (emp.id === editData.id ? editData : emp))
      );
      setShowModal(false);
      setSuccessMsg("Employee updated successfully!");
      // Hide message after 3 seconds
      setTimeout(() => setSuccessMsg(""), 3000);
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
    <div className="bg-white shadow-md rounded-xl p-6 overflow-x-auto relative">
      <h2 className="text-lg font-semibold mb-4">Employee Details</h2>
      
      {/* Success message */}
      {successMsg && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
          {successMsg}
        </div>
      )}

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b p-6 bg-gray-50">
            <th>ID</th>
            <th>Username</th>
            <th>Full Name</th>
            <th>Team</th>
            <th>Designation</th>
            <th>Role</th>
            <th>Salary</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr
              key={emp.id}
              className={`border-b hover:bg-gray-50 cursor-pointer ${
                selectedEmp?.id === emp.id ? "bg-blue-100" : ""
              }`}
              onClick={() => handleRowClick(emp)}
            >
              <td>{emp.id}</td>
              <td>{emp.username}</td>
              <td>{emp.full_name}</td>
              <td>{emp.team}</td>
              <td>{emp.designation}</td>
              <td>{emp.role}</td>
              <td>{emp.salary}</td>
              <td>{emp.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Update Button */}
      {(user.role === "Admin" || user.role === "MANAGER") && (
        <button
          className="fixed bottom-8 right-8 bg-blue-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-600"
          onClick={handleUpdateClick}
        >
          Update Selected Employee
        </button>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-96 relative">
            <h3 className="text-lg font-semibold mb-4">Edit Employee</h3>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium">Full Name</label>
                <input
                  type="text"
                  value={editData.full_name || ""}
                  onChange={(e) => handleChange("full_name", e.target.value)}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Team</label>
                <input
                  type="text"
                  value={editData.team || ""}
                  onChange={(e) => handleChange("team", e.target.value)}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Designation</label>
                <input
                  type="text"
                  value={editData.designation || ""}
                  onChange={(e) => handleChange("designation", e.target.value)}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Role</label>
                <select
                  value={editData.role ?? ""}
                  onChange={(e) => handleChange("role", e.target.value || null)}
                  className="w-full border p-2 rounded"
                >
                  <option value="">Select Role</option>
                  <option value="Admin">Admin</option>
                  <option value="MANAGER">MANAGER</option>
                  <option value="EMPLOYEE">EMPLOYEE</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Salary</label>
                <input
                  type="number"
                  value={editData.salary ?? 0}
                  onChange={(e) => handleChange("salary", e.target.value)}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Status</label>
                <select
                  value={editData.status ?? "Active"}
                  onChange={(e) => handleChange("status", e.target.value || null)}
                  className="w-full border p-2 rounded"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end mt-6 space-x-3">
              <button
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
                onClick={handleSaveClick}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
