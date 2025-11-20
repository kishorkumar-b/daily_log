import React, { useState } from "react";
import api from "../../api/axiosConfig";

export default function ProfileModal({ username, onClose }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleSave = async () => {
    if (!password) {
      setMessage("Please enter a new password");
      setShowPopup(true);
      return;
    }
    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      setShowPopup(true);
      return;
    }

    try {
      setLoading(true);
      await api.post("/auth/changePassword", { username, password });

      setMessage("Password updated successfully!");
      setShowPopup(true);

      // close popup AND modal after 1 second
      setTimeout(() => {
        setShowPopup(false);
        onClose();               // ✅ Close modal after save
      }, 1000);

    } catch (err) {
      console.error(err);
      setMessage("Error updating password");
      setShowPopup(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!showPopup && (
        <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose}></div>
      )}

      <div className="fixed inset-0 flex items-start justify-center pt-20 z-50">
        <div className="bg-white rounded-xl shadow-lg w-96 p-6 relative">
          <h2 className="text-lg font-semibold mb-4">Change Password</h2>

          <label className="block mb-2">
            New Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded px-2 py-1 mt-1"
              placeholder="Enter new password"
            />
          </label>

          <label className="block mb-4">
            Confirm Password
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border rounded px-2 py-1 mt-1"
              placeholder="Confirm new password"
            />
          </label>

          <div className="flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              disabled={loading}
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-[60]">
          <div className="bg-white px-6 py-5 rounded-xl shadow-xl w-80 text-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Message</h3>
            <p className="text-gray-600 mb-5">{message}</p>

            <button
              onClick={() => setShowPopup(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
}
