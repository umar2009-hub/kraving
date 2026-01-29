const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://umarabd104:kraving123@cluster0.q0gasqt.mongodb.net/?appName=Cluster0";



const mongoDBconnect = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = mongoDBconnect;
