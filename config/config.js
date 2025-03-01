const mongoose = require("mongoose");

const dbCollection = async () => {
  try {
    await mongoose.connect("mongodb+srv://yousefrawag908:sqzsTTbP70vnjS1z@roha-studio.trd4s.mongodb.net/weqa?retryWrites=true&w=majority");
    console.log("✅ Connected to MongoDB Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1); // Exit the process if connection fails
  }
};

module.exports = dbCollection;
