import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import UpdateEmployeeModal from "./UpdateEmployeeModal";
import DeleteEmployeeModal from "./DeleteEmployeeModal";

export default function EmployeeTab({ user }) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmp, setSelectedEmp] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await api.post("/dashboard/data", {
          role: user.role,
          team: user.team,
          username: user.username,
        });

        let empList = res.data.employees || [];

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
    if (emp.username !== user.username) setSelectedEmp(emp);
  };

  const handleUpdateClick = () => {
    if (!selectedEmp) return alert("Select an employee first!");
    if (selectedEmp.username === user.username)
      return alert("You cannot update your own data!");
    setShowUpdateModal(true);
  };

  const handleDeleteClick = () => {
    if (!selectedEmp) return alert("Select an employee first!");
    if (selectedEmp.username === user.username)
      return alert("You cannot delete your own account!");
    setShowDeleteModal(true);
  };

const handleUpdateSuccess = async () => {
  setShowUpdateModal(false);
  showSuccess("Employee updated successfully!");
  
  try {
    const res = await api.post("/dashboard/data", {
      role: user.role,
      team: user.team,
      username: user.username,
    });
    setEmployees(res.data.employees || []);
  } catch (err) {
    console.error("Failed to refresh employees:", err);
  }
};



  const handleDeleteSuccess = (deletedId) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== deletedId));
    setSelectedEmp(null);
    setShowDeleteModal(false);
    showSuccess("Employee deleted successfully!");
  };

  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  // Pagination logic
const totalPages = Math.ceil(employees.length / rowsPerPage);
const startIndex = (currentPage - 1) * rowsPerPage;
const currentEmployees = employees.slice(startIndex, startIndex + rowsPerPage);

const goToPage = (page) => {
  if (page < 1 || page > totalPages) return;
  setSelectedEmp(null);
  setCurrentPage(page);
};

  if (loading) return <p>Loading employees...</p>;
  if (!employees.length) return <p>No employees found.</p>;

  return (
    <div className="bg-white shadow-md rounded-xl p-6 overflow-x-auto relative">
      <h2 className="text-lg font-semibold mb-4">Employee Details</h2>

      {successMsg && (
        <div className="fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded shadow-lg z-50">
          {successMsg}
        </div>
      )}

<table className="w-full text-left border-collapse">
  <thead>
    <tr className="border-b p-6 bg-gray-50">
      <th className="border p-2">ID</th>
      <th className="border p-2">Username</th>
      <th className="border p-2">Full Name</th>
      <th className="border p-2">Team</th>
      <th className="border p-2">Designation</th>
      <th className="border p-2">Role</th>
      <th className="border p-2">Salary</th>
      <th className="border p-2">Status</th>
    </tr>
  </thead>
  <tbody>
    {currentEmployees.map((emp, idx) => (
      <tr
        key={emp.id || idx} // Make sure key is unique
        className={`border-b hover:bg-gray-50 cursor-pointer ${
          selectedEmp?.id === emp.id ? "bg-blue-100" : ""
        } ${
          emp.username === user.username
            ? "bg-gray-200 cursor-not-allowed"
            : ""
        }`}
        onClick={() => handleRowClick(emp)}
      >
        <td className="border p-2">{emp.id}</td>
        <td className="border p-2">{emp.username}</td>
        <td className="border p-2">{emp.full_name}</td>
        <td className="border p-2">{emp.team}</td>
        <td className="border p-2">{emp.designation}</td>
        <td className="border p-2">{emp.role}</td>
        <td className="border p-2">{emp.salary}</td>
        <td className="border p-2">{emp.status}</td>
      </tr>
    ))}
  </tbody>
</table>

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

      {(user.role === "Admin" || user.role === "MANAGER") && (
        <div className="fixed bottom-8 right-8 flex gap-4">
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded-lg shadow-lg hover:bg-blue-600"
            onClick={handleUpdateClick}
          >
            Update
          </button>
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded-lg shadow-lg hover:bg-blue-600"
            onClick={handleDeleteClick}
          >
            Delete
          </button>
        </div>
      )}

      {showUpdateModal && (
        <UpdateEmployeeModal
          employee={selectedEmp}
          onClose={() => setShowUpdateModal(false)}
          onSuccess={handleUpdateSuccess}
        />
      )}

      {showDeleteModal && (
        <DeleteEmployeeModal
          employee={selectedEmp}
          onClose={() => setShowDeleteModal(false)}
          onSuccess={handleDeleteSuccess}
        />
      )}
    </div>
  );
}
