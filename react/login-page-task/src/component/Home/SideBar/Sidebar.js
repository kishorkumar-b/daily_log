import { useState } from "react";
import menuItems from "./menuItems";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

const Sidebar = ({ onSelect }) => {
  const [expandedMenu, setExpandedMenu] = useState(null);

  const toggleMenu = (label) => {
    setExpandedMenu(expandedMenu === label ? null : label);
  };

  const handleSubItemClick = (component) => {
    onSelect(component);
    setExpandedMenu(null);
  };

  return (
    <div className="relative flex">
      {/* Sidebar */}
      <aside className="w-[60px] bg-blue-700 text-white shadow-lg flex flex-col z-50">
        <nav className="flex flex-col mt-4 space-y-2 relative">
          {menuItems.map((item) => (
            <div key={item.label} className="relative flex justify-center">
              {/* Main Icon */}
              <button
                onClick={() => toggleMenu(item.label)}
                className="flex items-center p-3 rounded-lg hover:bg-blue-600 justify-center w-full transition-colors"
              >
                {item.icon}
              </button>

              {/* Floating arrow button — always near Home but reacts to any submenu */}
              {item.label === "Home" && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // Clicking arrow closes any open submenu
                    setExpandedMenu(expandedMenu? null : "Home");
                  }}
                  className={`absolute z-50 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-xs font-bold shadow transition-all duration-300
                    ${
                      expandedMenu
                        ? "left-[280px] bg-blue-600 text-white hover:bg-gray-700"
                        : "left-[60px] bg-blue-600 text-white hover:bg-gray-200"
                    }`}
                >
                  {expandedMenu ? (
                    <FaChevronLeft size={10} />
                  ) : (
                    <FaChevronRight size={10} />
                  )}
                </button>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* Submenu Panel */}
      {expandedMenu && (
        <div
          className="absolute top-0 left-[60px] h-full bg-gray-50 text-black rounded-r-lg shadow-lg flex flex-col z-40 transition-all duration-300"
          style={{ minWidth: "220px" }}
        >
          {/* Title / Header */}
          <div className="px-4 py-2 font-bold border-b border-gray-200 flex justify-between items-center bg-white relative">
            {menuItems.find((i) => i.label === expandedMenu)?.label}
          </div>

          {/* Submenu Items */}
          <div className="flex flex-col overflow-y-auto flex-1">
            {menuItems
              .find((i) => i.label === expandedMenu)
              ?.subItems.map((sub) => (
                <button
                  key={sub.label}
                  onClick={() => handleSubItemClick(sub.component)}
                  className="w-full text-left px-4 py-2 hover:bg-blue-500 transition-colors"
                >
                  {sub.label}
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
