import React, { useState, useEffect } from "react";
import "./Settings.css"; // Add styling later

export default function Settings() {
  // ====== STATE ======
  const [profile, setProfile] = useState(localStorage.getItem("profile") || "");
  const [name, setName] = useState(localStorage.getItem("name") || "");
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [fontSize, setFontSize] = useState(localStorage.getItem("fontSize") || "medium");
  const [language, setLanguage] = useState(localStorage.getItem("language") || "English");

  // ===== APPLY THEME & FONT SIZE =====
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    document.body.setAttribute("data-font", fontSize);
  }, [theme, fontSize]);

  // ===== UPLOAD PROFILE IMAGE =====
  const uploadImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile(reader.result);
    };
    if (file) reader.readAsDataURL(file);
  };

  // ===== SAVE SETTINGS =====
  const saveSettings = () => {
    localStorage.setItem("profile", profile);
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("theme", theme);
    localStorage.setItem("fontSize", fontSize);
    localStorage.setItem("language", language);
    alert("Settings saved successfully!");
  };

  return (
    <div className="settingsPage">
      <h2>Settings</h2>

      {/* PROFILE IMAGE */}
      <div className="settingCard">
        <h3>Profile Picture</h3>
        <img
          src={profile || "https://via.placeholder.com/80"}
          alt="profile"
          className="profileImage"
        />
        <input type="file" onChange={uploadImage} />
      </div>

      {/* NAME */}
      <div className="settingCard">
        <h3>Name</h3>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
      </div>

      {/* EMAIL */}
      <div className="settingCard">
        <h3>Email</h3>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </div>

      {/* THEME */}
      <div className="settingCard">
        <h3>Theme</h3>
        <button
          className={theme === "light" ? "activeBtn" : ""}
          onClick={() => setTheme("light")}
        >
          Light
        </button>
        <button
          className={theme === "dark" ? "activeBtn" : ""}
          onClick={() => setTheme("dark")}
        >
          Dark
        </button>
      </div>

      {/* FONT SIZE */}
      <div className="settingCard">
        <h3>Font Size</h3>
        <select value={fontSize} onChange={(e) => setFontSize(e.target.value)}>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </div>

      {/* LANGUAGE */}
      <div className="settingCard">
        <h3>Language</h3>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option>English</option>
          <option>Hindi</option>
          <option>Spanish</option>
        </select>
      </div>

      {/* SAVE BUTTON */}
      <div className="settingCard">
        <button className="saveBtn" onClick={saveSettings}>
          Save Settings
        </button>
      </div>
    </div>
  );
}