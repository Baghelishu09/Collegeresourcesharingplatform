const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 80;
const path = require('path');

app.use('/assets',express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});
app.get('/userAuth', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'userAuth.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});