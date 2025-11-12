import React from "react";
import { FaTachometerAlt, FaCogs } from "react-icons/fa";

export default function SidebarLayout({ onSelect, selectedPage }) {
  const iconClass = (page) =>
    `text-2xl transition-colors duration-200 ${
      selectedPage === page
        ? "text-blue-500"          // active icon
        : "text-blue-300 hover:text-blue-500" // inactive icon with hover
    }`;

  return (
    <div className="w-14 bg-blue-50/50 mt-12 backdrop-blur-md shadow-md flex flex-col items-center py-6 space-y-6">
      <button onClick={() => onSelect("dashboard")} className={iconClass("dashboard")}>
        <FaTachometerAlt />
      </button>
      <button onClick={() => onSelect("master")} className={iconClass("master")}>
        <FaCogs />
      </button>
    </div>
  );
}
