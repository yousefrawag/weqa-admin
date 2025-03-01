const mongoose = require("mongoose");

const MONGODB_URI = process.env.DB_URL || "mongodb+srv://yousefrawag908:sqzsTTbP70vnjS1z@roha-studio.trd4s.mongodb.net/weqa?retryWrites=true&w=majority";

// Use a global variable to store the connection
let cached = global.mongoose || { conn: null, promise: null };

const dbCollection = async () => {
  if (cached.conn) {
    console.log("✅ Using existing MongoDB connection");
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("🚀 Connecting to MongoDB...");
    cached.promise = mongoose.connect(MONGODB_URI);
  }

  try {
    cached.conn = await cached.promise;
    console.log("✅ Connected to MongoDB Successfully");
    return cached.conn;
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

global.mongoose = cached;
module.exports = dbCollection;
