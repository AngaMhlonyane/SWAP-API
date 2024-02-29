// middleware/authenticateJWT.js
const jwt = require('jsonwebtoken');
const config = require('../config'); // Import your configuration file

function authenticateJWT(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, config.jwt_secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.user = decoded;
        next();
    });
}

module.exports = authenticateJWT;
