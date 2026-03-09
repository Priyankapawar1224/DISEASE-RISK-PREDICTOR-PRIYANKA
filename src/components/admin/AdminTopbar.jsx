import React from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";
import "./AdminTopbar.css";

export default function AdminTopbar() {

  const today = new Date().toLocaleDateString("en-IN",{
    weekday:"long",
    year:"numeric",
    month:"long",
    day:"numeric"
  });

  return (

    <div className="admin-topbar">

      {/* LEFT DATE */}
      <div className="topbar-left">
        <p>{today}</p>
      </div>

      {/* CENTER TITLE */}
      <div className="topbar-title">
        AI Early Disease Risk Predictor
      </div>

      {/* RIGHT SECTION */}
      <div className="topbar-right">

        <div className="notification">
          <FaBell/>
          <span className="badge">3</span>
        </div>

        <div className="admin-profile">
          <FaUserCircle className="profile-icon"/>
          <div>
            <h4>Admin</h4>
            <p>System Manager</p>
          </div>
        </div>

      </div>

    </div>

  );

}