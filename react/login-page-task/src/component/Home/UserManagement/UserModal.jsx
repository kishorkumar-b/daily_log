import React, { useState, useEffect } from 'react';
import './UserManagement.css';

export default function UserModal({ data, editMode, onSave, onClose }) {
  const [formData, setFormData] = useState({ groupName: '', status: 'Inactive' });

  // Update form data whenever modal opens or data changes
  useEffect(() => {
    setFormData({ ...data });
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.groupName) return; // required check
    onSave(formData);
  };

  return (
    <div className="modal-backdrop flex justify-center items-center">
      <div className="modal bg-white p-6 rounded shadow-lg w-96">
        <h3 className="text-xl font-semibold mb-4">
          {editMode ? 'Edit User Group' : 'Add User Group'}
        </h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Group Name:</label>
            <input
              type="text"
              name="groupName"
              value={formData.groupName}
              onChange={handleChange}
              className="border rounded px-2 py-1"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium">Status:</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="border rounded px-2 py-1"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              {editMode ? 'Update' : 'Add'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
