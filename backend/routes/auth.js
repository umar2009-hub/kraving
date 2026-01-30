const express = require("express");
const router = express.Router();

const {
  register,
  login
} = require("../controllers/authController");

const authMiddleware = require("../middlewares/authMiddleware");

// AUTH ROUTES
router.post("/register", register);
router.post("/login", login);

// GET CURRENT USER
router.get("/me", authMiddleware, (req, res) => {
  res.json({
    user: {
      id: req.userId
    }
  });
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
