import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../api/axiosConfig";
import PopupMessage from "../components/common/PopupMessage"; // import your modal

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState(location.state?.username || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [loading, setLoading] = useState(false);

  // Popup state
  const [popup, setPopup] = useState({ show: false, message: "" });

  const handleRegister = async (e) => {
    e.preventDefault(); // prevent reload

    if (!username || !password || !confirmPassword) {
      return setPopup({ show: true, message: "Please fill all fields" });
    }

    if (password !== confirmPassword) {
      return setPopup({ show: true, message: "Passwords do not match" });
    }

    try {
      setLoading(true);
      const res = await api.post("/auth/register", { username, password, role });

      if (res.data.includes("success")) {
        setPopup({ show: true, message: "Registration successful!" });
        setTimeout(() => navigate("/"), 1500); // redirect after popup
      } else {
        setPopup({ show: true, message: res.data || "Registration failed" });
      }
    } catch (err) {
      console.error(err);
      setPopup({ show: true, message: "Registration failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-96 p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
          Register
        </h2>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 mb-4 border border-gray-300 rounded-md 
                       focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="New Password"
            className="w-full p-3 mb-4 border border-gray-300 rounded-md 
                       focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-3 mb-4 border border-gray-300 rounded-md 
                       focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p
          className="text-sm text-blue-500 mt-4 text-center cursor-pointer hover:underline"
          onClick={() => navigate("/")}
        >
          Already have an account? Login
        </p>
      </div>

      {/* Popup Modal */}
      <PopupMessage
        show={popup.show}
        message={popup.message}
        onClose={() => setPopup({ show: false, message: "" })}
      />
    </div>
  );
}
