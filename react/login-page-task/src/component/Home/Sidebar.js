import { useState } from "react";
import menuItems from "./menuItems";

const Sidebar = ({ onSelect }) => {
  const [expandedMenu, setExpandedMenu] = useState(null);

  const toggleMenu = (label) => {
    setExpandedMenu(expandedMenu === label ? null : label);
  };

  const handleSubItemClick = (component) => {
    onSelect(component);       // Render the component in main area
    setExpandedMenu(null);     // Collapse the submenu
  };

  return (
    <aside className="w-20 bg-blue-800  text-white shadow-lg flex flex-col transition-all duration-300">
      <nav className="flex flex-col mt-4 space-y-2">
        {menuItems.map((item) => (
          <div key={item.label} className="relative">
            {/* Main Icon */}
            <button
              onClick={() => toggleMenu(item.label)}
              className="flex items-center p-3 rounded-lg hover:bg-blue-700 justify-center w-full transition-colors"
            >
              {item.icon}
            </button>

            {/* Submenu */}
            {expandedMenu === item.label && (
              <div
                className="absolute left-20 top-0 h-full bg-blue-50 rounded-r-lg text-black py-2"

                style={{ minWidth: "200px" }}
              >
                {item.subItems.map((sub) => (
                  <button
                    key={sub.label}
                    onClick={() => handleSubItemClick(sub.component)}
                    className="w-full text-left px-4 py-2 hover:bg-blue-500 transition-colors"
                  >
                    {sub.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
