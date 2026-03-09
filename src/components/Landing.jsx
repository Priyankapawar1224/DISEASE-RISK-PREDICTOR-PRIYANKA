import React from "react";
import "./Landing.css";

export default function Landing({ goToLogin, goToRegister, goToAdmin }) {
  return (
    <div className="landing">

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">VitalSense AI</div>
          <ul className="nav-menu">
            <li onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Home</li>
            <li onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}>Features</li>
            <li onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}>About</li>
            <li onClick={() => document.getElementById("how")?.scrollIntoView({ behavior: "smooth" })}>How It Works</li>
            <li onClick={() => document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" })}>FAQ</li>
            <li onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>Contact</li>
          </ul>
          <div className="auth-buttons">
            <button className="login-btn" onClick={goToLogin}>Login</button>
            <button className="register-btn" onClick={goToRegister}>Register</button>
            <button className="admin-btn" onClick={goToAdmin}>Admin</button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="hero" id="home">
        <div className="hero-container">
          <div className="hero-left">
            <h1>Smarter <span>Predictions</span>, <br /> Healthier Future</h1>
            <p>
              VitalSense AI is an AI-powered disease risk prediction platform that analyzes your health data
              and provides personalized preventive strategies in real-time.
            </p>
            <div className="hero-buttons">
              <button className="primary-btn" onClick={goToRegister}>Get Started</button>
              <button className="secondary-btn" onClick={goToLogin}>Login</button>
            </div>
          </div>
          <div className="hero-right">
            <img src="https://cdn-icons-png.flaticon.com/512/4149/4149676.png" alt="AI Healthcare" />
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="features" id="features">
        <h2>Powerful Features</h2>
        <div className="feature-grid">
          <div className="card">
            <h3>AI Disease Detection</h3>
            <p>Detect potential risks of diseases using machine learning models.</p>
          </div>
          <div className="card">
            <h3>Real-Time Analysis</h3>
            <p>Receive instant predictive health reports with actionable insights.</p>
          </div>
          <div className="card">
            <h3>Personalized Plans</h3>
            <p>Lifestyle recommendations tailored to your health profile.</p>
          </div>
          <div className="card">
            <h3>Secure & Private</h3>
            <p>End-to-end encryption ensures your data remains private.</p>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="about" id="about">
        <h2>About VitalSense AI</h2>
        <p>
          VitalSense AI leverages advanced machine learning algorithms to help individuals monitor
          their health, identify risks early, and maintain a healthier lifestyle.
          Your data is safe with us, fully encrypted and private.
        </p>
      </section>

      {/* HOW IT WORKS */}
      <section className="how" id="how">
        <h2>How It Works</h2>
        <div className="how-grid">
          <div className="how-card">
            <h3>1. Enter Your Data</h3>
            <p>Provide health details like age, medical history, lifestyle, and habits.</p>
          </div>
          <div className="how-card">
            <h3>2. AI Analysis</h3>
            <p>Our AI algorithms analyze your data and predict potential health risks.</p>
          </div>
          <div className="how-card">
            <h3>3. Personalized Report</h3>
            <p>Receive an easy-to-understand report with health insights and tips.</p>
          </div>
          <div className="how-card">
            <h3>4. Prevention Plan</h3>
            <p>Get actionable lifestyle recommendations to reduce disease risks.</p>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="faq" id="faq">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-item">
          <h3>How does VitalSense AI predict diseases?</h3>
          <p>We use AI models trained on medical data to provide risk analysis based on your health inputs.</p>
        </div>
        <div className="faq-item">
          <h3>Is my data safe?</h3>
          <p>Yes! We ensure end-to-end encryption and privacy for all user data.</p>
        </div>
        <div className="faq-item">
          <h3>Can I use this for multiple health conditions?</h3>
          <p>Yes, our platform supports risk prediction for multiple diseases and conditions.</p>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="contact" id="contact">
        <h2>Contact Us</h2>
        <p>Have questions or need support? Reach out to us anytime!</p>
        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2026 VitalSense AI | AI Disease Risk Predictor Platform</p>
        <p>Designed & Developed by Priyanka Pawar</p>
      </footer>
    </div>
  );
}