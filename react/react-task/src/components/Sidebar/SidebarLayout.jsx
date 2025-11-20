import React from "react";
import { MdSpaceDashboard } from "react-icons/md";     // NEW Dashboard Icon
import { GiMasterOfArms } from "react-icons/gi";      // NEW Master Icon

export default function SidebarLayout({ onSelect, selectedPage }) {
  const iconClass = (page) =>
    `text-2xl transition-colors duration-200 ${
      selectedPage === page
        ? "text-yellow-300"
        : "text-white hover:text-yellow-300"
    }`;

  const tooltipData = {
    dashboard: { label: "Dashboard", icon: <MdSpaceDashboard className="mr-1" /> },
    master: { label: "Master", icon: <GiMasterOfArms className="mr-1" /> },
  };

  const renderTooltip = (page) => (
    <span
      className="
        absolute left-10 top-1/2 -translate-y-1/2
        bg-blue-600 text-white text-sm px-3 py-1 rounded-md shadow-lg
        opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100
        -translate-x-3 group-hover:translate-x-0
        transition-all duration-300 ease-out flex items-center
        whitespace-nowrap z-50
      "
    >
      {tooltipData[page].icon}
      {tooltipData[page].label}
      <span
        className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-blue-600 rotate-45"
      ></span>
    </span>
  );

  return (
    <div
      className="w-14 bg-blue-600 backdrop-blur-md shadow-md 
      flex flex-col items-center py-6 space-y-6 
      fixed top-0 left-0 h-full z-50"
    >

      {/* Dashboard */}
      <div className="relative group">
        <button
          onClick={() => onSelect("dashboard")}
          className={iconClass("dashboard")}
        >
          <MdSpaceDashboard />
        </button>
        {renderTooltip("dashboard")}
      </div>

      {/* Master */}
      <div className="relative group">
        <button
          onClick={() => onSelect("master")}
          className={iconClass("master")}
        >
          <GiMasterOfArms />
        </button>
        {renderTooltip("master")}
      </div>
    </div>
  );
}
