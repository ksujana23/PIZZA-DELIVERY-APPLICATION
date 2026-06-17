const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.log("FULL ERROR BELOW:");
    console.log(error.message);   // <-- this line helps us debug
    process.exit(1);
  }
};

module.exports = connectDB;