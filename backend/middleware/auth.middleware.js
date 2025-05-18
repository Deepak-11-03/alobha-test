const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).sned({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    if (!req.user) return res.status(401).send({ message: 'Invalid token' });
    next();
  } catch (error) {
    return res.status(401).send({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;