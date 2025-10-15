import { useState } from "react";
import { FaUserAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import menuItems from "./menuItems";

const Sidebar = ({ onSelect }) => {
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [flyoutOpen, setFlyoutOpen] = useState(false); // <-- controls flyout open/close

  const toggleMenu = (label) => {
    setExpandedMenu(expandedMenu === label ? null : label);
    setFlyoutOpen(true); // open flyout when menu clicked
  };

  const handleSubItemClick = (component) => {
    onSelect(component);
    setExpandedMenu(null);
    setFlyoutOpen(false);
  };

  const toggleFlyout = () => setFlyoutOpen((prev) => !prev);

  return (
    <aside className="relative w-[60px] bg-blue-700 text-white shadow-lg flex flex-col z-50 h-screen">
      <nav className="flex flex-col mt-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={() => toggleMenu(item.label)}
            className="flex items-center p-3 rounded-lg hover:bg-blue-600 justify-center w-full transition-colors"
          >
            {item.icon}
          </button>
        ))}
      </nav>

      {/* User icon at bottom */}
      <div className="mt-auto p-3 flex justify-center">
        <button className="flex items-center p-3 rounded-lg hover:bg-blue-600 transition-colors">
          <FaUserAlt size={40} />
        </button>
      </div>

      {/* Submenu rendered at sidebar level */}
      {expandedMenu && flyoutOpen && (
        <div
          className="absolute top-0 left-full h-full bg-gray-50 text-black rounded-r-lg shadow-lg flex flex-col"
          style={{ minWidth: "200px" }}
        >
          {/* Title with toggle arrow */}
          <div className="px-4 py-2 font-bold border-b border-gray-200 flex justify-between items-center">
            {menuItems.find((i) => i.label === expandedMenu)?.label}
            <button
              onClick={toggleFlyout}
              className="p-1 rounded hover:bg-gray-200"
            >
              {flyoutOpen ? <FaChevronLeft /> : <FaChevronRight />}
            </button>
          </div>

          {/* Sub-items */}
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
    </aside>
  );
};

export default Sidebar;
