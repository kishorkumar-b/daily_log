import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import PopupMessage from "../components/common/PopupMessage";

export default function Login({ setUser, setPendingUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({ show: false, msg: "" });

  const navigate = useNavigate();

  const showPopup = (msg) => {
    setPopup({ show: true, msg });
  };

  const checkIfPasswordIsNull = async () => {
    if (!username) return;
    try {
      const res = await api.post("/auth/checkUser", { username });

      if (res.data.status === "set_password") {
        setPendingUser({
          username: res.data.username,
          role: res.data.role,
        });
      } else if (res.data.status === "fail") {
        navigate("/register", { state: { username } });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password)
      return showPopup("Please enter both username and password");

    try {
      setLoading(true);

      const res = await api.post("/auth/login", { username, password });

      if (res.data.status === "set_password") {
        setPendingUser({
          username: res.data.username,
          role: res.data.role,
        });
      } else if (res.data.active === "Inactive") {
        showPopup("Your account is inactive. Please contact the administrator.");
      } else if (res.data.status === "success") {
        setUser({
          username: res.data.username,
          full_name: res.data.full_name, 
          role: res.data.role,
          team: res.data.team,
        });
      } else {
        showPopup(res.data.message || "Invalid login");
      }
    } catch (err) {
      console.error(err);
      showPopup("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Popup Component */}
      <PopupMessage
        show={popup.show}
        message={popup.msg}
        onClose={() => setPopup({ show: false, msg: "" })}
      />

      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-96 p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
            Login
          </h2>

          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onFocus={checkIfPasswordIsNull}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-md text-white font-medium transition-all ${
                loading
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          <p
            className="text-sm text-blue-500 mt-4 text-center cursor-pointer hover:underline"
            onClick={() => navigate("/register")}
          >
            New user? Register here
          </p>
        </div>
      </div>
    </>
  );
}
