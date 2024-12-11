const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const app = express();
require('dotenv').config();
const User = require('./backend/registerdata');
const { verifyToken }  = require('./backend/middlerwares');
const port = process.env.PORT || 80;
const bcrypt = require('bcryptjs');
const path = require('path');



app.use(cookieParser());
app.use('/assets',express.static(path.join(__dirname, 'assets')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});
app.get('/userAuth', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'userAuth.html'));
});
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'userAuth.html'));
})
app.get('/dashboard', verifyToken, (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'dashboard.html'));
});
app.get('/profile', verifyToken, (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'profile.html'));
});
app.get('/settings', verifyToken, (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'settings.html'));
});
app.get('/inbox', verifyToken, (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'inbox.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
app.post('/submit', async (req, res) => {
  const { name, email, mobileNo, address, gender, states, city, pincode, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    name,
    email,
    mobileNo,
    address,
    gender,
    states,
    city,
    pincode,
    password: hashedPassword
  });
  try {
    if(await User.findOne({ email: email })){
      res.json({ status: 'success', message: 'User already exists' });
      return;
    }
    await user.save();
    res.json({ status: 'success', message: 'User registered successfully' });
  }
  catch (err) {
    res.json({ status: 'error', message: err });
  }
});
app.post('/login', async (req, res) => {
  const { login_name, login_password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email: login_name });

    if (!user) {
      return res.status(404).json({ status: "failed", message: "User not found! Register" });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(login_password, user.password);

    if (!isMatch) {
      return res.status(401).json({ status: "failed", message: "Invalid credentials" });
    }

    // Create a token
    const payload = {
      email: user.email
    }
    const options = {
      expiresIn: '1h'
    }
    const token = jwt.sign(payload, process.env.SECRET_KEY, options);
    res.cookie('jwt', token, { httpOnly: true, secure: true, sameSite: 'Strict', maxAge: 3600000 }); // 1 hour expiry
    

    // Successful login
    res.status(200).json({
      status: "success",
      message: `${user.name} logged in successfully`,
      token: token,
      user: {
        email: user.email,
      }
    });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ status: "failed", message: "Internal Server Error" });
  }
});
