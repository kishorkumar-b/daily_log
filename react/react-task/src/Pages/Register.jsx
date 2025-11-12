import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../api/axiosConfig";

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState(location.state?.username || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!username || !password || !confirmPassword) {
      return alert("Please fill all fields");
    }

    if (password !== confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      setLoading(true);
      const res = await api.post("/auth/register", { username, password, role });
      alert(res.data);
      if (res.data.includes("success")) navigate("/"); // back to login
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-96 p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Register</h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="New Password"
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          disabled={loading}
          className={`w-full py-3 rounded-md text-white font-medium transition-all ${
            loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p
          className="text-sm text-blue-500 mt-4 text-center cursor-pointer hover:underline"
          onClick={() => navigate("/")}
        >
          Already have an account? Login
        </p>
      </div>
    </div>
  );
}
