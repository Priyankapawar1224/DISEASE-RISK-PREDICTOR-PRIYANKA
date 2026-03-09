import React, { useState, useEffect } from "react";

import {
  getNotifications,
  addNotification,
  updateNotification,
  deleteNotification,
  toggleImportant,
  clearNotifications
} from "../../../Service/notificationService";

import "./AdminNotifications.css";

export default function AdminNotifications() {

  const [notifications, setNotifications] = useState([]);

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("Info");

  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    refresh();
  }, []);

  const refresh = () => {
    const data = getNotifications();
    setNotifications(Array.isArray(data) ? data : []);
  };

  /* ADD / UPDATE */

  const handleSubmit = () => {

    if (!title || !message) return;

    if (editId) {
      updateNotification(editId, title, message, type);
      setEditId(null);
    } else {
      addNotification(title, message, type);
    }

    setTitle("");
    setMessage("");

    refresh();
  };

  /* DELETE */

  const handleDelete = (n) => {
    deleteNotification(n.id);
    refresh();
  };

  /* EDIT */

  const handleEdit = (n) => {
    setTitle(n.title);
    setMessage(n.message);
    setType(n.type);
    setEditId(n.id);
  };

  /* IMPORTANT */

  const handleImportant = (n) => {
    toggleImportant(n.id);
    refresh();
  };

  /* CLEAR */

  const handleClear = () => {
    clearNotifications();
    refresh();
  };

  /* SEARCH */

  const filtered = notifications.filter(n =>
    n.title.toLowerCase().includes(search.toLowerCase())
  );

  const unread = notifications.filter(n => !n.read).length;
  const important = notifications.filter(n => n.important).length;

  return (

    <div className="admin-notification-page">

      <h1>🔔 Admin Notification Center</h1>

      {/* STATS */}

      <div className="stats">

        <div className="card">
          <h3>Total</h3>
          <p>{notifications.length}</p>
        </div>

        <div className="card">
          <h3>Unread</h3>
          <p>{unread}</p>
        </div>

        <div className="card">
          <h3>Important</h3>
          <p>{important}</p>
        </div>

      </div>

      {/* SEARCH */}

      <input
        className="search"
        placeholder="Search notifications..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* FORM */}

      <div className="form">

        <h2>{editId ? "Update Notification" : "Add Notification"}</h2>

        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option>Info</option>
          <option>Warning</option>
          <option>Health</option>
        </select>

        <div className="form-buttons">

          <button onClick={handleSubmit}>
            {editId ? "Update" : "Add"}
          </button>

          <button
            className="clear"
            onClick={handleClear}
          >
            Clear All
          </button>

        </div>

      </div>

      {/* LIST */}

      <div className="notification-list">

        {filtered.map(n => (

          <div key={n.id} className={`notification ${n.type}`}>

            <div className="left">

              <h3>
                {n.important && "⭐ "} {n.title}
              </h3>

              <p>{n.message}</p>

              <span>{n.time}</span>

            </div>

            <div className="right">

              <button onClick={() => handleImportant(n)}>
                ⭐
              </button>

              <button onClick={() => handleEdit(n)}>
                Edit
              </button>

              <button onClick={() => handleDelete(n)}>
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}