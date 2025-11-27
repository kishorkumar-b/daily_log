import React, { useState } from "react";
import SidebarLayout from "../components/Sidebar/SidebarLayout";
import Header from "../components/Header/Header";
import Dashboard from "../components/dashboard/Dashboard";
import Master from "./Master";
import ProfileModal from "../components/Header/ProfileModal";

export default function Home({ user, setUser }) {
  const [selectedPage, setSelectedPage] = useState("dashboard");

  // Lift showProfile state here
  const [showProfile, setShowProfile] = useState(false);

  const renderPage = () => {
    switch (selectedPage) {
      case "dashboard":
        return <Dashboard user={user} showProfile={showProfile} />;
      case "master":
        return <Master user={user} showProfile={showProfile} />;
      default:
        return <Dashboard user={user} showProfile={showProfile} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <SidebarLayout onSelect={setSelectedPage} />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <Header
          username={user?.full_name || user?.username}
          user={user}
          setUser={setUser}
          showProfile={showProfile}
          setShowProfile={setShowProfile}
        />
<main className="relative flex-1 overflow-auto">
  {/* Render the actual page content */}
  {renderPage()}
</main>

{/* Black overlay + Profile Modal */}
{showProfile && (
  <>
    <div className="fixed inset-0 bg-black bg-opacity-40 z-40"></div>
    <ProfileModal
      username={user.username}
      onClose={() => setShowProfile(false)}
      className="fixed z-50"
    />
  </>
)}
      </div>
    </div>
  );
}
