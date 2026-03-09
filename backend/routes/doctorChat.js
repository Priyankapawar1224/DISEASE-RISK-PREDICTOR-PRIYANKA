const express = require("express");
const router = express.Router();
const OpenAI = require("openai");
const jwt = require("jsonwebtoken");

// JWT Middleware
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "Access denied, token missing" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

// OpenAI setup
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Doctor Chat route
router.post("/", authMiddleware, async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ message: "Message required" });

  try {
    console.log("Message received:", message); // Debugging

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    console.log("OpenAI response:", response); // Debugging

    const reply = response.choices?.[0]?.message?.content;
    if (!reply) throw new Error("No response from OpenAI");

    res.json({ reply });
  } catch (err) {
    console.error("Doctor Chat Error:", err.response?.data || err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;