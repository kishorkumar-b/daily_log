// UserManagement.jsx
import React, { useState } from "react";
import { HiOutlineUserGroup } from "react-icons/hi";
import { FaEdit, FaUserTimes } from "react-icons/fa";
import TabsSection from "../Dataexplorer/TabsSection";
import UserGrid from "./UserGrid";
import UserDetailsPanel from "./UserDetailsPanel";
import UserModal from "./UserModal";

export default function UserManagement() {
  const [activeTab, setActiveTab] = useState("Server Data");
  const [data, setData] = useState([
    { id: 1, groupName: "Administrator", status: "Active" },
    { id: 2, groupName: "Kishor", status: "Inactive" },
    { id: 3, groupName: "Guest", status: "Active" },
  ]);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const [editMode, setEditMode] = useState(false);

  const handleRowSelect = (event) => {
    const row = event.args.row;
    setSelectedRowId(row?.id || null);
  };

  const openModal = (edit = false) => {
    setEditMode(edit);
    if (edit && selectedRowId) {
      const row = data.find((r) => r.id === selectedRowId);
      setEditData({ ...row });
    } else {
      setEditData({ groupName: "", status: "Inactive" });
    }
    setModalOpen(true);
  };

  const handleSave = (rowData) => {
    if (editMode) {
      setData((prev) =>
        prev.map((r) => (r.id === rowData.id ? { ...rowData } : r))
      );
    } else {
      const newRow = { ...rowData, id: data.length + 1 };
      setData((prev) => [...prev, newRow]);
    }
    setModalOpen(false);
    setSelectedRowId(null);
  };

  const toggleStatus = () => {
    if (!selectedRowId) return;
    setData((prev) =>
      prev.map((row) =>
        row.id === selectedRowId
          ? { ...row, status: row.status === "Active" ? "Inactive" : "Active" }
          : row
      )
    );
  };

  return (
    <div className=" w-full bg-white flex flex-col gap-2">
      <div className="bg-gray-50">
        <TabsSection
          tabs={["Server Data", "Template View", "Data Logger"]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>

      {activeTab === "Server Data" && (
        <>
          {/* Toolbar */}
          <div className="flex justify-end pr-4 gap-3 mb-2">
            <button
              onClick={() => openModal(false)}
              className="px-2 py-1 text-[12px] font-semibold border text-blue-600 rounded bg-gray-100 flex items-center gap-1"
            >
              <HiOutlineUserGroup size={20} />
              Add New Group
            </button>

            <button
              onClick={() => openModal(true)}
              disabled={!selectedRowId}
              className={`px-2 py-1 text-[12px] rounded flex items-center gap-1 ${
                selectedRowId
                  ? "font-semibold text-blue-600 bg-gray-100"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              <FaEdit size={20} />
              Edit
            </button>

            <button
              onClick={toggleStatus}
              disabled={!selectedRowId}
              className={`px-2 py-1 text-[12px] rounded flex items-center gap-1 ${
                selectedRowId
                  ? "font-semibold text-blue-600 bg-gray-100"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              <FaUserTimes size={20} />
              Active/Inactive
            </button>
          </div>

          {/* Grid + Panel */}
          <div className="flex-1 z-25 mx-4 flex bg-white rounded shadow overflow-hidden">
            <div className="w-1/2">
              <UserGrid
                data={data}
                selectedRowId={selectedRowId}
                onRowSelect={handleRowSelect}
              />
            </div>
            <UserDetailsPanel />
          </div>

          {isModalOpen && (
            <UserModal
              data={editData}
              editMode={editMode}
              onSave={handleSave}
              onClose={() => setModalOpen(false)}
            />
          )}
        </>
      )}
    </div>
  );
}
