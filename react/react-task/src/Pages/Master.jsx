import React, { useState } from "react";
import EmployeeTab from "../components/EmployeeTab/EmployeeTab";
import ProductTab from "../components/ProductTab/ProductTab";
import RevenueTab from "../components/RevenueTab/RevenueTab";

export default function Master({user}) {
  console.log("User in Master page:", user);
  const [activeTab, setActiveTab] = useState("employee"); // default tab

  const tabs = [
    { id: "employee", label: "Employee" },
    { id: "product", label: "Product" },
    { id: "revenue", label: "Revenue" },
  ];

  return (
    <div className="p-4 pl-20 bg-white rounded-md shadow-md">
      {/* Tabs */}
      <div className="flex border-b border-gray-300 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 -mb-px font-medium text-gray-700 border-b-2 transition-colors duration-200 ${
              activeTab === tab.id
                ? "border-blue-500 text-blue-500"
                : "border-transparent hover:text-blue-500"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "employee" && <EmployeeTab user={user}/>}
        {activeTab === "product" && <ProductTab user={user}/>}
        {activeTab === "revenue" && <RevenueTab user={user}/>}
      </div>
    </div>
  );
}
