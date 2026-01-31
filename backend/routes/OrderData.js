const express = require("express");
console.log("🔥 OrderData.js loaded");

const router = express.Router();
const Order = require("../models/Order");

// CREATE ORDER
router.post("/orderData", async (req, res) => {
  try {
    const { email, order_data } = req.body;

    if (!email || !order_data || !order_data.length) {
      return res.status(400).json({ success: false, message: "Missing data" });
    }

    // FRONTEND SENDS ARRAY → TAKE FIRST OBJECT
    const newOrder = {
      order_date: order_data[0].order_date,
      items: order_data[0].items
    };

    const existingOrder = await Order.findOne({ email });

    if (!existingOrder) {
      await Order.create({
        email,
        order_data: [newOrder]
      });
    } else {
      await Order.findOneAndUpdate(
        { email },
        { $push: { order_data: newOrder } }
      );
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("ORDER ERROR:", error);
    res.status(500).json({ success: false });
  }
});

// FETCH ORDERS
router.post("/myOrderData", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false });
    }

    const userOrders = await Order.findOne({ email });

    res.status(200).json({
      orderData: userOrders ? userOrders.order_data : []
    });
  } catch (error) {
    console.error("MYORDER ERROR:", error);
    res.status(500).json({ success: false });
  }
});

module.exports = router;
