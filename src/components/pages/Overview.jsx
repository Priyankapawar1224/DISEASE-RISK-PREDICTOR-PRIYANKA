import React, { useState, useEffect } from "react";
import "./Overview.css";
import {
  AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from "recharts";

import {
  FaHeartbeat, FaTint, FaBed, FaWalking, FaBrain, FaBell
} from "react-icons/fa";


import { getNotifications, markAsRead } from "../../Service/notificationService";

const riskData = [
  { month: "Jan", risk: 40 },
  { month: "Feb", risk: 35 },
  { month: "Mar", risk: 50 },
  { month: "Apr", risk: 30 },
  { month: "May", risk: 25 },
  { month: "Jun", risk: 20 },
];

const activityData = [
  { day: "Mon", steps: 4000 },
  { day: "Tue", steps: 6500 },
  { day: "Wed", steps: 5000 },
  { day: "Thu", steps: 8000 },
  { day: "Fri", steps: 7000 },
  { day: "Sat", steps: 9000 },
  { day: "Sun", steps: 6000 },
];

export default function Overview() {

  const [notifications, setNotifications] = useState([]);
  const [showNotif, setShowNotif] = useState(false);
  const [toast, setToast] = useState(null);

  /* SAFE LOAD NOTIFICATIONS */
  useEffect(() => {

    const loadNotifications = () => {

      let data = getNotifications();

      // FIX: ensure array
      if (!Array.isArray(data)) {
        data = [];
      }

      setNotifications(prev => {

        if (prev.length < data.length) {
          const newNotif = data[0];
          if (newNotif) {
            setToast(newNotif);
            setTimeout(() => setToast(null), 2000);
          }
        }

        return data;
      });

    };

    loadNotifications();

    const interval = setInterval(loadNotifications, 2000);

    return () => clearInterval(interval);

  }, []);

  const unreadCount = Array.isArray(notifications)
    ? notifications.filter(n => !n.read).length
    : 0;

  const handleToggleNotif = () => {
    setShowNotif(!showNotif);
  };

  const handleMarkAsRead = (id) => {

    markAsRead(id);

    let updated = getNotifications();

    if (!Array.isArray(updated)) updated = [];

    setNotifications(updated);

  };

  return (
    <div className="overview-container">

      {/* TOPBAR */}
      <div className="topbar">

        <div>
          <h2>Welcome Back, Priyanka 👋</h2>
          <p>Your AI-powered health intelligence dashboard</p>
        </div>

        <div className="notif-bell" onClick={handleToggleNotif}>
          <FaBell />

          {unreadCount > 0 && (
            <span className="notif-count">{unreadCount}</span>
          )}

        </div>

      </div>

      {/* TOAST */}
      {toast && (
        <div className={`toast ${toast.type}`}>
          <h4>{toast.title}</h4>
          <p>{toast.message}</p>
        </div>
      )}

      {/* NOTIFICATION DROPDOWN */}
      {showNotif && (

        <div className="notif-dropdown">

          {notifications.length === 0 ? (

            <p className="no-notification">No new notifications</p>

          ) : (

            notifications.map(n => (

              <div key={n.id} className={`notification-card ${n.type}`}>

                <div className="notif-header">
                  <h4>{n.title}</h4>
                  <span>{n.time}</span>
                </div>

                <p>{n.message}</p>

                {!n.read && (
                  <button
                    className="mark-read"
                    onClick={() => handleMarkAsRead(n.id)}
                  >
                    Mark as Read
                  </button>
                )}

              </div>

            ))

          )}

        </div>

      )}

      {/* RISK SCORE */}
      <div className="risk-score-card">
        <h3>Overall Disease Risk Score</h3>

        <div className="risk-progress">
          <div className="progress-bar"></div>
        </div>

        <p className="risk-percent">28% Risk Probability</p>
      </div>

      {/* HEALTH CARDS */}
      <div className="overview-cards">

        <div className="health-card">
          <FaHeartbeat className="card-icon red"/>
          <h3>Heart Rate</h3>
          <p>76 bpm</p>
          <span className="status good">Normal</span>
        </div>

        <div className="health-card">
          <FaTint className="card-icon blue"/>
          <h3>Blood Pressure</h3>
          <p>120 / 80</p>
          <span className="status good">Stable</span>
        </div>

        <div className="health-card">
          <FaBed className="card-icon purple"/>
          <h3>Sleep</h3>
          <p>7.5 Hours</p>
          <span className="status good">Healthy</span>
        </div>

        <div className="health-card">
          <FaWalking className="card-icon green"/>
          <h3>Steps Today</h3>
          <p>8,245</p>
          <span className="status improve">Keep Going</span>
        </div>

      </div>

      {/* AI INSIGHTS */}
      <div className="ai-insights">

        <h3><FaBrain /> AI Health Insights</h3>

        <ul>
          <li>✔ Your cardiovascular risk has decreased by 10% this month</li>
          <li>✔ Maintain current sleep cycle for optimal immune response</li>
          <li>⚠ Increase hydration level slightly</li>
        </ul>

      </div>

      {/* CHARTS */}
      <div className="overview-charts">

        <div className="chart-card">

          <h3>Disease Risk Trend</h3>

          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={riskData}>
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis dataKey="month"/>
              <YAxis/>
              <Tooltip/>
              <Area type="monotone" dataKey="risk" stroke="#6366f1" fill="#a5b4fc"/>
            </AreaChart>
          </ResponsiveContainer>

        </div>

        <div className="chart-card">

          <h3>Weekly Activity</h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis dataKey="day"/>
              <YAxis/>
              <Tooltip/>
              <Bar dataKey="steps" fill="#22c55e"/>
            </BarChart>
          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
}