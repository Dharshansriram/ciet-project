/**
 * app.js — Express application
 * ------------------------------
 * Registers all middleware and routes.
 * Kept clean: no business logic here.
 */
"use strict";

const express = require("express");
const cors    = require("cors");
require("dotenv").config();

const app = express();

// ── CORS ─────────────────────────────────────────────────────────
const ALLOWED_ORIGINS = [
  "https://ciet-placementtraining.vercel.app",
  "http://localhost:5500",
  "http://127.0.0.1:5500",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "null", // file:// protocol during local dev
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || ALLOWED_ORIGINS.includes(origin)) return callback(null, true);
    callback(new Error(`CORS: origin not allowed — ${origin}`));
  },
  methods:     ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json({ limit: "2mb" }));

// ── Health Check ─────────────────────────────────────────────────
app.get("/", (_, res) => res.json({ success: true, message: "CIET Placement Training API v3" }));

// ── Auth ─────────────────────────────────────────────────────────
app.use("/api/auth",      require("./routes/auth.routes"));

// ── Users / Admin ─────────────────────────────────────────────────
app.use("/api/users",     require("./routes/users.routes"));
app.use("/api/admin",     require("./routes/admin.routes"));
app.use("/api/admin",     require("./routes/answerSheet.routes"));

// ── Questions (legacy aptitude engine) ───────────────────────────
app.use("/api/questions", require("./routes/questions.routes"));
app.use("/api/attempt",   require("./routes/attempt.routes"));
app.use("/api/result",    require("./routes/result.routes"));
app.use("/api",           require("./routes/submit.routes"));

// ── Training (DSA + Aptitude topic-based) ────────────────────────
app.use("/api/training",  require("./routes/training.routes"));

// ── 404 ──────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Not found: ${req.method} ${req.originalUrl}` });
});

// ── Error Handler ────────────────────────────────────────────────
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error("[ERROR]", err.message);
  res.status(err.statusCode || 500).json({ success: false, message: err.message || "Internal Server Error" });
});

module.exports = app;
