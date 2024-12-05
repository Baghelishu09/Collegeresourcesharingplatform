const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect('mongodb://localhost:27017/UserData', { useNewUrlParser: true, useUnifiedTopology: true });

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