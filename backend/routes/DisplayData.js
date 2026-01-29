const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.post("/foodData", async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(500).json({ error: "Database not connected" });
    }

    const db = mongoose.connection.db;

    const foodItems = await db.collection("food_items").find({}).toArray();
    const foodCategories = await db.collection("foodCategory").find({}).toArray();

    res.json({
      foodItems,
      foodCategories,
    });
  } catch (error) {
    console.error("❌ DisplayData error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
