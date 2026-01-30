const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// DB connection
const mongoDBconnect = require("./db");

// ─────────────────────────────
// Middlewares
// ─────────────────────────────
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://kraving-frontend.netlify.app"
    ],
    credentials: true
  })
);

// Health check
app.get("/", (req, res) => {
  res.send("Kraving backend is running 🚀");
});

// ─────────────────────────────
// Start server ONLY after DB connects
// ─────────────────────────────
mongoDBconnect()
  .then(() => {
    console.log("✅ DB connected, registering routes...");

    app.use("/api", require("./routes/CreateUser"));
    app.use("/api", require("./routes/DisplayData"));
    app.use("/api", require("./routes/OrderData"));

    // Auth routes
    app.use("/api/auth", require("./routes/auth"));

    app.listen(port, () => {
      console.log(`✅ Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to start server:", err.message);
  });
