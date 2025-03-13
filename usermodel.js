var mongoose = require("mongoose");

// Define Schemas

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  fullname: String,
  email: String,
  phone: Number,
  country: String,
  address: String,
});


// Define Student Schema
const studentSchema = new mongoose.Schema({
  htno: String,

  fullname: String,
  
  password: String,

  group: String,

  email: String,

  mobile: String,

  gender: {
    type: String,
    enum: ["male", "female"], // To restrict values to 'male' or 'female'
    required: true,
  },
});

// Create Student Model
const students = mongoose.model("students", studentSchema);

// create models based on schemas
const users = mongoose.model("users", userSchema);

module.exports = { users, students };
