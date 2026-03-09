import React from "react";
import "./AdminSidebar.css";

export default function AdminSidebar({ page, setPage }) {

  return (

    <div className="admin-sidebar">

      <div className="sidebar-logo">
        <h2>AI Admin</h2>
      </div>

      <div className="sidebar-menu">

        <button
          className={page === "overview" ? "active" : ""}
          onClick={() => setPage("overview")}
        >
          Dashboard
        </button>

        <button
          className={page === "users" ? "active" : ""}
          onClick={() => setPage("users")}
        >
          Users Data
        </button>

        <button
          className={page === "predictions" ? "active" : ""}
          onClick={() => setPage("predictions")}
        >
          Predictions
        </button>

        <button
          className={page === "notifications" ? "active" : ""}
          onClick={() => setPage("notifications")}
        >
          Notifications
        </button>

        <button
          className={page === "settings" ? "active" : ""}
          onClick={() => setPage("settings")}
        >
          Settings
        </button>

      </div>

    </div>

  );

}