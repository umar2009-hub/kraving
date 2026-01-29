const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/createuser', async (req, res) => {
  try {
    const { name, email, password, geolocation } = req.body;

    if (!name || !email || !password || !geolocation) {
      return res.status(400).json({
        success: false,
        error: "All fields are required"
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: "Email already registered"
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({
      name,
      email,
      password: hashedPassword,
      location: geolocation
    });


    res.status(201).json({
      success: true,
      message: "User created successfully"
    });

  } catch (error) {
    console.error("Create User Error:", error);
    res.status(500).json({
      success: false,
      error: "Server error"
    });
  }
});


router.post('/loginuser', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "Email and password are required"
      });
    }

    // 2️⃣ Find user
    const userData = await User.findOne({ email });
    if (!userData) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials"
      });
    }

    // 3️⃣ Compare password
    const isMatch = await bcrypt.compare(password, userData.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials"
      });
    }

    // 4️⃣ Create JWT payload
    const data = {
      user: {
        id: userData.id
      }
    };

    // 5️⃣ Sign JWT
    const token = jwt.sign(
      data,
      process.env.JWT_SECRET || "mySuperSecretKey",
      { expiresIn: "1h" }
    );

    // 6️⃣ Send response
    res.json({
      success: true,
      token
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({
      success: false,
      error: "Server error"
    });
  }
});


module.exports = router;

