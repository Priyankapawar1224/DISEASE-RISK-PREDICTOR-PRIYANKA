import React, { useState } from "react";
import "./Login.css";
import API_URL from "../config";

export default function Login({ switchToRegister, switchToForgot, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Send user data to App.js
        // Make sure backend sends user object with email (or name)
        onLogin(data.user);
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Server error, try again later");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
      </form>

      <p>
        Don't have an account?{" "}
        <span className="switch-link" onClick={switchToRegister}>
          Register
        </span>
      </p>

      <p>
        Forgot password?{" "}
        <span className="switch-link" onClick={switchToForgot}>
          Reset here
        </span>
      </p>
    </div>
  );
}