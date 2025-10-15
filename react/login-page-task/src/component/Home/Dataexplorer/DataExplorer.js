import React, { useState } from "react";
import TabsSection from "./TabsSection";
import FilterSection from "./FilterSection";
import RecordsAndCheckbox from "./RecordsAndCheckbox";
import ActionButtons from "./ActionButtons";

const DataExplorer = () => {
  const [activeTab, setActiveTab] = useState("Server Data");
  const tabs = ["Server Data", "Template View", "Data Logger"];

  return (
    <div className="flex-1 w-full">
      <div className="bg-gray-100 rounded-md px-4 pb-4 w-full h-full">
        <TabsSection tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        <FilterSection />
      <RecordsAndCheckbox />
  {/* <ActionButtons /> */}
      </div>
    </div>
  );
};

export default DataExplorer;
