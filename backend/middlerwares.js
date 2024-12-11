const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretkey = process.env.SECRET_KEY;

const verifyToken = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        console.log('Token not found');
        return res.redirect('/userAuth');
    }
    jwt.verify(token, secretkey, (err, user) => {
        if (err) {
            console.log('Token not verified');
            return res.redirect('/userAuth');
        }
        req.user = user;
        next();
    });
};
module.exports = { verifyToken };