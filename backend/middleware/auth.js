const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    let token = null;

    if (authHeader && authHeader.split(' ')[0] === 'Bearer') {
        token = authHeader.split(' ')[1];
    } else if (req.cookies && req.cookies.access_token) {
        token = req.cookies.access_token;
    }

    if (!token) return res.status(401).json({ error: 'Token missing' });

    try {
        const secret = process.env.JWT_SECRET || 'dev-secret';
        const payload = jwt.verify(token, secret);
        req.user = payload;
        next();
    } catch (err) {
        return res.status(403).json({ error: 'Invalid token' });
    }
}

module.exports = { authenticateToken };