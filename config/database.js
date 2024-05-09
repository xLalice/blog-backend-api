const mongoose = require("mongoose");
require("dotenv").config();

async function connectDB() {
    try {
      await mongoose.connect(process.env.DB_STRING);
      console.log('MongoDB connected');
    } catch (error) {
      console.error('MongoDB connection failed:', error.message);
      process.exit(1); // Exit with failure
    }
}

module.exports = connectDB;
