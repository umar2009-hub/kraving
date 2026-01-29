const mongoose = require("mongoose");

const mongoDBconnect = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI not found");
  }

  await mongoose.connect(process.env.MONGO_URI);
  console.log("✅ MongoDB connected successfully");
};

module.exports = mongoDBconnect;
