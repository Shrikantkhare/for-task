// middleware/auth.js

const { verifyToken } = require('../utils/auth');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
  
    try {
      const decoded = verifyToken(token);
      req.user = decoded;
      next();
    } catch (error) {
      console.error(error);
      return res.status(403).json({ error: 'Forbidden' });
    }
  };
const authenticateAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };

module.exports = {
  authenticateToken,
  authenticateAdmin
};
