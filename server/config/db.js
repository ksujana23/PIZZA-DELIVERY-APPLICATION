
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing");
    }

    const connection = await mongoose.connect(
      process.env.MONGO_URI
    );

    console.log("MongoDB Connected Successfully!");
    console.log("Database Name:", connection.connection.name);
    console.log("Host:", connection.connection.host);

  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
