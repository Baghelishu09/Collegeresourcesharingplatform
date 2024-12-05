const express = require('express');
const app = express();
require('dotenv').config();
const User = require('./backend/registerdata');
const port = process.env.PORT || 80;
const bcrypt = require('bcrypt');
const path = require('path');

app.use('/assets',express.static(path.join(__dirname, 'assets')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});
app.get('/userAuth', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'userAuth.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
app.post('/submit', async (req, res) => {
  const { name, email, mobileNo, address, country, state, city, pincode, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    name,
    email,
    mobileNo,
    address,
    country,
    state,
    city,
    pincode,
    password: hashedPassword
  });
  try {
    if(await User.findOne({ email: email })){
      res.json({ status: 'error', message: 'User already exists' });
      return;
    }
    await user.save();
    res.json({ status: 'success', message: 'User created successfully' });
  }
  catch (err) {
    res.json({ status: 'error', message: err });
  }
});