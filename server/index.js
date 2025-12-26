const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const reminderRoutes = require("./routes/reminderRoutes");

const app = express();
const PORT = process.env.PORT || 5000;
const db = require("./Config/db");

// Database initialization
async function initDB() {
    try {
        await db.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS google_refresh_token TEXT AFTER profile_image`);
        await db.query(`ALTER TABLE reminders ADD COLUMN IF NOT EXISTS google_event_id VARCHAR(255) AFTER is_completed`);
        console.log("✅ Database schema updated for Google Calendar");
    } catch (err) {
        console.log("ℹ️ Database update skip (columns may already exist):", err.message);
    }
}
initDB();

app.use(cors());
app.use(express.json());

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

app.use("/uploads", express.static(uploadDir));

app.use("/api/auth", authRoutes);
app.use("/api/reminders", reminderRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
