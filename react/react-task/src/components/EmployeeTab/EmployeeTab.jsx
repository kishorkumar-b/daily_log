import React, { useEffect, useState } from "react";
import {api} from "../../api/axiosConfig";
import UpdateEmployeeModal from "./UpdateEmployeeModal";
import DeleteEmployeeModal from "./DeleteEmployeeModal";
import PopupMessage from "../common/PopupMessage"; // ✅ import the popup

export default function EmployeeTab({ user }) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmp, setSelectedEmp] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [popupMsg, setPopupMsg] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  // Pagination
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

  if (!user?.role) {
    return (
      <p className="text-red-600 font-semibold pl-30">
        Your account is in processing. Access will be provided shortly.
      </p>
    );
  }

  // Helper to show popup
  const showMessage = (msg) => {
    setPopupMsg(msg);
    setShowPopup(true);
  };

  const handleRowClick = (emp) => {
    if (emp.username !== user.username) setSelectedEmp(emp);
  };

  const handleUpdateClick = () => {
    if (!selectedEmp) return showMessage("Select an employee first!");
    if (selectedEmp.username === user.username)
      return showMessage("You cannot update your own data!");
    setShowUpdateModal(true);
  };

  const handleDeleteClick = () => {
    if (!selectedEmp) return showMessage("Select an employee first!");
    if (selectedEmp.username === user.username)
      return showMessage("You cannot delete your own account!");
    if (selectedEmp.status?.toLowerCase() === "active")
      return showMessage(
        "Active employees cannot be deleted. Please change status to Inactive first."
      );

    setShowDeleteModal(true);
  };

  const handleUpdateSuccess = async () => {
    setShowUpdateModal(false);
    showMessage("Employee updated successfully!");
    // refresh employees
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
    showMessage("Employee deleted successfully!");
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
              key={emp.id || idx}
              className={`border-b cursor-pointer ${
                selectedEmp?.id === emp.id ? "bg-blue-100" : ""
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

      {/* Pagination */}
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

      {/* Update & Delete Buttons */}
      {(user.role === "Admin" || user.role === "MANAGER") && (
        <div className="fixed bottom-8 right-8 flex gap-4">
          <button
            disabled={!selectedEmp || selectedEmp.username === user.username}
            className={`px-3 py-1 rounded-lg shadow-lg ${
              !selectedEmp || selectedEmp.username === user.username
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
            onClick={handleUpdateClick}
          >
            Update
          </button>

          <button
            disabled={
              !selectedEmp ||
              selectedEmp.username === user.username ||
              selectedEmp.status?.toLowerCase() === "active"
            }
            className={`px-3 py-1 rounded-lg shadow-lg ${
              !selectedEmp ||
              selectedEmp.username === user.username ||
              selectedEmp.status?.toLowerCase() === "active"
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
            onClick={handleDeleteClick}
          >
            Delete
          </button>
        </div>
      )}

      {/* Modals */}
      {showDeleteModal && (
        <DeleteEmployeeModal
          employee={selectedEmp}
          onClose={() => setShowDeleteModal(false)}
          onSuccess={handleDeleteSuccess}
        />
      )}
      {showUpdateModal && (
        <UpdateEmployeeModal
          employee={selectedEmp}
          onClose={() => setShowUpdateModal(false)}
          onSuccess={handleUpdateSuccess}
        />
      )}

      {/* ✅ Popup */}
      <PopupMessage
        show={showPopup}
        message={popupMsg}
        onClose={() => setShowPopup(false)}
      />
    </div>
  );
}
