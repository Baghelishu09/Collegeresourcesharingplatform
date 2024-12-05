const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI);

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobileNo: String,
    address: String,
    country: String,
    state: String,
    city: String,
    pincode: String,
    password: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;