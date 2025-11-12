import { useState } from "react";
import api from "../api/axiosConfig";

export default function NewPassword({ pendingUser, setPendingUser }) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSetPassword = async () => {
    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await api.post("/auth/setPassword", {
        username: pendingUser.username,
        password,
      });
      alert(res.data);
      setPendingUser(null); // go back to login
    } catch (err) {
      alert("Error setting password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Set New Password
        </h2>
        <input
          type="password"
          placeholder="New Password"
          className="w-full p-2 mb-4 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full p-2 mb-4 border rounded"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
        <button
          onClick={handleSetPassword}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Save Password
        </button>
      </div>
    </div>
  );
}
