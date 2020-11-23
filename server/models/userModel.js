// DEFINES DATABASE OBJECT FOR USERS
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, minLength: 5},
    userName: {type: String},
    userRole: {type: String},
    pswScore: {type: Number, default: 0},
    resetPasswordToken: {type: String},
    resetPasswordTokenExpiry: {thype: String}
});

// Use User to interact with User in database
module.exports = User = mongoose.model("user", userSchema);

