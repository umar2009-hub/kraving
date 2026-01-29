const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.post('/foodData', async (req, res) => {
  try {
    const foodItemsCollection = mongoose.connection.db.collection("food_items");
    const foodCategoryCollection = mongoose.connection.db.collection("foodCategory");

    const foodItems = await foodItemsCollection.find({}).toArray();
    const foodCategories = await foodCategoryCollection.find({}).toArray();

    res.json({
      foodItems,
      foodCategories
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
