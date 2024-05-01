
const jwt = require('jsonwebtoken');
const secretKey = "secretkey";

function verifyToken(req, res, next) {
    const token = req.header('Authorization');
    console.log(token ,"authtoken token")
    if (!token) {
        return res.status(401).json({ message: 'Authentication failed.' });
    }
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Authentication failed. Invalid token.' });
        }
        req.user = decoded;
        next();
    });
}

module.exports = verifyToken;

   


