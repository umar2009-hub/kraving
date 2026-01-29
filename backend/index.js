const express = require("express");
const cors = require("cors");
require("dotenv").config();

console.log("🔥 index.js loaded");

const app = express();
const port = process.env.PORT || 5000;

// DB connection
const mongoDBconnect = require("./db");

// 🔑 Connect DB BEFORE using routes
mongoDBconnect();

// Middlewares
app.use(express.json());
app.use(cors({ origin: "*" }));

// Health check route
app.get("/", (req, res) => {
  res.send("Hello World!!!");
});

// Routes
app.use("/api", require("./routes/CreateUser"));
app.use("/api", require("./routes/DisplayData"));
app.use("/api", require("./routes/OrderData"));

// Start server
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
