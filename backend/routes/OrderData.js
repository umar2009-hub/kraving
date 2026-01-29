// const express = require("express");
// const router = express.Router();
// const Order = require("../models/order");

// router.post("/orderData", async (req, res) => {
//   try {
//     const { email, order_data, order_date } = req.body;

//     if (!email || !order_data || !order_date) {
//       return res.status(400).json({ success: false });
//     }

//     const newOrder = {
//       order_date,
//       items: order_data,
//     };

//     const existingOrder = await Order.findOne({ email });

//     if (!existingOrder) {
//       await Order.create({
//         email,
//         order_data: [newOrder],
//       });
//     } else {
//       await Order.findOneAndUpdate(
//         { email },
//         { $push: { order_data: newOrder } }
//       );
//     }

//     res.status(200).json({ success: true });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false });
//   }
// });

// module.exports = router;

const express = require("express");
console.log("🔥 OrderData.js loaded");


const router = express.Router();
const Order = require("../models/Order");

// CREATE ORDER
router.post("/orderData", async (req, res) => {
  try {
    const { email, order_data, order_date } = req.body;

    if (!email || !order_data || !order_date) {
      return res.status(400).json({ success: false });
    }

    const newOrder = {
      order_date,
      items: order_data,
    };

    const existingOrder = await Order.findOne({ email });

    if (!existingOrder) {
      await Order.create({
        email,
        order_data: [newOrder],
      });
    } else {
      await Order.findOneAndUpdate(
        { email },
        { $push: { order_data: newOrder } }
      );
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
});

// ✅ FETCH USER ORDERS (THIS WAS MISSING)
// router.post("/myOrderData", async (req, res) => {
//   try {
//     const userOrders = await Order.findOne({ email: req.body.email });

//     res.status(200).json({
//       orderData: userOrders ? userOrders.order_data : [],
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false });
//   }
// });

router.post("/myOrderData", async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);

    const userOrders = await Order.findOne({ email: req.body.email });

    res.status(200).json({
      orderData: userOrders ? userOrders.order_data : [],
    });
  } catch (error) {
    console.error("MYORDER ERROR:", error);
    res.status(500).json({ success: false });
  }
});


router.post("/myOrderData", (req, res) => {
  res.json({ test: "route working" });
});

module.exports = router;

