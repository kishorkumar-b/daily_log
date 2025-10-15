import { useState } from "react";
import { FiChevronDown, FiLogOut, FiKey, FiInfo } from "react-icons/fi";
import { FaRegUser } from 'react-icons/fa';
import { BiSolidLockAlt } from 'react-icons/bi';
import { IoIosHelp } from 'react-icons/io';
import { FaRocket } from 'react-icons/fa';
import { FaInfo } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { clearCredentials } from "../../Login/Authstore";

const Dropdown = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const onLogout = () => {
    clearCredentials();
    navigate("/login", { replace: true });
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center px-1 py-1 rounded-2xl transition border"

      >
        <FiChevronDown size={18} />
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 top-[45px] bg-white text-black shadow-lg w-48  z-50">
          <button className="w-full flex items-center justify-between px-4 py-2 text-sm border-b border-gray-200 hover:bg-blue-100 transition">
          <span className="font-semibold">Edit Profile</span>
          <FaRegUser  size={20} color="#316decff" />
        </button>

        <button className="w-full flex items-center justify-between px-4 py-2 text-sm border-b border-gray-200 hover:bg-blue-100 transition">
          <span className="font-semibold">Change Password</span>
          <FiKey size={20} color="#316decff" />
        </button>

        <button className="w-full flex items-center justify-between px-4 py-2 text-sm border-b border-gray-200  hover:bg-blue-100 transition">
          <span className="font-semibold">Screen Lock</span>
          <BiSolidLockAlt size={20} color="#316decff" />
        </button>

        <button className="w-full flex items-center justify-between px-4 py-2 text-sm border-b border-gray-200 hover:bg-blue-100 transition">
          <span className="font-semibold">Help</span>
          <IoIosHelp size={20} color="#316decff" />
        </button>

        <button className="w-full flex items-center justify-between px-4 py-2 text-sm border-b border-gray-200 hover:bg-blue-100 transition">
          <span className="font-semibold">API Docs</span>
          <FaRocket size={20} color="#316decff" />
        </button>

        <button className="w-full flex items-center justify-between px-4 py-2 text-sm border-b border-gray-200 hover:bg-blue-100 transition">
          <span className="font-semibold">About</span>
          <FaInfo size={20} color="#316decff" />
        </button>

        <button 
          onClick={onLogout}
          className="w-full flex items-center justify-between px-4 py-2 text-sm border-b border-gray-200 hover:bg-blue-100 transition"
        >
          <span className="font-semibold">Logout</span>
          <FiLogOut size={20} color="#316decff" />
        </button>

        </div>
      )}
    </div>
  );
};

export default Dropdown;
