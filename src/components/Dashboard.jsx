import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

import Overview from "./pages/Overview";
import Analytics from "./pages/Analytics";
import Doctor from "./pages/DoctorChat";
import Diet from "./pages/Diet";
import Settings from "./pages/Settings";

export default function Dashboard() {

  const [page, setPage] = useState("overview");

  // Dark mode from localStorage
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  // Profile image from settings
  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("profile") || ""
  );

  // Save dark mode
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // Update profile image automatically
  useEffect(() => {
    const interval = setInterval(() => {
      const savedImage = localStorage.getItem("profile");
      if (savedImage !== profileImage) {
        setProfileImage(savedImage);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [profileImage]);

  const renderPage = () => {
    switch (page) {
      case "overview":
        return <Overview />;

      case "analytics":
        return <Analytics />;

      case "doctor":
        return <Doctor />;

      case "diet":
        return <Diet />;

      case "settings":
        return (
          <Settings
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
        );

      default:
        return <Overview />;
    }
  };

  return (
    <div className={`dashboard ${darkMode ? "dark" : ""}`}>

      <Sidebar page={page} setPage={setPage} />

      <div className="main">

        {/* Topbar with profile image */}
        <Topbar page={page} profileImage={profileImage} />

        <div className="content">
          <div className="page">
            {renderPage()}
          </div>
        </div>

      </div>
    </div>
  );
}