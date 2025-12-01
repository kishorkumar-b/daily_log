import React, { useState } from "react";
import SidebarLayout from "../components/Sidebar/SidebarLayout";
import Header from "../components/Header/Header";
import Dashboard from "../components/dashboard/Dashboard";
import Master from "./Master";
import MediaManager from "../components/media/MediaManager";   // ✅ NEW IMPORT
import ProfileModal from "../components/Header/ProfileModal";

export default function Home({ user, setUser }) {
  const [selectedPage, setSelectedPage] = useState("dashboard");
  const [showProfile, setShowProfile] = useState(false);

  const renderPage = () => {
    switch (selectedPage) {
      case "dashboard":
        return <Dashboard user={user} />;
      case "master":
        return <Master user={user} />;
      case "media":                                  // ✅ NEW PAGE RENDER
        return <MediaManager user={user} />;
      default:
        return <Dashboard user={user} />;
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
          {renderPage()}
        </main>

        {/* Profile Modal + Overlay */}
        {showProfile && (
          <>
            <div className="fixed inset-0 bg-black bg-opacity-40 z-40"></div>
            <div className="fixed inset-0 flex justify-center items-center z-50">
              <ProfileModal
                user={user}
                onClose={() => setShowProfile(false)}
                onUpdate={(updatedUser) => setUser(updatedUser)}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
