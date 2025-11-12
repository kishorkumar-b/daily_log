import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Header({ title = "Employee Management", username = "Admin", user, setUser }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/", { replace: true });
  };

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white/30 backdrop-blur-md shadow-md sticky top-0 z-50">
      {/* Left: Page Title */}
      <h1 className="text-xl font-semibold text-gray-800">{title}</h1>

      {/* Right: User Dropdown */}
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center space-x-2 text-gray-800 hover:text-blue-500 focus:outline-none"
        >
          <FaUserCircle className="text-2xl" />
          <span>{username}</span>
        </button>

        {showDropdown && (
          <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-2 z-50">
            <button
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              onClick={() => alert("Profile page coming soon!")}
            >
              Profile
            </button>

            <button
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
