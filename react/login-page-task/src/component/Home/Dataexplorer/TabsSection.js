const TabsSection = ({ tabs, activeTab, onTabChange }) => (
  <div className="flex border-b">
    {tabs.map((tab) => (
      <button
        key={tab}
        onClick={() => onTabChange(tab)}
        className={`py-2 px-4 text-sm font-medium ${
          activeTab === tab
            ? "text-blue-600 border-b-2 border-blue-600"
            : "text-gray-600"
        }`}
      >
        {tab}
      </button>
    ))}
  </div>
);

export default TabsSection;
