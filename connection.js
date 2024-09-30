const mongoose = require("mongoose");

//Establishing the Connection to MongoDB
async function connection() {
  try {
    await mongoose.connect("mongodb://localhost:27017/Assignments2_DB");
    console.log("Conection is established with MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

module.exports = connection;
