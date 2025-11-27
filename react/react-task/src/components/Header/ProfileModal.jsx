import React, { useState } from "react";
import api from "../../api/axiosConfig";

export default function ProfileModal({ username, onClose }) {
  const [newUsername, setNewUsername] = useState(username);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleSave = async () => {
    if (!password || !confirmPassword) {
      setMessage("Please enter password fields");
      setShowPopup(true);
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match ❌");
      setShowPopup(true);
      return;
    }

    try {
      setLoading(true);

      /** 🔹 Update Password */
      await api.post("/auth/changePassword", {
        username,
        password
      });

      /** 🔹 Update Username (if changed) */
      if (newUsername !== username) {
        const res = await api.post("/auth/changeUsername", {
          oldUsername: username,
          newUsername,
        });

        if (res.data.includes("❌")) {
          setMessage(res.data);
          setShowPopup(true);
          return;
        }
      }

      setMessage("Profile updated successfully ✅");
      setShowPopup(true);

      setTimeout(() => {
        setShowPopup(false);
        onClose(); // close modal
      }, 1000);

    } catch (err) {
      console.error(err);
      setMessage("Error updating profile ❌");
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
          
          <h2 className="text-lg font-semibold mb-4">Update Profile</h2>

          {/* Username */}
          <label className="block mb-3">
            Username
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="w-full border rounded px-2 py-1 mt-1"
            />
          </label>

          {/* New Password */}
          <label className="block mb-3">
            New Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded px-2 py-1 mt-1"
            />
          </label>

          {/* Confirm Password */}
          <label className="block mb-4">
            Confirm Password
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border rounded px-2 py-1 mt-1"
            />
          </label>

          <div className="flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
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
            <h3 className="text-lg font-semibold mb-3">Message</h3>
            <p className="text-gray-600 mb-5">{message}</p>

            <button
              onClick={() => setShowPopup(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
}
