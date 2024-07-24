const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.URL);
    console.log("sucessfully connected to the database");
  } catch (error) {
    console.log("errorr while connection with mongo db", error);
  }
};
module.exports = { connectDB };
