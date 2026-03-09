import React from "react";
import "./AdminOverview.css";

export default function AdminOverview() {

  return (

    <div className="overview-page">

      {/* HERO */}
      <div className="overview-hero">
        <h1>AI Health Analytics Dashboard</h1>
        <p>Monitor disease predictions, patient data and AI insights in real time.</p>
      </div>


      {/* ================= STATS ================= */}

      <div className="stats-grid">

        <div className="stat-card">
          <h2>850</h2>
          <p>Total Users</p>
          <span className="green">+12% this month</span>
        </div>

        <div className="stat-card">
          <h2>1200</h2>
          <p>Total Predictions</p>
          <span className="green">+8% growth</span>
        </div>

        <div className="stat-card">
          <h2>75</h2>
          <p>High Risk Patients</p>
          <span className="red">Needs Attention</span>
        </div>

        <div className="stat-card">
          <h2>15</h2>
          <p>Diseases Tracked</p>
          <span className="blue">AI Dataset</span>
        </div>

        <div className="stat-card">
          <h2>91%</h2>
          <p>Prediction Accuracy</p>
          <span className="green">Model Performance</span>
        </div>

        <div className="stat-card">
          <h2>230</h2>
          <p>Daily Predictions</p>
          <span className="blue">AI Usage</span>
        </div>

        {/* EXTRA CARDS */}

        <div className="stat-card">
          <h2>42</h2>
          <p>New Registrations</p>
          <span className="green">Today</span>
        </div>

        <div className="stat-card">
          <h2>12</h2>
          <p>AI Alerts</p>
          <span className="red">Critical</span>
        </div>

        <div className="stat-card">
          <h2>340</h2>
          <p>Active Sessions</p>
          <span className="blue">Users Online</span>
        </div>

        <div className="stat-card">
          <h2>8</h2>
          <p>AI Models</p>
          <span className="green">Running</span>
        </div>

        <div className="stat-card">
          <h2>2.3k</h2>
          <p>Dataset Records</p>
          <span className="blue">Medical Data</span>
        </div>

        <div className="stat-card">
          <h2>99%</h2>
          <p>Server Uptime</p>
          <span className="green">Stable</span>
        </div>

      </div>


      {/* ================= GRID SECTION ================= */}

      <div className="overview-grid">

        <div className="activity-card">
          <h3>Recent Activity</h3>

          <ul>
            <li>User Priya generated Diabetes prediction</li>
            <li>New user registered in system</li>
            <li>AI model updated successfully</li>
            <li>High risk patient alert generated</li>
            <li>New dataset uploaded to system</li>
            <li>Prediction report downloaded</li>
            <li>Admin verified new patient records</li>
          </ul>

        </div>


        <div className="activity-card">
          <h3>System Status</h3>

          <ul>
            <li>AI Engine : Running</li>
            <li>Database : Connected</li>
            <li>Prediction API : Active</li>
            <li>Server Health : Stable</li>
            <li>Security Monitor : Enabled</li>
            <li>Backup System : Active</li>
            <li>Firewall : Protected</li>
          </ul>

        </div>

      </div>


      {/* ================= TABLE ================= */}

      <div className="table-section">

        <h3>Recent Users</h3>

        <table>

          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Disease</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            <tr>
              <td>Priya</td>
              <td>priya@gmail.com</td>
              <td>Diabetes</td>
              <td className="red">High Risk</td>
            </tr>

            <tr>
              <td>Rahul</td>
              <td>rahul@gmail.com</td>
              <td>Heart Disease</td>
              <td className="green">Normal</td>
            </tr>

            <tr>
              <td>Neha</td>
              <td>neha@gmail.com</td>
              <td>Liver Disease</td>
              <td className="orange">Medium Risk</td>
            </tr>

            <tr>
              <td>Amit</td>
              <td>amit@gmail.com</td>
              <td>Kidney Disease</td>
              <td className="green">Normal</td>
            </tr>

            <tr>
              <td>Sneha</td>
              <td>sneha@gmail.com</td>
              <td>Heart Disease</td>
              <td className="orange">Medium Risk</td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>

  );
}