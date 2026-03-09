import React, { useState } from "react";
import "./Admin.css";

import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

import AdminOverview from "./pages/AdminOverview";
import UsersData from "./pages/UserData";
import Predictions from "./pages/Predictions";
import AdminNotification from "./pages/AdminNotifications";
import Settings from "./pages/Settings";

export default function AdminDashboard({ adminUser, switchToAdminLogin }) {

  const [page, setPage] = useState("overview");

  /* Dashboard Theme */
  const [theme, setTheme] = useState("light");

  /* Font Size */
  const [fontSize, setFontSize] = useState("medium");

  /* Admin Logs */
  const [adminLogs, setAdminLogs] = useState([]);

  /* Page Titles */
  const pageTitles = {
    overview: "Dashboard Overview",
    users: "Users Management",
    predictions: "Disease Predictions",
    notifications: "Admin Notifications",
    settings: "Admin Settings"
  };

  /* Page Renderer */
  const renderPage = () => {

    switch (page) {

      case "overview":
        return <AdminOverview />;

      case "users":
        return <UsersData />;

      case "predictions":
        return <Predictions />;

      case "notifications":
        return <AdminNotification />;

      case "settings":
        return (
          <Settings
            theme={theme}
            setTheme={setTheme}
            fontSize={fontSize}
            setFontSize={setFontSize}
            adminUser={adminUser}
            adminLogs={adminLogs}
            setAdminLogs={setAdminLogs}
            onLogout={switchToAdminLogin}
          />
        );

      default:
        return <AdminOverview />;
    }
  };

  return (
    <div className={`admin-dashboard ${theme} ${fontSize}`}>

      {/* Sidebar */}
      <AdminSidebar page={page} setPage={setPage} />

      <div className="admin-main">

        {/* Topbar */}
        <AdminTopbar />

        <div className="admin-content-wrapper">

          {/* Page Header */}
          <div className="admin-page-header">

            <div className="header-left">
              <h1>{pageTitles[page]}</h1>
            </div>

            <div className="header-right">
              <span className="breadcrumb">
                Admin / {pageTitles[page]}
              </span>
            </div>

          </div>

          {/* Page Content */}
          <div className="admin-content">
            {renderPage()}
          </div>

        </div>

      </div>

    </div>
  );
}