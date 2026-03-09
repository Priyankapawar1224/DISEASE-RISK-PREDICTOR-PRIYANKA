import React, { useState, useEffect } from "react";
import "./Settings.css";

export default function Settings({
  theme,
  setTheme,
  fontSize,
  setFontSize,
  adminUser,
  adminLogs,
  setAdminLogs,
  onLogout
}) {
  // ===== Profile =====
  const [name, setName] = useState(adminUser || "Admin Name");
  const [email, setEmail] = useState("admin@example.com");
  const [contact, setContact] = useState("1234567890");
  const [profilePic, setProfilePic] = useState(null);

  // ===== Security =====
  const [password, setPassword] = useState("");
  const [twoFA, setTwoFA] = useState(false);

  // ===== Dashboard Preferences =====
  const [dashboardView, setDashboardView] = useState("overview");
  const [autoLogout, setAutoLogout] = useState(15);

  // ===== Admin action logs =====
  const [recentActivity, setRecentActivity] = useState([]);

  // Load previous logs on mount
  useEffect(() => {
    if (adminLogs) setRecentActivity([...adminLogs]);
  }, [adminLogs]);

  const handleProfilePic = (e) => setProfilePic(URL.createObjectURL(e.target.files[0]));

  const logAction = (action) => {
    const time = new Date().toLocaleString();
    const logEntry = `${time} - ${adminUser} ${action}`;
    setRecentActivity((prev) => [logEntry, ...prev]);
    if (setAdminLogs) setAdminLogs([logEntry, ...recentActivity]);
  };

  const handleSave = () => {
    logAction("saved settings");
    alert("Settings saved successfully!");

    // Example: you can save these values to backend
    const savedSettings = {
      name,
      email,
      contact,
      theme,
      fontSize,
      dashboardView,
      autoLogout,
      twoFA,
      profilePic
    };
    console.log("Saved Settings:", savedSettings);
  };

  return (
    <div className={`settings-container ${theme} ${fontSize}`}>
      <h2>Admin Settings</h2>

      {/* ===== Profile ===== */}
      <section className="settings-section">
        <h3>Profile Info</h3>
        <div className="setting-item">
          <label>Name:</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="setting-item">
          <label>Email:</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="setting-item">
          <label>Contact Number:</label>
          <input value={contact} onChange={(e) => setContact(e.target.value)} />
        </div>
        <div className="setting-item">
          <label>Profile Picture:</label>
          <input type="file" onChange={handleProfilePic} />
          {profilePic && <img src={profilePic} alt="Profile" className="profile-pic" />}
        </div>
      </section>

      {/* ===== Security ===== */}
      <section className="settings-section">
        <h3>Security</h3>
        <div className="setting-item">
          <label>Change Password:</label>
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="setting-item checkbox">
          <label>
            <input type="checkbox" checked={twoFA} onChange={(e) => setTwoFA(e.target.checked)} />
            Enable Two-Factor Authentication
          </label>
        </div>
      </section>

      {/* ===== Dashboard Preferences ===== */}
      <section className="settings-section">
        <h3>Dashboard Preferences</h3>
        <div className="setting-item">
          <label>Theme:</label>
          <select
            value={theme}
            onChange={(e) => {
              setTheme(e.target.value);
              logAction(`changed theme to ${e.target.value}`);
            }}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
        <div className="setting-item">
          <label>Font Size:</label>
          <select
            value={fontSize}
            onChange={(e) => {
              setFontSize(e.target.value);
              logAction(`changed font size to ${e.target.value}`);
            }}
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>
        <div className="setting-item">
          <label>Default Dashboard View:</label>
          <select
            value={dashboardView}
            onChange={(e) => {
              setDashboardView(e.target.value);
              logAction(`changed dashboard view to ${e.target.value}`);
            }}
          >
            <option value="overview">Overview</option>
            <option value="analytics">Analytics</option>
            <option value="users">Users</option>
          </select>
        </div>
        <div className="setting-item">
          <label>Auto Logout (minutes):</label>
          <input
            type="number"
            min="1"
            max="120"
            value={autoLogout}
            onChange={(e) => {
              setAutoLogout(e.target.value);
              logAction(`changed auto logout to ${e.target.value} min`);
            }}
          />
        </div>
      </section>

      {/* ===== Admin Activity Logs ===== */}
      <section className="settings-section">
        <h3>Admin Activity Logs</h3>
        <ul className="activity-log">
          {recentActivity.map((act, idx) => (
            <li key={idx}>{act}</li>
          ))}
        </ul>
      </section>

      {/* ===== Buttons ===== */}
      <div className="settings-buttons">
        <button className="save-btn" onClick={handleSave}>
          Save Settings
        </button>
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}