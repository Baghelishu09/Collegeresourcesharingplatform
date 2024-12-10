const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI);

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobileNo: String,
    address: String,
    gender: String,
    states: String,
    city: String,
    pincode: String,
    password: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;