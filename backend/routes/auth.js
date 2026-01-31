const express = require("express");
const router = express.Router();

const User = require("../models/User"); // 🔥 NEW
const {
  register,
  login
} = require("../controllers/authController");

const authMiddleware = require("../middlewares/authMiddleware");

// AUTH ROUTES
router.post("/register", register);
router.post("/login", login);

// GET CURRENT USER
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("name email role");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error("ME route error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// LOGOUT
router.post("/logout", (req, res) => {
  const isProd = process.env.NODE_ENV === "production";

  res
    .clearCookie("accessToken", {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax"
    })
    .clearCookie("refreshToken", {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax"
    })
    .status(200)
    .json({ message: "Logged out successfully" });
});

module.exports = router;
