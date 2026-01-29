const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

const mongoDBconnect = require("./db");

app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  res.send("Hello World!!!");
});

// 🚀 Start server ONLY after DB connects
mongoDBconnect()
  .then(() => {
    console.log("✅ DB ready, starting server...");

    app.use("/api", require("./routes/CreateUser"));
    app.use("/api", require("./routes/DisplayData"));
    app.use("/api", require("./routes/OrderData"));

    app.listen(port, () => {
      console.log(`✅ Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to start server:", err.message);
  });
