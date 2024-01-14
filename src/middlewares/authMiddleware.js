const jwt = require('jsonwebtoken');
const connectToDatabase = require('../../connectDb');

function verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    console.log(token)
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    try {
        const decoded = jwt.verify(token, "mySecret");
        req.email = decoded.email;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

const checkRole = (role) => {
    return (req, res, next) => {
        const token = req.headers['x-access-token'];
        console.log(token)
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
        try {
            const decoded = jwt.verify(token, "mySecret");
            console.log(decoded)
            req.email = decoded.email;
            const userRole = decoded.role;
            console.log(userRole) // Assuming the user role is added to the request object during JWT verification
            if (role === userRole) {
                next();
            } else {
                return res.status(403).json({ message: 'Unauthorized access' });
            }
        }

        catch (error) {
            res.status(401).json({ error: 'Invalid token' });
        }
    }
};

module.exports = { verifyToken, checkRole };