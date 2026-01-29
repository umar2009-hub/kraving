const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.post("/foodData", async (req, res) => {
  try {
    // Ensure MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(500).json({
        error: "Database not connected",
      });
    }

    const db = mongoose.connection.db;

    const foodItems = await db
      .collection("food_items")
      .find({})
      .toArray();

    const foodCategories = await db
      .collection("foodCategory")
      .find({})
      .toArray();

    res.json({
      foodItems,
      foodCategories,
    });
  } catch (error) {
    console.error("FoodData API error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
