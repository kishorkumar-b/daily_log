import React, { useState } from "react";
import api from "../api/axiosConfig";

const Login = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("EMPLOYEE");

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", { username, password, role });
      console.log(res.data);
      if (res.data.status === "success") {
        setUser({ username: res.data.username, role: res.data.role });
        
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Login</h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="ADMIN">ADMIN</option>
          <option value="MANAGER">MANAGER</option>
          <option value="EMPLOYEE">EMPLOYEE</option>
        </select>

        <button
          onClick={handleLogin}
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default Login;
