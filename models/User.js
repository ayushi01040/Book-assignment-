const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const timestamps = require("mongoose-timestamps");
const Schema = mongoose.Schema;

let UserSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String
  },
  country: {
    type: String
  },
  mobileNo: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true // Make sure email is unique
  },
  password: {
    type: String,
    required: true
  },
  confirmPassword: {
    type: String
  },
  userType: { type: Number, default: 2, enum: [1, 2] }, // 1 for admin and 2 for users
  lastLogin: { type: Date },
  createdAt: Date,
  updatedAt: Date
});

// Hash password before saving user
// UserSchema.pre("save", async function (next) {
//   if (this.isModified("password")) {
//     const salt = await bcrypt.genSalt(10); // Generate salt
//     this.password = await bcrypt.hash(this.password, salt);
//     // this.confirmPassword = await bcrypt.hash(this.confirmPassword);// Hash password
//   }
//   next();
// });

// // Method to compare password
// UserSchema.methods.comparePassword = async function (candidatePassword) {
//   return await bcrypt.compare(candidatePassword, this.password); // Compare with hashed password
// };

UserSchema.plugin(timestamps, { index: true });
module.exports = mongoose.model("User", UserSchema);
