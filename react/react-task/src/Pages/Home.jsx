import React, { useState } from "react";
import SidebarLayout from "../components/SidebarLayout";
import Header from "../components/Header";
import Dashboard from "./Dashboard";
import Master from "./Master";

export default function HomePage({user, setPage }) {
  const [selectedPage, setSelectedPage] = useState("dashboard");

  const renderPage = () => {
    switch (selectedPage) {
      case "dashboard":
        return <Dashboard />;
      case "master":
        return <Master user={user} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <SidebarLayout onSelect={setSelectedPage} />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <Header username={user?.full_name || user?.username} />


        <main className="flex-1 p-6 overflow-auto">{renderPage()}</main>
      </div>
    </div>
  );
}
