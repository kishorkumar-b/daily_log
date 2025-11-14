import React from "react";
import { FaTachometerAlt, FaCogs } from "react-icons/fa";

export default function SidebarLayout({ onSelect, selectedPage }) {
  const iconClass = (page) =>
    `text-2xl transition-colors duration-200 ${
      selectedPage === page
        ? "text-blue-500"
        : "text-blue-300 hover:text-blue-500"
    }`;

  return (
    <div className="w-14 bg-blue-50/50 mt-12 backdrop-blur-md shadow-md flex flex-col items-center py-6 space-y-6">
      
      {/* Dashboard */}
      <div className="relative group">
        <button onClick={() => onSelect("dashboard")} className={iconClass("dashboard")}>
          <FaTachometerAlt />
        </button>

        {/* Tooltip */}
        <span className="absolute left-10 top-1/2 -translate-y-1/2
            bg-blue-600 text-white text-xs px-3 py-1 rounded-md shadow-lg
            opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100
            transition-all duration-300 ease-out whitespace-nowrap transform-gpu">
            Dashboard
            <span className="absolute -left-1 top-1/2 -translate-y-1/2 
              w-2 h-2 bg-blue-600 rotate-45"></span>
          </span>

      </div>

      {/* Master */}
      <div className="relative group">
        <button onClick={() => onSelect("master")} className={iconClass("master")}>
          <FaCogs />
        </button>

        {/* Tooltip */}
        <span className="absolute left-10 top-1/2 -translate-y-1/2
          bg-blue-600 text-white text-xs px-3 py-1 rounded-md shadow-lg
          opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100
          transition-all duration-300 ease-out whitespace-nowrap transform-gpu">
          Master
          <span className="absolute -left-1 top-1/2 -translate-y-1/2 
            w-2 h-2 bg-blue-600 rotate-45"></span>
        </span>
      </div>
    </div>
  );
}
