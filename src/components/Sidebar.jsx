import React, { useState } from "react";
import "./Sidebar.css";
import { FaBars } from "react-icons/fa"; // hamburger icon

export default function Sidebar({ page, setPage }) {
  const [open, setOpen] = useState(true);

  const handlePageClick = (p) => {
    setPage(p);
  };

  return (
    <>
      {/* Toggle button */}
      <div className="menu-toggle" onClick={() => setOpen(!open)}>
        <FaBars size={20} />
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${open ? "open" : "closed"}`}>
        <h2 className={open ? "" : "collapsed"}>VitalAI</h2>
        <ul>
          <li
            className={page === "overview" ? "active" : ""}
            onClick={() => handlePageClick("overview")}
          >
            <span className="icon">🏠</span>
            {open && "Overview"}
          </li>
          <li
            className={page === "analytics" ? "active" : ""}
            onClick={() => handlePageClick("analytics")}
          >
            <span className="icon">📊</span>
            {open && "Analytics"}
          </li>
          <li
            className={page === "doctor" ? "active" : ""}
            onClick={() => handlePageClick("doctor")}
          >
            <span className="icon">💬</span>
            {open && "Doctor Chat"}
          </li>
          <li
            className={page === "diet" ? "active" : ""}
            onClick={() => handlePageClick("diet")}
          >
            <span className="icon">🥗</span>
            {open && "Diet Plan"}
          </li>
          <li
            className={page === "settings" ? "active" : ""}
            onClick={() => handlePageClick("settings")}
          >
            <span className="icon">⚙️</span>
            {open && "Settings"}
          </li>
        </ul>
      </div>
    </>
  );
}