import React, { useState, useEffect } from "react";
import "./Predictions.css";

export default function Predictions() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(data);
  }, []);

  const getRiskLevel = (risk) => {
    if (risk > 70) return "High";
    if (risk > 30) return "Medium";
    return "Low";
  };

  const getRiskColor = (risk) => {
    if (risk > 70) return "red";
    if (risk > 30) return "orange";
    return "green";
  };

  return (
    <div className="predictions-page">
      <h1>Disease Predictions</h1>

      {users.length === 0 ? (
        <p>No user data available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Disease</th>
              <th>Risk (%)</th>
              <th>Risk Level</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={i}>
                <td>{user.name}</td>
                <td>{user.disease}</td>
                <td>{user.risk}</td>
                <td style={{ color: getRiskColor(user.risk), fontWeight: "bold" }}>
                  {getRiskLevel(user.risk)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}