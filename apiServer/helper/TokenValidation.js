
const jwt = require('jsonwebtoken');
const secretKey = "secretkey";

function TokenValidation(req, res, next) {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: 'Authentication failed.' });
    }
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Authentication failed. Invalid token.' });
        }
        // here the token decoded to get an id and the current is is same or not checking
        if (!decoded.id) {
            return res.status(403).json({ message: 'Unauthorized. Token does not match user ID.' });
        }
        req.user = decoded;
        next();
    });
}

module.exports = TokenValidation;
